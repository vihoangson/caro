var check = [];
var inStart = true;
var turn = 1;
var step = 0;
var yourTurn = true;

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
            $('.col-' + v.y + ' >.co_lss-' + v.x).addClass(['blue', 'active']);
        } else {
            $('.col-' + v.y + ' >.co_lss-' + v.x).addClass(['red', 'active']);

        }
    })

}

$(document).ready(function () {
    if (true) {
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
    }


    var name = 'U:' + Math.random();
    $("#name").text(name);

    var members = [];

    socket.emit('push', {data: JSON.stringify(check), turn: turn, name: name});

    var part = 'red';
    socket.emit('join', {name: name});


    // Xử lý join room
    socket.on('join_room', (data) => {
        members = [];
        members.push(name)
        if (name !== data) {
            members.push(data)
            part = 'blue'
        }

        $("#members").text(JSON.stringify(members) + " | Part: " + part)
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

        yourTurn = false;
        if (turn === 0 && part === 'red') {
            yourTurn = true;
        } else if (turn === 1 && part === 'blue') {
            yourTurn = true;
        }
        draw(ch);
    })

    $("span").click(function () {
        if (!inStart)
            return;
        if (!yourTurn)
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


