from flask import Flask, render_template, session
from functions import find_serial_port, connectToDroneTimeout, armDrone, disarmDrone, takeoffDrone, landDrone

app = Flask(__name__)
app.secret_key = 'TEMPORARY_SECRET_KEY' # secret key for the session

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
        session['drone'] = drone # store the drone object in the session to be accessed by other routes
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
def arm_drone():
    drone = session.get('drone')
    if drone:
        armDrone(drone)
        print("Drone armed!")
        return 'Drone armed!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Disarm the drone
@app.route('/disarm')
def disarm_drone():
    drone = session.get('drone')
    if drone:
        disarmDrone(drone)  # Fix the function call
        print("Drone disarmed!")
        return 'Drone disarmed!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Takeoff the drone
@app.route('/takeoff')
def takeoff_drone():
    drone = session.get('drone')
    if drone:
        takeoffDrone(drone)  # Fix the function call
        print("Drone takeoff!")
        return 'Drone takeoff!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

# Land the drone
@app.route('/land')
def land_drone():
    drone = session.get('drone')
    if drone:
        landDrone(drone)  # Fix the function call
        print("Drone landed!")
        return 'Drone landed!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

if __name__ == '__main__':
    app.run()