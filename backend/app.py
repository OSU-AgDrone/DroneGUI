from flask import Flask, render_template
from functions import find_serial_port, connectToDroneTimeout, armDrone, disarmDrone, takeoffDrone, landDrone

app = Flask(__name__)

drone_system = None # the drone object
app.drone_system = drone_system # store the drone object in the app object

@app.route('/')
def hello_world():
    return 'Hello, World!' # prints hello world to the browser

# Establish a connection to the drone ----------------- CHANGE THIS WHEN MULTI-OS CONNECTION SUPPORT IS ADDED
@app.route('/connect')
async def connect():
    serialPort = find_serial_port()
    drone = await connectToDroneTimeout(serialPort, 20) # connect to the drone with a failure timeout of 20 seconds
    if drone:
        print("Drone connected!")
        app.drone_system = drone
        return 'Drone connected!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Display the controls page with buttons
@app.route('/controls')
def controls():
    return render_template('controls.html')

# Arm the drone
@app.route('/arm')
async def arm_drone():
    if app.drone_system:
        await armDrone(app.drone_system)
        if app.drone_system.armed:  # Check if the drone is armed
            print("Drone armed!")
            return 'Drone armed!'
        else:
            print("Drone not armed!")
            return 'Drone not armed!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Disarm the drone
@app.route('/disarm')
def disarm_drone():
    if app.drone_system:
        disarmDrone(app.drone_system)  # Fix the function call
        print("Drone disarmed!")
        return 'Drone disarmed!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Takeoff the drone
@app.route('/takeoff')
def takeoff_drone():
    if app.drone_system:
        takeoffDrone(app.drone_system)  # Fix the function call
        print("Drone takeoff!")
        return 'Drone takeoff!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Land the drone
@app.route('/land')
def land_drone():
    if app.drone_system:
        landDrone(app.drone_system)  # Fix the function call
        print("Drone landed!")
        return 'Drone landed!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

if __name__ == '__main__':
    app.run()