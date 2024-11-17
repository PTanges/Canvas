/* whiteboard javascript */

/* Create Canvas Logic */
class Whiteboard{
    constructor(){
        this._canvas = document.getElementById('whiteboard');;
        this._context = this._canvas.getContext('2d');

        this._isMouseDrawing = false;
        this._isMouseHovering = false;
    }

    initialize(){
        this._canvas.height = document.getElementsByClassName('main')[0].clientHeight;
        this._canvas.width = document.getElementsByClassName('main')[0].clientWidth;

        /* Retain reference pointer lost with intra-class events with bind(this) */
        this._canvas.addEventListener('mouseup', this.mouse_up.bind(this));
        this._canvas.addEventListener('mousedown', this.mouse_down.bind(this));
        this._canvas.addEventListener("mouseenter", this.mouse_enter_canvas.bind(this));
        this._canvas.addEventListener("mouseleave", this.mouse_exit_canvas.bind(this));
        this._canvas.addEventListener('mousemove', this.draw_update.bind(this));

        window.addEventListener('resize', this.resize_canvas.bind(this), false);
        this.resize_canvas();
    }

    mouse_enter_canvas(event){
        this._isMouseHovering = true;
        this._context.beginPath();
    }

    mouse_exit_canvas(event){
        this._isMouseHovering = false;
        this._context.closePath();
    }

    mouse_down(event){
        this._isMouseDrawing = true;
        this._context.beginPath();
    }

    mouse_up(event){
        this._isMouseDrawing = false;
        this._context.closePath();
    }

    draw_update(event){
        if (this._isMouseDrawing && this._isMouseHovering) {
            this._context.lineWidth = 5; /* Pen Size */
            this._context.lineCap = "round"; /* Pen Type */
            this._context.strokeStyle = "black"; /* Pen Colour */
            this._context.lineTo(event.offsetX, event.offsetY);
            this._context.stroke();
        } /* end if */
    }

    resize_canvas(event){
        /* Save existing Canvas */
        let image = new Image();
        const data_url = this._canvas.toDataURL("image/png"); // Default: png
        image.src = data_url;

        /* Resize Canvas, note: context.h/w automatically get updated */
        this._canvas.height = this._context.height = document.getElementsByClassName('main')[0].clientHeight;
        this._canvas.width = this._context.width = document.getElementsByClassName('main')[0].clientWidth;

        /* Apply saved image to new Canvas */
        image.onload = () => {
            this._context.drawImage(image, 0, 0);
        };
    }

    clear_canvas(){
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}

/* Button Commands */
function clear_canvas() {
    whiteboard.clear_canvas();
}

var whiteboard = new Whiteboard();
whiteboard.initialize();