const socket = io.connect('http://127.0.0.1:5000');

document.getElementById("clear_canvas").addEventListener("click", push_message);


socket.on('response_event', (data)=>{
    document.getElementById("web-message").innerHTML = data.message;
});

function push_message(){
    socket.emit('message_event', { 'message': "outgoing-message" });
    // Also may use socket.send() for standard...
}