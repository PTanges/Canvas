# Canvas Front-End Logic
from flask import Flask
from flask import render_template

app = Flask(__name__) # WSGI class directs Flask resources

@app.route('/') # Decorator, called by a given URL
def index():
	return render_template('index.html')

if __name__ == "__main__":
	app.run()