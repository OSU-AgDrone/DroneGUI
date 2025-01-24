# Ag Drone Project
An open source agricultural drone built by students at Oregon State University

<img src="documentation/images/ag_drone.png" alt="Ag Drone Logo" width="200">

## How to Turn the Drone On
### First Time Startup
1. Setup the [Raspberry Pi Tablet](documentation/rasp_pi_setup.md)
2. Have your drone completely wired, connected, and setup.
   - We have a [parts list](documentation/parts_list.md) for the version we used for testing and prototyping.
3. If you are using a Transmitter controller, ensure it is connected according to the manufacturers instructions.
4. Copy and paste this command in the terminal to install the AgDrone software auto-magically
   - curl https://raw.githubusercontent.com/AgDrone/AgDroneGUI/main/install.sh | bash


### General Startup
1. Plug in your drone batteries

## Troubleshooting
### Basic Troubleshooting
1. Once the drone has been safely landed and disarmed, unplug and replug the batteries. Trust me, this can fix most problems with electronics.

### Advanced Issues and Troubleshooting
If you are having issues that aren't listed or addressed above...
1. Check out the [documentation files](documentation/doc_directory.md)
2. Feel free to reach out to any of the recent Github project maintainers



# Backend Instructions

**DOES NOT SUPPORT PYTHON 3.12** (removed imp module, use 3.11 or earlier).

To run the application:
1. Optional: create a virtual environment (`python -m venv dronegui-env`), then `source dronegui-env/bin/activate`
2. `pip3 install -r requirements.txt`
3. `python -m flask run`

Basic Controls:
  1. Open a browser and navigate to http://127.0.0.1:5000/
  2. If "Hello World" is displayed, the application is running correctly
  3. navigate to http://127.0.0.1:5000/controls/
  4. Click on the "Connect to Drone" button
  5. Click on the "Arm" button
  6. Continue with desired controls
  7. Click on the "Disarm" button when finished

Note this is primarly available for testing purposes; these routes can be triggered via the user interface.

**mission_planner.py**

Contains functions to create a mission plan for the drone to follow. When run as a file 
is will create an example mission plan and visualize the waypoints and path on a graph.
The intended "access" function is plan_from_boundaries, which takes a list of 
{"lat": float, "lon": float} boundaries, int altitude (meters), int speed (m/s), 
is_fly_through (bool), float loiter_time, and a MissionItem.VehicleAction vehicle_action.
The function returns a MissionPlan object. 

**sim_mission.py**

This file contains an example mission intended to be used only inside the SIM. It is a
development file and could be removed in release.

# User Interface Instructions
The UI can be run using `npm`:
1. [Install Node.js](https://nodejs.org/en/download/package-manager) if you don't already have it
2. `npm install; npm start`