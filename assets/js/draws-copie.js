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
function drawPath() {
    var $svg = $('#mySheet2');
    var $path = $('#path');
    $svg.off('mousedown');
    $svg.off('mouseup');
    $svg.off('mousemove');
    var CTM = $path[0].getScreenCTM();
    var point = $svg[0].createSVGPoint();
    var points = [];
    $svg.on('mousedown', function (ev) {
        var activeColor = $('#selected1').css("background-color");
        $path.css('stroke', activeColor);
        point.x = ev.pageX;
        point.y = ev.pageY;
        point = point.matrixTransform(CTM.inverse());
        points.push({ x: +point.x, y: +point.y });
        $path.attr('d', 'M' + point.x + ',' + point.y + 'L' + point.x + ',' + point.y);
        function mouseMovePath(ev) {
            point.x = ev.pageX;
            point.y = ev.pageY;
            point = point.matrixTransform(CTM.inverse());
            $path.attr('d', $path.attr('d') + ' ' + point.x + ',' + point.y);
            points.push({ x: +point.x, y: +point.y });
        }
        function mouseUpPath(ev) {
            mouseMovePath(ev);
            $(window).off('mousemove', mouseMovePath);
            $(window).off('mouseup', mouseUpPath);
        }
        $(window).on('mousemove', mouseMovePath);
        $(window).on('mouseup', mouseUpPath);

    })
}
function drawLine() {
    var $svg = $('#mySheet2');
    var $line = $('#line');
    $svg.off('mousedown');
    $svg.off('mouseup');
    $svg.off('mousemove');
    $svg.on('mousedown', function (ev) {
        var activeColor = $('#selected1').css("background-color");
        $line.css('stroke', activeColor);
        var point = $svg[0].createSVGPoint();
        point.x = ev.offsetX;
        point.y = ev.offsetY;
        $line.attr('x1', point.x);
        $line.attr('y1', point.y);
        $line.attr('x2', point.x);
        $line.attr('y2', point.y);
        //$line.attr('x1', pointX);
        //$line.attr('y1', pointY);
        function mouseMoveLine(ev) {
            point.x = ev.offsetX;
            point.y = ev.offsetY;
            $line.attr('x2', point.x);
            $line.attr('y2', point.y);
        }
        function mouseUpLine(ev) {
            mouseMoveLine(ev);
            $(window).off('mousemove', mouseMoveLine);
            $(window).off('mouseup', mouseUpLine);

        }
        $(window).on('mousemove', mouseMoveLine);
        $(window).on('mouseup', mouseUpLine);

    })
}
function drawEllipse() {
    var $svg = $('#mySheet2');
    var $Ellipse = $('#ellipse');
    $svg.off('mousedown');
    $svg.off('mouseup');
    $svg.off('mousemove');
    $svg.on('mousedown', function (ev) {
        var activeColor = $('#selected1').css("background-color");
        $Ellipse.css('stroke', activeColor);
        //var point = $svg[0].createSVGPoint();
        var lastMouseX = ev.pageX;
        var lastMouseY = ev.pageY;
        //var lastMouseX = point.x;
        //var lastMouseY = point.y;
        $Ellipse.attr('cx', ev.offsetX);
        $Ellipse.attr('cy', ev.offsetY);
        $Ellipse.attr('rx', 10);
        $Ellipse.attr('ry', 10);
        function mouseMoveEllipse(ev) {
            var currMouseX = ev.pageX;
            var currMouseY = ev.pageY;
            var rayX = currMouseX - lastMouseX;
            if (rayX < 0){
                rayX = lastMouseX - currMouseX;
            }
            var rayY = currMouseY - lastMouseY;
            if (rayY < 0){
                rayY = lastMouseY - currMouseY;
            }
            $Ellipse.attr('rx', rayX);
            $Ellipse.attr('ry', rayY);
        }
        function mouseUpEllipse(ev) {
            mouseMoveEllipse(ev);
            $(window).off('mousemove', mouseMoveEllipse);
            $(window).off('mouseup', mouseUpEllipse);
        }
        $(window).on('mousemove', mouseMoveEllipse);
        $(window).on('mouseup', mouseUpEllipse);

    })
}
/********************/
