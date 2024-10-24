/* whiteboard javascript */

/* Create 2D context object */
console.log("HELLO WORLD")


const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight - 0;
canvas.width = window.innerWidth - 0;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

let isMouseDrawing = false;

canvas.addEventListener('mousedown', (event) =>{
    isMouseDrawing = true;
    ctx.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener('mouseup', (event) =>{
    isMouseDrawing = false;
    ctx.beginPath();
});

/* Note: May need to end stroke when mouse exists the canvas, with added margins */
/* canvas.addEventListener('mouseout', (event)) =>{
}; */

canvas.addEventListener('mousemove', update);

function update(event){
    if (isMouseDrawing) {
        ctx.lineWidth = 5; /* Pen Size */
        ctx.lineCap = "round"; /* Pen Type */
        ctx.strokeStyle = "black"; /* Pen Colour */
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    } /* end if */
}