from flask import Flask, render_template
from functions import find_serial_port, connectToDrone, armDrone, disarmDrone, takeoffDrone, landDrone

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!' # prints hello world to the browser

# Establish a connection to the drone ----------------- CHANGE THIS WHEN MULTI-OS CONNECTION SUPPORT IS ADDED
@app.route('/connect')
async def connect():
    serialPort = find_serial_port()
    drone = await connectToDrone(serialPort)
    if drone:
        print("Drone connected!")
        return 'Drone connected!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Display the controls page with buttons
@app.route('/controls')
def controls():
    return render_template('templates/controls.html')

# Arm the drone
@app.route('/arm')
def arm_drone():
    armDrone()
    return 'Drone armed!'

# Disarm the drone
@app.route('/disarm')
def disarm_drone():
    disarmDrone()
    return 'Drone disarmed!'

# Takeoff the drone
@app.route('/takeoff')
def takeoff_drone():
    takeoffDrone()
    return 'Drone takeoff!'

# Land the drone
@app.route('/land')
def land_drone():
    landDrone()
    return 'Drone landed!'

if __name__ == '__main__':
    app.run()
