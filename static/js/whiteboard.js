/* whiteboard javascript */

/* Create Canvas Logic */
let canvas = document.getElementById('whiteboard');
let context = canvas.getContext('2d');

let isMouseDrawing = false;

function initialize(event){
    canvas.height = document.getElementsByClassName('main')[0].clientHeight;
    canvas.width = document.getElementsByClassName('main')[0].clientWidth;

    canvas.addEventListener('mousedown', (event) =>{
        isMouseDrawing = true;
        context.moveTo(event.offsetX, event.offsetY);
    });

    canvas.addEventListener('mouseup', (event) =>{
        isMouseDrawing = false;
        context.beginPath();
    });

    canvas.addEventListener('mousemove', draw_update);

    canvas.addEventListener("mouseleave", _end_stroke);
    canvas.addEventListener("mousein", _track_new_mouse_position);

    console.log("HERE")
    window.addEventListener('resize', resize_canvas, false);
}

function _end_stroke(event){
    isMouseDrawing = false;
}

function _track_new_mouse_position(event){
    context.beginPath();
}

function draw_update(event){
    if (isMouseDrawing) {
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

/* Note: Look at AJAX JS
function randomizeBackground(x, y, width, height, color) {
    console.log("Hello")
    blue = #0084ff;
    canvas.color = blue;
    context.fillStyle =
    context.fillRect(x, y, width, height, color);
}
*/

document.addEventListener("DOMContentLoaded", initialize, {once : true});
document.addEventListener("DOMContentLoaded", () => {
    resize_canvas();
});