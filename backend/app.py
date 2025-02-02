from flask import Flask, render_template, request, redirect, jsonify
from mavsdk.mission import Mission, MissionItem, MissionPlan
from mavsdk.async_plugin_manager import AsyncPluginManager
import asyncio
from mavsdk import System
from flask_cors import CORS
import json
import platform
import subprocess

from connection_functions import find_serial_port, connectToDroneTimeout, connectToDroneSim
from mission_planner import plan_from_boundaries, generate_mission_plan

app = Flask(__name__)
CORS(app)
loop = asyncio.get_event_loop()
plugin_manager = AsyncPluginManager()

app.drone_system = System() # store the drone object in the app object
app.mavsdk_server = None # store the mavsdk binary process running in the background on windows machines

# Decorator to ensure drone is connected
def check_drone_connected(func):
    def wrapper(*args, **kwargs):
        if app.drone_system is None:
            print("Drone is not connected.")
        else:
            return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper 

@app.route('/')
def hello_world():
    
    return redirect("/controls") # prints hello world to the browser

# establish connection to simulated drone
@app.route('/connect-sim')
async def connect_sim():
    drone = await connectToDroneSim()
    if drone:
        print("Drone connected!")
        app.drone_system = drone
        return 'Drone connected!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Establish a connection to the drone
@app.route('/connect')
async def connect():
    serialPort = find_serial_port()
    drone, mavsdk_server = await connectToDroneTimeout(serialPort, 20) # connect to the drone with a failure timeout of 20 seconds
    if drone:
        print("Drone connected!")
        app.drone_system = drone
        if mavsdk_server:
            app.mavsdk_server = mavsdk_server
        return 'Drone connected!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'
    
@app.route('/shutdown')
async def shutdown():
    if app.mavsdk_server:
        app.mavsdk_server.terminate()
        print("Mavsdk binary terminated")
        return 'Mavsdk binary terminated.'

# Display the controls page with buttons
@app.route('/controls')
def controls():
    return render_template('controls.html')

# Beep the drone
@app.route('/beep')
def beep_drone():
    from connection_functions import beepDrone
    if app.drone_system:
        # beepDrone(app.drone_system)
        loop.run_until_complete(beepDrone(app.drone_system))

# Arm the drone
@app.route('/arm')
# @check_drone_connected
async def arm_drone():
    print("Arming drone")
    # await app.drone_system.connect()
    await app.drone_system.action.arm()
    print("Drone armed!")
    return 'Drone armed!'

# Disarm the drone
@app.route('/disarm')
async def disarm_drone():
    if app.drone_system:
        await app.drone_system.action.disarm()        
        print("Drone disarmed!")
        return 'Drone disarmed!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Takeoff the drone
@app.route('/takeoff')
# @check_drone_connected
async def takeoff_drone():
    serialPort = find_serial_port()
    drone, mavsdk_server = await connectToDroneTimeout(serialPort, 20) # connect to the drone with a failure timeout of 20 seconds
    app.drone_system = drone
    await app.drone_system.action.takeoff()
    print("Drone takeoff!")
    return 'Drone takeoff!'

# Land the drone
@app.route('/land')
# @check_drone_connected
async def land_drone():
    await app.drone_system.action.land()
    print("Drone landed!")
    return 'Drone landed!'

# CURRENTLY A TESTING ROUTE. 
@app.route('/fly-mission', methods=['POST'])
# @check_drone_connected
async def fly_mission():
    system = platform.system()
    serialPort = 'COM3'
    connection_string = f"serial://{serialPort}:57600"

    if system == 'Windows':
        subprocess.Popen(['./bin/mavsdk_server_win32.exe', connection_string])
        drone = System(mavsdk_server_address='localhost', port=50051)
    else:
        drone = System()
    await drone.connect(system_address=connection_string)

    print("Waiting for drone to connect...")
    async for state in drone.core.connection_state():
        if state.is_connected:
            print(f"-- Connected to drone!")
            break
    if drone:
        waypoints = request.json['shape']
        plan = plan_from_boundaries(waypoints)
    
        await drone.mission.set_return_to_launch_after_mission(True)

        # uploading mission
        print("uploading mission")
        await drone.mission.upload_mission(plan)

        await drone.action.arm()

        # start mission
        print("starting mission")
        await drone.mission.start_mission()
        return 'Mission started!'

# Route to generate a mission plan from the boundaries provided by frontend.
@app.route('/generate-mission-plan', methods=['POST'])
def generate_mission_plan():
    if request.method == 'POST':
        boundaries = request.json['shape']
        plan = plan_from_boundaries(boundaries)
        response = jsonify(plan)
        return response

# Route to execute a mission plan
@app.route('/execute-mission-plan', methods=['POST'])
async def execute_mission_plan():
    if request.method == 'POST':
        plan = request.json
        print(plan)

        # connect to the drone again
        await app.drone_system.connect()
        print("Drone connected")

        # upload mission
        await app.drone_system.mission.upload_mission(plan)

        # arm the drone
        await app.drone_system.action.arm()
        print("Drone armed")

        # start mission
        await app.drone_system.mission.start_mission()
        print("Mission started")
        
@app.route('/save-coords', methods=['POST'])
async def save_coords():
    if request.method == 'POST':
        coords = request.json
        if coords is None:
            return jsonify({'error': 'Error: coords received were None'}), 400
        print(coords)
        # get current state of file
        with open('saved_routes.json', 'r') as db:
            data = json.load(db)
        # add to data
        data.append(coords)
        # write it back
        with open('saved_routes.json', 'w') as db:
            json.dump(data, db, indent=4)
        return jsonify({'message': 'Success: coords saved to database'}), 200

@app.route('/get-coords', methods=['GET'])
async def get_coords():
    if request.method == 'GET':
        with open('saved_routes.json', 'r') as db:
            data = json.load(db)
            return jsonify(data), 200
    else:
        return jsonify({'error': 'Invalid HTTP request method'})

if __name__ == '__main__':
    app.run()