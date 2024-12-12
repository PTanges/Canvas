# Canvas Back-End Logic
from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, leave_room, send, emit
import datetime

# TO DO NOTE: Before deployment & merging, transfer all code here into main.py bc that's what gunicorn calls atm on Render

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
user_connection_counter = 0;

@app.route('/') # Decorator, called by a given URL
def index():
    return render_template('index.html')

@socketio.on('message') # SocketIO messages are received by both parties as events, JS callbacks on client-side
def handle_message(data):
    date = datetime.datetime.now()
    print(f'{date} - Received Message: {data}')

@socketio.on('connect') # On client connection to server
def connect():
    print("Client connected!")
    print("SID: " + request.sid)
    global user_connection_counter # Global allows for variable to be modified
    user_connection_counter += 1
    print("User Connection Counter: " + str(user_connection_counter))
    socketio.send(user_connection_counter)



if __name__ == '__main__':
    socketio.run(app) # encapsulates & replaces app.run() for websocket support