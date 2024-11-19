# Canvas Back-End Logic
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config.from_pyfile('config.py')

socketio = SocketIO(app)

default_connect_message = "User connected!"
default_disconnect_message = "User disconnected!"

@app.route('/')
def index():
	return render_template('index.html')

@socketio.on('message_event')
def message_event(data):
    emit('response_event', {'message':data}, broadcast=True)

@socketio.on('connect')
def on_connect():
    emit('response_event', {'message': default_connect_message}, broadcast=True)

@socketio.on('disconnect')
def on_disconnect():
    emit('response_event', {'message': default_disconnect_message}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)