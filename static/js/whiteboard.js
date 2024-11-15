/* whiteboard javascript */

/* Create Canvas Logic */
var canvas = document.getElementById('whiteboard');
var context = canvas.getContext('2d');

var isMouseDrawing = false;
var isMouseHovering = false;

function initialize(event){
    canvas.height = document.getElementsByClassName('main')[0].clientHeight;
    canvas.width = document.getElementsByClassName('main')[0].clientWidth;

    canvas.addEventListener('mouseup', mouse_up);
    canvas.addEventListener('mousedown', mouse_down);
    canvas.addEventListener("mouseenter", mouse_enter_canvas);
    canvas.addEventListener("mouseleave", mouse_exit_canvas);
    canvas.addEventListener('mousemove', draw_update);

    window.addEventListener('resize', resize_canvas, false);
}

/* To Do:
Implement Conditionals for the mouse actions to ensure proper functionality
- Draw in the canvas
- Line stops upon reaching canvas edge (mousedown)
- Line continues upon re-entering canvas edge (mousedown)
- Line data isn't messed up by (mouseup) outside of canvas

        isMouseDrawing = false;
        context.beginPath();

        isMouseDrawing = true;
        context.moveTo(event.offsetX, event.offsetY);
*/

function mouse_enter_canvas(event){
    isMouseHovering = true;
    context.beginPath();
}

function mouse_exit_canvas(event){
    isMouseHovering = false;
    context.closePath();
}

function mouse_down(event){
    isMouseDrawing = true;
    context.beginPath();
}

function mouse_up(event){
    isMouseDrawing = false;
    context.closePath();
}

function draw_update(event){
    if (isMouseDrawing && isMouseHovering) {
        context.lineWidth = 5; /* Pen Size */
        context.lineCap = "round"; /* Pen Type */
        context.strokeStyle = "black"; /* Pen Colour */
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
    } /* end if */
}

function resize_canvas(event){
    /* Save existing Canvas */
    const data_url = canvas.toDataURL();

    /* Resize Canvas, note: context.h/w automatically get updated */
    canvas.height = document.getElementsByClassName('main')[0].clientHeight;
    canvas.width = context.width = document.getElementsByClassName('main')[0].clientWidth;

    /* Apply saved image to new Canvas */
    const image = new Image();
    image.src = data_url;
    image.onload = () => {
        context.drawImage(image, 0, 0);
    };
}

/* Button Commands */
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("DOMContentLoaded", initialize, {once : true});
document.addEventListener("DOMContentLoaded", () => {
    resize_canvas();
});