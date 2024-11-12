/* whiteboard javascript */

/* Create Canvas Logic */
let canvas = document.getElementById('whiteboard');
let context = canvas.getContext('2d');

context.width = window.innerWidth;
context.height = window.innerHeight;

canvas.height = document.getElementsByClassName('main')[0].clientHeight;
canvas.width = document.getElementsByClassName('main')[0].clientWidth;

let isMouseDrawing = false;

/* Draw Border */
/* To Do: Update canvas dimensions & size with event resize */
context.strokeStyle = 'white';
context.lineWidth = '10';
context.strokeRect(0, 0, document.getElementsByClassName('main')[0].clientWidth, document.getElementsByClassName('main')[0].clientHeight-10);

/* Canvas Drawing Functionality */
canvas.addEventListener('mousedown', (event) =>{
    isMouseDrawing = true;
    context.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener('mouseup', (event) =>{
    isMouseDrawing = false;
    context.beginPath();
});

canvas.addEventListener('mousemove', update);

function update(event){
    if (isMouseDrawing) {
        context.lineWidth = 5; /* Pen Size */
        context.lineCap = "round"; /* Pen Type */
        context.strokeStyle = "black"; /* Pen Colour */
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
    } /* end if */
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