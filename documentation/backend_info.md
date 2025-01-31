# Backend Developer Guide
## General Info 
The backend is a (flask)[https://flask.palletsprojects.com/en/stable/] application written in Python which uses the (mavsdk library)[https://mavsdk.mavlink.io/main/en/index.html] to communicate with the drone. As of writing this, we have confirmed the `/connect` route is functional and can connect to the drone. The `/get-coords` and `/save-coords` routes were developed by the 2024 team and successfully read and write to the "database" (`saved_routes.json`). **Note that mavsdk is the same underlying library that is used by available programs to talk to the drone, such as QGroundControl or Mission Planner. We HIGHLY recommend using QGroundControl for manual programming of the drone and to see what the app is able to accomplish through mavsdk**

### app.py
The `app.py` script is the main file for the application and contains the endpoints which trigger functions that control the drone. The frontend's buttons can be (and many are) configured to make HTTP `GET` or `POST` requests to these endpoints, allowing the app to control the drone through mavsdk. 

### connection_functions.py
The functions in `connection_functions.py` use the mavsdk library to talk to the drone. Having this file separates the functions from the server that hosts the endpoints. Most endpoints call into these functions, and we recommend future teams develop functions within this file. 

### sim_mission.py
This was developed before the 2024 team and was not used this year. It simulates all parts of a mission and tests the mavsdk functions. This may be a useful reference for further developing the backend and learning what mavsdk is capable of. 

From the 2023 team:

`
This file contains an example mission intended to be used only inside the SIM. It is a development file and could be removed in release.
`

### mission_planner.py
From the 2023 team:

`
Contains functions to create a mission plan for the drone to follow. When run as a file 
is will create an example mission plan and visualize the waypoints and path on a graph.
The intended "access" function is plan_from_boundaries, which takes a list of 
{"lat": float, "lon": float} boundaries, int altitude (meters), int speed (m/s), 
is_fly_through (bool), float loiter_time, and a MissionItem.VehicleAction vehicle_action.
The function returns a MissionPlan object. 
`

### saved_routes.json
`saved_routes.json` is the database for storing the routes that the drone can be instructed to travel on. Each route is represented by JSON objects like the following:
```
{
  'name': <string>,
  'shape': [
       {
       'lat': <float>,
       'long': <float>
       }
       ... 
    ]
  }
```
Note that this "database" is simply a JSON array of many of these Route objects. These objects MUST always be contained within the array brackets and separated by commas:
```
[
    <route>,
    <route>,
    <route>,
    ...
]
``` 
These routes are accessed by the frontend to display them on the `Saved Maps Page`. The frontend will load the routes from the database and, if the user selects one, uses `localStorage` to track the currently selected route.

## Running the Backend
**DOES NOT SUPPORT PYTHON 3.12, use v3.11 or earlier**
1. [Optional] Create a virtual environment with the command `python -m venv dronegui-env`. Move into this environment with `source dronegui-env/bin/activate`
2. Install the dependencies by running `pip3 install -r requirements.txt`
3. Start the backend application by running `python -m flask run`
The backend will start at `http://127.0.0.1:5000/`, and navigating to this will confirm that the application is working. A simple UI is also available here to manually test the drone controls without running the flushed-out React UI.

## TODOs
The (issues)[https://github.com/orgs/OSU-AgDrone/projects/1/views/1] show all outstanding tasks we were not able to complete and encourage the next teams to work towards. 

## Contact
For critical questions, please reach out on Discord to: 
`@jamopopper` for installation, tablet, or other hardware-adjacent issues
`@seadragon92` for UI, backend, or CORS/network-adjacent issues 