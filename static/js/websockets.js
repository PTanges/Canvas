import whiteboard from './whiteboard.js'

var socket = io();
socket.connect('http://127.0.0.1:5000/');

// On Connect to Server
socket.on('connect', function(){
    socket.send("New user connected!");
});

// Incoming data
socket.on('message', function(server_data){
    update_header_message("Client ID: " + server_data);
});

socket.on('receive_canvas_data', function(server_canvas_data){
    whiteboard.update_canvas_data(server_canvas_data);
});

// To Do: Implement callback
function ping_server(){
    socket.send("Ping from client!");
}

function update_server_data(){
    const canvas_data = whiteboard.get_canvas_data();
    let json_data = JSON.stringify(canvas_data);
    socket.emit('update', json_data); // Emit are required for custom events
}

function get_server_data(){
    console.log("Get Server Data Command");
    socket.emit('client_get');
}

function reset_header_message(){
    _set_header_message("");
}

function update_header_message(new_text){
    _set_header_message(new_text);
}

function _set_header_message(new_text){
    document.getElementById("web-message").innerHTML = new_text;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("ping_server").addEventListener("click", ping_server);
    document.getElementById("get_server_data").addEventListener("click", get_server_data);
    document.getElementById("update_server_data").addEventListener("click", update_server_data);
});