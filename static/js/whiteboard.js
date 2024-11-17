/* whiteboard javascript */

/* Create Canvas Logic */
class Whiteboard{
    constructor(){
        this._canvas = document.getElementById('whiteboard');;
        this._context = this._canvas.getContext('2d');

        this._isMouseDrawing = false;
        this._isMouseHovering = false;

        this._tool_sizes = [1, 3, 5, 7, 10];
        this._default_pen_colour = "black";
        this._default_eraser_colour = "white";
        this._brush_colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
        this._last_tool_size_index = 2;
        this._last_colour_index = -1; // Selection increments, -1 to start with red
        this.tools = ["pen", "eraser", "paintbrush"];

        this.current_tool = "pen";
        this.current_colour = "black";
        this.current_tool_size = 5;
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
        update_selected_tool_UI("pen");
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
        if (!this._isMouseDrawing || !this._isMouseHovering) { return; }

        switch (this.current_tool){
            case "eraser": { this._erase_line(); }
            case "pen": { this._draw_line(); }
            case "paintbrush": { this._draw_line(); }
        }
    }

    _draw_line(){
        this._context.globalCompositeOperation = "source-over"; // Draw mode
        this._context.lineWidth = this._tool_sizes[this._last_tool_size_index];
        this._context.lineCap = "round";
        this._context.strokeStyle = this.current_colour;
        this._context.lineTo(event.offsetX, event.offsetY);
        this._context.stroke();
    }

    _erase_line(){
        /* To Do: Implement transparent eraser & coloured bgs
        - Current eraser (globalCO) does not work as intended
        - Current eraser uses a WHITE brush to "erase" the Canvas
        */
        this._context.globalCompositeOperation = "destination-out"; // Erase mode (set bitmap to transparent)
        this._context.lineWidth = this._tool_sizes[this._last_tool_size_index];
        this._context.lineCap = "square";
        this._context.lineTo(event.offsetX, event.offsetY);
        this._context.stroke();
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

    select_tool(tool){
        this.current_tool = tool;

        if (tool == "paintbrush"){ this._change_paintbrush_colour(); }
        else if (tool == "pen"){ this.current_colour = "black"; }
        else if (tool == "eraser"){ this.current_colour = "white"; }
    }

    cycle_tool_size(){
        const len = this._tool_sizes.length;
        this._last_tool_size_index = this._increment_array_indexer(len, this._last_tool_size_index);

        this.current_tool_size = this._tool_sizes[this._last_tool_size_index];
    }

    _change_paintbrush_colour(){
        const len = this._brush_colours.length;
        this._last_colour_index = this._increment_array_indexer(len, this._last_colour_index);
        this.current_colour = this._brush_colours[this._last_colour_index];
    }

    _increment_array_indexer(array_length, index){
        if ((index + 1) >= array_length ) {index = 0;}
        else {index += 1;}
        return index;
    }

    get_current_colour(){
        return this.current_colour;
    }

    get_current_tool(){
        return this.current_tool;
    }

    get_tools(){
        return this.tools;
    }
}

/* Button Commands */
function clear_canvas() {
    whiteboard.clear_canvas();
}

function select_tool(tool_name){
    whiteboard.select_tool(tool_name);
    update_selected_tool_UI(tool_name);
}

function cycle_size(){
    whiteboard.cycle_tool_size();
}

function update_selected_tool_UI(next_tool){
    const tools = whiteboard.get_tools();
    const current_tool = whiteboard.get_current_tool();
    const colour = whiteboard.get_current_colour();

    for (let i = 0; i < tools.length; i++){
        let element = document.getElementById(tools[i]);
        if (element.innerHTML.toLowerCase() == next_tool){
            element.style.backgroundColor = "#E16F00"; // Orange
        }
        else{ element.style.backgroundColor = "#1e90ff";}
    }
}

var whiteboard = new Whiteboard();
whiteboard.initialize();