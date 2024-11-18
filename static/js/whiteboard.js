/* whiteboard javascript */

/* Create Canvas Logic */
class Whiteboard{
    constructor(){
        this._canvas = document.getElementById('whiteboard');;
        this._context = this._canvas.getContext('2d');

        this._isMouseDrawing = false;
        this._isMouseHovering = false;

        this._tool_sizes = [1, 3, 5, 7, 12];
        this._size_display_names = ["X-Small", "Small", "Medium", "Large", "X-Large"];
        this._default_tool_colour = {"pen":"black", "eraser":"white"};
        this._brush_colours = ["#E06666", "orange", "#FFD966", "green", "blue", "indigo", "violet"];
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
        update_selected_tool_backgroundColor("pen");
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
            case "eraser": { this._erase_line(); break; }
            case "pen": { this._draw_line(); break; }
            case "paintbrush": { this._draw_line(); break; }
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

        switch (tool){
            case "paintbrush": { this._change_paintbrush_colour(); break; }
            case "pen": { this._set_colour_to_tool_default(tool); break;}
            case "eraser": { this._set_colour_to_tool_default(tool); break; }
        }

    }

    cycle_tool_size(){
        const len = this._tool_sizes.length;
        this._last_tool_size_index = this._increment_array_indexer(len, this._last_tool_size_index);

        this.current_tool_size = this._tool_sizes[this._last_tool_size_index];
    }

    _set_colour_to_tool_default(tool){
        this.current_colour = this._default_tool_colour[tool];
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

    get_current_tool_size(){
        return this._size_display_names[this._last_tool_size_index];
    }
}

/* Button Commands */
function clear_canvas() {
    whiteboard.clear_canvas();
}

function select_tool(tool_name){
    whiteboard.select_tool(tool_name);
    update_selected_tool_background_colour();
}

function cycle_size(){
    whiteboard.cycle_tool_size();

    document.getElementById("tool_size").innerHTML = "Size: " + whiteboard.get_current_tool_size();
}

function update_selected_tool_background_colour(){
    const tools = whiteboard.get_tools();
    const selected_tool = whiteboard.get_current_tool();

    const default_background_colour = "#1e90ff"; // Blue
    const selected_tool_background_colour = "#E16F00"; // Orange

    if (selected_tool == "paintbrush"){
        document.getElementById("paintbrush").style.backgroundColor = whiteboard.get_current_colour();
    }

    for (let i = 0; i < tools.length; i++){
        let tool_button = document.getElementById(tools[i]);

        if (tool_button.innerHTML.toLowerCase() != selected_tool){
            tool_button.style.backgroundColor = default_background_colour;
            continue;
        }

        if (selected_tool != "paintbrush"){
            tool_button.style.backgroundColor = selected_tool_background_colour;
        }
    }


}

var whiteboard = new Whiteboard();
whiteboard.initialize();