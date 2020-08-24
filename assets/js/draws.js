var x = "";
document.querySelector('#window-tool').addEventListener('click', dispToolbar);
function color(obj) {
    switch (obj.id) {
        case "green":
            x = "green";
            break;
        case "blue":
            x = "blue";
            break;
        case "red":
            x = "red";
            break;
        case "yellow":
            x = "yellow";
            break;
        case "orange":
            x = "orange";
            break;
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
        case "lightyellow":
            x = "lightyellow";
            break;
        case "gold":
            x = "gold";
            break;
        case "salmon":
            x = "salmon";
            break;
        case "brown":
            x = "brown";
            break;
        case "lightgray":
            x = "lightgray";
            break;
        case "myindigo":
            x = "rgb(63, 72, 204)";
            break;
        case "turquoise":
            x = "turquoise";
            break;
        case "darkred":
            x = "darkred";
            break;
        case "mydarkgray":
            x = "rgb(127, 127, 127)";
            break;
        case "paleturquoise":
            x = "paleturquoise";
            break;
        case "violet":
            x = "violet";
            break;
        case "lavande":
            x = "lavande";
            break;
        case "lightgreen":
            x = "lightgreen";
            break;
    }
    document.getElementById('selected1').style.backgroundColor = x;
    if (x == "white") y = 14;
    else y = 2;
}
function drawFree() {
    var $svg = $('#mySheet2');
    var $path = $('#path');
    var $myColor = $(document.getElementById('selected1')).css("backgroundColor");
    var CTM = $path[0].getScreenCTM();
    var point = $svg[0].createSVGPoint();
    var points = []
    $svg.on('mousedown', function (ev) {
        $path.attr('style', "stroke:" + $myColor);
        point.x = ev.pageX;
        point.y = ev.pageY;
        point = point.matrixTransform(CTM.inverse());
        points.push({ x: +point.x, y: +point.y });
        $path.attr('d', 'M' + point.x + ',' + point.y + 'L' + point.x + ',' + point.y);
        function mouseMove(ev) {
            point.x = ev.pageX;
            point.y = ev.pageY;
            point = point.matrixTransform(CTM.inverse());
            $path.attr('d', $path.attr('d') + ' ' + point.x + ',' + point.y);
            points.push({ x: +point.x, y: +point.y });
        }
        function mouseUp(ev) {
            mouseMove(ev);
            console.log(points);
            $(window).off('mousemove', mouseMove);
            $(window).off('mouseup', mouseUp);
        }
        $(window).on('mousemove', mouseMove);
        $(window).on('mouseup', mouseUp);
    })
}
function drawLine() {
    var $svg = $('#mySheet2');
    var $line = $('#line');
    var $myColor = $(document.getElementById('selected1')).css("backgroundColor");
    var CTM = $line[0].getScreenCTM();
    var point = $svg[0].createSVGPoint();
    var points = []
    $svg.on('mousedown', function (ev) {
        $line.attr('style', "stroke:" + $myColor);
        point.x = ev.pageX;
        point.y = ev.pageY;
        point = point.matrixTransform(CTM.inverse());
        points.push({ x1: point.x, y1: point.y });
        $line.attr("x1" , point.x);
        $line.attr("y1" , point.y);
        $line.attr("x2" , point.x);
        $line.attr("y2" , point.y);

        function mouseMove(ev) {
            point.x2 = ev.pageX;
            point.y2 = ev.pageY;
            point = point.matrixTransform(CTM.inverse());
            $line.attr("x1" , point.x);
            $line.attr("y1" , point.y);
            $line.attr("x2", point.x2);
            $line.attr("y2", point.y2);
            points.push({ x: point.x, y: point.y });
        }
        function mouseUp(ev) {
            mouseMove(ev);
            console.log(points);
            $(window).off('mousemove', mouseMove);
            $(window).off('mouseup', mouseUp);
        }
        $(window).on('mousemove', mouseMove);
        $(window).on('mouseup', mouseUp);
    })
}

