from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!' # prints hello world to the browser

# Establish a connection to the drone ----------------- CHANGE THIS WHEN MULTI-OS CONNECTION SUPPORT IS ADDED
@app.route('/connect')
def connect():
    from functions import find_serial_port, connectToDrone
    serialPort = find_serial_port()
    drone = connectToDrone(serialPort)
    print("Drone connected!")
    return 'Drone connected!'

if __name__ == '__main__':
    app.run()
