socket = io();
socket.connect('http://127.0.0.1:5000/');

// On Connect to Server
socket.on('connect', function(){
    socket.send("New user connected!");
});

// Incoming data
socket.on('message', function(server_data){
    update_header_message("Client ID: " + server_data);
});

// To Do: Implement callback
function ping_server(){
    socket.send("Ping from client!");
}

function reset_header_message(){
    _set_header_message("")
}

function update_header_message(new_text){
    _set_header_message(new_text)
}

function _set_header_message(new_text){
    document.getElementById("web-message").innerHTML = new_text;
}