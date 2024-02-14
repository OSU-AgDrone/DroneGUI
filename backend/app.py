from flask import Flask, render_template, request
from functions import find_serial_port, connectToDroneTimeout, armDrone, disarmDrone, takeoffDrone, landDrone
from mavsdk.mission import Mission, MissionItem, MissionPlan
import asyncio

app = Flask(__name__)
loop = asyncio.get_event_loop()

app.drone_system = None # store the drone object in the app object
app.mavsdk_server = None # store the mavsdk binary process running in the background on windows machines

# Decorator to ensure drone is connected
def check_drone_connected(func):
    def wrapper():
        if app.drone_system is None:
            print("Drone is not connected.")
        else:
            func()
        return wrapper 

@app.route('/')
def hello_world():
    return 'Hello, World!' # prints hello world to the browser

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
    from functions import beepDrone
    if app.drone_system:
        # beepDrone(app.drone_system)
        loop.run_until_complete(beepDrone(app.drone_system))

# Arm the drone
@app.route('/arm')
@check_drone_connected
async def arm_drone():
    await armDrone(app.drone_system)
    if app.drone_system.armed:  # Check if the drone is armed
        print("Drone armed!")
        return 'Drone armed!'
    else:
        print("Drone not armed!")
        return 'Drone not armed!'

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
@check_drone_connected
def takeoff_drone():
    takeoffDrone(app.drone_system)  # Fix the function call
    print("Drone takeoff!")
    return 'Drone takeoff!'

# Land the drone
@app.route('/land')
@check_drone_connected
def land_drone():
    landDrone(app.drone_system)  # Fix the function call
    print("Drone landed!")
    return 'Drone landed!'

@app.route('/fly-mission')
@check_drone_connected
def fly_mission():
    if app.drone_system:
        mission_items = []
        waypoint_vectors = request.args.get('waypoint_vectors')
        relative_altitude_m = request.args.get('relative_altitude_m')
        speed_m_s = request.args.get('speed_m_s')
        is_fly_through = request.args.get('is_fly_through')

        for i in range(len(waypoint_vectors)):
            mission_items.append(
                MissionItem(
                    waypoint_vectors[i][0],
                    waypoint_vectors[i][1],
                    relative_altitude_m,
                    speed_m_s,
                    is_fly_through
                )
            )

        plan = MissionPlan(mission_items)

        mission = Mission()

        mission.upload_mission(plan)

        mission.start_mission()
        
if __name__ == '__main__':
    app.run()