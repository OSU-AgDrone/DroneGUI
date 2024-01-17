from mavsdk import System
import asyncio
import os
import serial.tools.list_ports
import platform


def find_serial_port():
    '''
    Finds serial port that drone telemetry radio is connected to. Currently supports
    Windows, Darwin, and Linux.
    
    '''
    system = platform.system()
    ports = list(serial.tools.list_ports.comports())
    for port in ports:
        if "USB" in port.description.upper():
            return port.device
    if system == "Linux":
        # If not found using pyserial, try reading from /dev
        for port in os.listdir('/dev'):
            if "USB" in port.upper():
                return '/dev/' + port
        raise Exception("No drone found on serial ports.")
    else:
        raise Exception(f"Unsupported operating system: {system}")

async def connectToDrone(serialPort):
    '''
    Establishes a connection to the drone over a provided serial port. Returns the drone object.
    Parameters: serialPort (string) - the serial port to connect to
    Returns: drone (System) - the drone object
    
    '''
    system = platform.system()
    print("Connecting to Drone")
    drone = System()

    # connect to the drone on mac / (all of the operating systems?)
    await drone.connect(system_address=f"serial://{serialPort}:57600")

    # connect to the drone on windows
    # if system == 'Windows':
    #     connection = mavutil.mavlink_connection(device=serialPort, baud=57600)
    #     connection.wait_heartbeat()
    #     print("Heartbeat from system (system %u component %u)" % (connection.target_system, connection.target_component))

    # connect to the drone on linux
    # connection code here

    async for state in drone.core.connection_state():
        if state.is_connected:
            print(f"Drone discovered with UUID: {state.uuid}")
            break

    return drone

async def armDrone(drone):
    '''
    Arms the drone.
    Parameters: drone (System) - the drone object
    
    '''
    print("Arming drone")
    await drone.action.arm()

async def disarmDrone(drone):
    '''
    Disarms the drone.
    Parameters: drone (System) - the drone object
    
    '''
    print("Disarming")
    await drone.action.disarm()

async def takeoffDrone(drone):
    '''
    Takes off the drone.
    Parameters: drone (System) - the drone object
    
    '''
    print("Taking off")
    await drone.action.takeoff()

async def landDrone(drone):
    '''
    Lands the drone.
    Parameters: drone (System) - the drone object
    
    '''
    print("Landing")
    await drone.action.land()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(connectToDrone(find_serial_port()))