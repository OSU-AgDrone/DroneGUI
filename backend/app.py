from flask import Flask, render_template, request, redirect
from connection_functions import find_serial_port, connectToDroneTimeout, connectToDroneSim
from mavsdk.mission import Mission, MissionItem, MissionPlan
from mavsdk.async_plugin_manager import AsyncPluginManager
import asyncio

app = Flask(__name__)
loop = asyncio.get_event_loop()
plugin_manager = AsyncPluginManager()

app.drone_system = None # store the drone object in the app object
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
    await app.drone_system.connect()
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

@app.route('/fly-mission')
# @check_drone_connected
async def fly_mission():
    if app.drone_system:
        mission_items = []
        # waypoint_vectors = request.args.get('waypoint_vectors')
        # relative_altitude_m = request.args.get('relative_altitude_m')
        # speed_m_s = request.args.get('speed_m_s')
        # is_fly_through = request.args.get('is_fly_through')
        waypoint_vectors = [(47.402, 8.552), (47.40, 8.55)]
        relative_altitude_m = 5
        speed_m_s = 5
        is_fly_through = True

        for i in range(len(waypoint_vectors)):
            mission_items.append(
                MissionItem(
                    waypoint_vectors[i][0],
                    waypoint_vectors[i][1],
                    relative_altitude_m,
                    speed_m_s,
                    is_fly_through, 
                    float("nan"), 
                    float("nan"), 
                    MissionItem.CameraAction.NONE, 
                    float("nan"), 
                    float("nan"), 
                    float("nan"), 
                    float("nan"), 
                    float("nan"), 
                    MissionItem.VehicleAction.NONE
                )
            )

        plan = MissionPlan(mission_items)

        # uploading mission
        print("uploading mission")
        await app.drone_system.mission.upload_mission(plan)

        await app.drone_system.action.arm()

        # start mission
        print("starting mission")
        await app.drone_system.mission.start_mission()
        return 'Mission started!'
        
if __name__ == '__main__':
    app.run()