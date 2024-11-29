# Canvas
A web application allowing users to collaborate in real-time through a cross-platform Canvas interface.

<br>

## Overview
The application draws inspiration from the Google Cloud and Microsoft Paint, aiming to blend the two systems together for a cohesive yet familiar experience. Users may access the site from any device to create diagrams, artworks, or other brainstorm-esque materials with the variety of tools provided.

<br>

A link to the hosted Canvas can be found [here](https://canvas-82fz.onrender.com) via the Render hosting service.

<br>

Supported versions:

- Windows 11

<!--
- Windows 10
-->

## Dependencies
- `Flask`: 3.0.3
- `Flask-SocketIO`: 5.4.1
- `gunicorn`: 23.0.0

### Windows
On Windows, be sure to install the given dependencies before running the project.

- Installing dependencies

  ```sh
  python -m venv venv # create virtual environment
  pip install Flask
  pip install Gunicorn
  pip install flask flask-socketio
  ```

- Run Project

  ```sh
  flask --app main run
  ```

- Run debug mode

  ```sh
  flask --app main run --debug
  ```

- Build (Render)
  
  ```sh
  $ pip install -r requirements.txt
  ```

- Deployment (Render)
  
  ```sh
  gunicorn main:app
  ```

<br>

Additionally, one may wish to run experimental features. One may encounter unexpected results on these unincorporated branch(es).

- Run Project (Experimental Branch: /canvas.network_connectivity_functionality.pt)
  ```sh
  flask --app app run --debug # Be sure to open multiple connections to the local host instead of additional terminal instances.
  ```


Meta
=======
- `P. Tang` for project planning, development, documentation, and implementation.
- **Language(s)**: Python, JavaScript
- **Framework(s)**: Flask