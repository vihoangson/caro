var check = [];
var inStart = true;
var turn = 1;
var step = 0;

function hasNode(check, x, y, turn) {
    if (x < 0 || y < 0)
        return false;
    let flag = false
    $.each(check, function (key2, v2) {
        if (parseInt(v2.x) === x && parseInt(v2.y) === y && v2.turn === turn) {
            flag = true;
            return true;
        }
    })
    return flag;
}

$(document).ready(function () {


    let m = $(".game > div").clone();
    $(".game > div").remove();
    for (let i = 1; i <= 20; i++) {
        let n = m.clone();
        n.addClass('col-' + i);
        $(".game").append(n);
    }


    if (turn === 0) {
        $('.color-turn').css({background: 'red'});
    } else {
        $('.color-turn').css({background: 'blue'});
    }
    $("span").mouseover(function () {
        if (!inStart)
            return;
        if (turn === 0) {
            $('.color-turn').css({background: 'blue'});
        } else {
            $('.color-turn').css({background: 'red'});
        }

        if (!$(this).hasClass('active')) {
            if (turn === 1) {
                $(this).addClass(['active', 'blue']);
                turn = 0;
            } else {
                $(this).addClass(['active', 'red']);
                turn = 1;
            }

            check[step] = {
                y: ($(this).parent().attr('class').split(' ')[1].match(/\-(\d*)$/)[1]),
                x: $(this).attr('class').split(' ')[0].match(/\-(\d*)$/)[1],
                turn: turn
            }

            socket.emit('chat message', JSON.stringify(check));

            if (checkWin(check, turn)) {
                alert(1);
            }
            step++
        }
    })
})


