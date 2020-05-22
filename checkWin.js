function checkWin(check, turn) {
    let arrayCheck = []

    let ix = 1;
    let mark = 0;

    $.each(check, function (key, v) {
        let x = parseInt(v.x);
        let y = parseInt(v.y);
        x_i = 1;
        x_mark = 0;
        $("span").removeClass('draw-boder');
        while (x_i <= 5) {
            $('.col-' + y + ' >.co_lss-' + x).addClass('draw-boder');
            if (hasNode(check, x, y, turn) === true) {
                x_mark++;
                x = x + 1;
                console.log(x_mark);
            } else {
                break;
            }

            if (x_mark >= 5) {
                inStart = false;
                alert('win');
                return;
            }
            x_i++
        }

        x = parseInt(v.x);
        y = parseInt(v.y);
        x_i = 1;
        x_mark = 0;
        $("span").removeClass('draw-boder');
        while (x_i <= 5) {
            $('.col-' + y + ' >.co_lss-' + x).addClass('draw-boder');
            if (hasNode(check, x, y, turn) === true) {
                x_mark++;
                y = y + 1;
                x = x;
                console.log(x_mark);
            } else {
                break;
            }

            if (x_mark >= 5) {
                inStart = false;
                alert('win');
                return;
            }
            x_i++
        }

        x = parseInt(v.x);
        y = parseInt(v.y);
        x_i = 1;
        x_mark = 0;
        $("span").removeClass('draw-boder');
        while (x_i <= 5) {
            $('.col-' + y + ' >.co_lss-' + x).addClass('draw-boder');
            if (hasNode(check, x, y, turn) === true) {
                x_mark++;
                y = y + 1;
                x = x +1;
                console.log(x_mark);
            } else {
                break;
            }

            if (x_mark >= 5) {
                inStart = false;
                alert('win');
                return;
            }
            x_i++
        }

        x = parseInt(v.x);
        y = parseInt(v.y);
        x_i = 1;
        x_mark = 0;
        $("span").removeClass('draw-boder');
        while (x_i <= 5) {
            $('.col-' + y + ' >.co_lss-' + x).addClass('draw-boder');
            if (hasNode(check, x, y, turn) === true) {
                x_mark++;
                y = y - 1;
                x = x +1;
                console.log(x_mark);
            } else {
                break;
            }

            if (x_mark >= 5) {
                inStart = false;
                alert('win');
                return;
            }
            x_i++
        }


    });
}


