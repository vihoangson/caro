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

function draw(check) {
    $("span").removeClass('blue')
    $("span").removeClass('red')
    $.each(check, (k, v) => {
        if (v.turn === 1) {
            console.log('.col-' + v.y + ' >.co_lss-' + v.x);
            $('.col-' + v.y + ' >.co_lss-' + v.x).addClass(['blue', 'active']);
        } else {
            $('.col-' + v.y + ' >.co_lss-' + v.x).addClass(['red', 'active']);

        }
    })

}

$(document).ready(function () {
    var name = '22232aa' + Math.random();
    var members = [];
    $("#name").text(name);
    socket.emit('push', {data: JSON.stringify(check), turn: turn, name: name});
    socket.emit('join', {name: name});

    let m = $(".game > div").clone();

    $(".game > div").remove();

    for (let i = 1; i <= 20; i++) {
        let n = m.clone();
        n.addClass('col-' + i);
        $(".game").append(n);
    }


    if (turn === 0) {
        $('.color-turn').css({background: 'blue'});
    } else {
        $('.color-turn').css({background: 'red'});
    }

    // Xử lý join room
    socket.on('join_room', (data) => {
        members = [];
        members.push(name)
        members.push(data)
        $("#members").text(JSON.stringify(members))
    })

    // Xử lý sự kiện nhận từ socket
    socket.on('pull', (data) => {

        ch = JSON.parse(data.data)
        if (checkWin(ch, turn)) {
            alert(1);
        }
        if (data.turn === 0) {
            turn = 1
            $('.color-turn').css({background: 'blue'});
        } else {
            turn = 0
            $('.color-turn').css({background: 'red'});
        }

        draw(ch);
    })

    $("span").click(function () {
        if (!inStart)
            return;

        if (!$(this).hasClass('active')) {
            check[step] = {
                y: ($(this).parent().attr('class').split(' ')[1].match(/\-(\d*)$/)[1]),
                x: $(this).attr('class').split(' ')[0].match(/\-(\d*)$/)[1],
                turn: turn
            }
            socket.emit('push', {data: JSON.stringify(check), turn: turn, name: name});
            step++
        }
    })
})


