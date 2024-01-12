from pymavlink import mavutil
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

    if system == 'Windows':
        connection = mavutil.mavlink_connection(device=serialPort, baud=57600)
    elif system == 'Darwin':
        connection = mavutil.mavlink_connection(device=f"serial://{serialPort}:57600", baud=57600) # needs testing on darwin to determine if baudrate needs to be specified twice
    else:
        raise Exception("platform currently not supported")
    
    connection.wait_heartbeat()
    print("Heartbeat from system (system %u component %u)" % (connection.target_system, connection.target_component))
    return connection

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(connectToDrone(find_serial_port()))