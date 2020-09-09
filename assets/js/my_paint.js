
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
            /*download($svg);*/
        }
        $(window).on('mousemove', mouseMovePath);
        $(window).on('mouseup', mouseUpPath);

    })
}
function drawLine() {
    let $svg = $('#mySheet2');
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
        var fillColor = $('#selected2').css("background-color");
        if (fillColor !== "white") {
            $Ellipse.css('fill', fillColor);
            $Ellipse.css('fill-opacity', 1);
        }
        $Ellipse.css('stroke', activeColor);
        var lastMouseX = ev.pageX;
        var lastMouseY = ev.pageY;
        $Ellipse.attr('cx', ev.offsetX);
        $Ellipse.attr('cy', ev.offsetY);
        $Ellipse.attr('rx', 10);
        $Ellipse.attr('ry', 10);
        function mouseMoveEllipse(ev) {
            var currMouseX = ev.pageX;
            var currMouseY = ev.pageY;
            var rayX = currMouseX - lastMouseX;
            if (rayX < 0) {
                rayX = lastMouseX - currMouseX;
            }
            var rayY = currMouseY - lastMouseY;
            if (rayY < 0) {
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
function openFile() {
    const fileList = event.target.files;
    console.log(fileList);
}


function swapColor(obj) {
    switch (obj.id) {
        case "selected1":
        obj.classList.replace("inactive","active");
        document.querySelector('.color-select1').classList.replace("inactive", "active");
        document.getElementById("selected2").classList.replace("active","inactive");
        document.querySelector('.color-select2').classList.replace("active","inactive");
            break;
        case "selected2":
        obj.classList.replace("inactive","active");
        document.querySelector('.color-select2').classList.replace("inactive", "active");
        document.getElementById("selected1").classList.replace("active","inactive");
        document.querySelector('.color-select1').classList.replace("active","inactive");
            break;
    }
}
function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
  
    var imgtag = document.getElementById("myimage");
    imgtag.title = selectedFile.name;
  
    reader.onload = function(event) {
      imgtag.src = event.target.result;
    };
  
    reader.readAsDataURL(selectedFile);
}
function convertDownload(){
    var svg = document.querySelector("#mySheet2");
    var svgData = new XMLSerializer().serializeToString(svg);
    var canvas = document.createElement("canvas");
    var svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width * 3;
    canvas.height = svgSize.height * 3;
    canvas.style.width = svgSize.width;
    canvas.style.height = svgSize.height;
    var ctx = canvas.getContext("2d");
    ctx.scale(3, 3);
  
    var img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
  
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        var canvasdata = canvas.toDataURL("image/png", 1);
  
        var pngimg = '<img src="' + canvasdata + '">';
        d3.select("#pngdataurl").html(pngimg);
  
        var a = document.createElement("a");
        /*a.download = "new" + ".png";*/
        a.download = "new";
        a.href = canvasdata;
        document.body.appendChild(a);
        a.click();
    }
}
    function download($svg) {
        $svg = $('#mySheet2');
        var code = (new XMLSerializer).serializeToString($svg[0]);
        var b64 = window.btoa(unescape(encodeURIComponent(code))); // Workaround on UTF-8 char
        console.log("data:image/svg+xml;base64," + b64);
        var $dataURL = "data:image/svg+xml;base64," + b64;
        var dl = document.createElement("a");
        document.body.appendChild(dl); // This line makes it work in Firefox.
        dl.setAttribute("href", $dataURL);
        dl.setAttribute("download", "new.svg");
        dl.click();
    }