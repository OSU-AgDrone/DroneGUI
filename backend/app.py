from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!' # prints hello world to the browser

# Establish a connection to the drone ----------------- CHANGE THIS WHEN MULTI-OS CONNECTION SUPPORT IS ADDED
@app.route('/connect')
async def connect():
    from functions import find_serial_port, connectToDrone
    serialPort = find_serial_port()
    drone = await connectToDrone(serialPort)
    if drone:
        print("Drone connected!")
        return 'Drone connected!'
    else:
        print("Drone not connected!")
        return 'Drone not connected!'

if __name__ == '__main__':
    app.run()
