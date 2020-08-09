var canvas;
var ctx;
var flag = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var dot_flag = false;
var x = "black";
var y = 2;
document.querySelector('#window-tool').addEventListener('click', dispToolbar);
function init() {
    canvas = document.getElementById('myCanvas');
    listenToolsave = document.querySelector('.file-tool-save');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    listenToolsave.addEventListener("click", save);
    //listenToolerase.addEventListener("click", erase);
    canvas.addEventListener("click", function (e) {
        findxy('click', e)
    }, false);
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == 'out') {
        flag = false;
    }
    if (res == 'move' || res == 'click') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

function erase() {
    var m = confirm("Vous allez tout effacer. Vous êtes sûr ?");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "1px solid";
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
    document.getElementById("canvasimg").src = image;
    document.getElementById("canvasimg").style.display = "inline";
}

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
    if (x == "white") y = 14;
    else y = 2;
}

function rubber(obj) {
    switch (obj.id) {
        case "rubberwhite":
            x = "white";
            break;
    }
}
function dispToolbar(){
    toolbar = document.querySelector('.file-tool-bar');
    toolbar.display

}