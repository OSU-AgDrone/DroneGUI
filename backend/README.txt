Instructions:

** DOES NOT SUPPORT PYTHON 3.12 (removed imp module, use 3.11 or earlier) **
To run the application:
    pip3 install -r requirements.txt
    source venv/bin/activate
    flask run

Basic Controls:
++ In addition to the above running instructions ++
    1. Open a browser and navigate to http://127.0.0.1:5000/
    2. If "Hello World" is displayed, the application is running correctly
    3. navigate to http://127.0.0.1:5000/controls/
    4. Click on the "Connect to Drone" button
    5. Click on the "Arm" button
    6. Continue with desired controls
    7. Click on the "Disarm" button when finished


mission_planner.py:
    Contains functions to create a mission plan for the drone to follow. When run as a file 
    is will create an example mission plan and visualize the waypoints and path on a graph.
    The intended "access" function is plan_from_boundaries, which takes a list of 
    {"lat": float, "lon": float} boundaries, int altitude (meters), int speed (m/s), 
    is_fly_through (bool), float loiter_time, and a MissionItem.VehicleAction vehicle_action.
    The function returns a MissionPlan object. 

sim_mission.py:
    This file contains an example mission intended to be used only inside the SIM. It is a
    development file and could be removed in release.