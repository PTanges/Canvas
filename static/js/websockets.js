socket = io();
socket.connect('http://127.0.0.1:5000/');

socket.on('connect', function(){
    socket.send("New user connected!");
});