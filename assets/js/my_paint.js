
document.querySelector('#window-tool').addEventListener('click', dispToolbar);
var p = document.querySelector('.sheet'); // element to make resizable

document.getElementById('redim1').addEventListener('click', function init() {
    p.removeEventListener('click', init, false);
    p.addEventListener('mousedown', initDrag, false);
    p.className = p.className + ' resizable';
    var resizer = document.createElement('div');
    resizer.className = 'resizer';
    p.appendChild(resizer);
    resizer.addEventListener('mousedown', initDrag, false);
}, false);

var startX, startY, startWidth;

function initDrag(e) {
   startX = e.clientX;
   startY = e.clientY;
   startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
   document.documentElement.addEventListener('mousemove', doDrag, false);
   document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
   p.style.width = (startWidth + e.clientX - startX) + 'px';
}

function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
}

/*function color(obj) {
    switch (obj.id) {
        case "rubber":
            x = "white";
            y = 14
            return;
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
}*/
// CERCLE
// Il faut entrer les bonnes coordonnées du centre
function draw_circle() {
}
//FIN CERCLE
function dispToolbar() {
    toolbar = document.querySelector('.file-tool-bar');
    toolbar.display
}