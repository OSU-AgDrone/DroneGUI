from mavsdk import System
import asyncio
import os
import serial.tools.list_ports
import platform


def find_serial_port():
    system = platform.system()
    
    if system == "Windows":
        return find_serial_port_windows()
    elif system == "Darwin":
        return find_serial_port_mac()
    elif system == "Linux":
        return find_serial_port_linux()
    else:
        raise Exception(f"Unsupported operating system: {system}")

def find_serial_port_windows():
    ports = list(serial.tools.list_ports.comports())
    for port in ports:
        if "USB" in port.description.upper():
            return port.device
    raise Exception("No drone found on serial ports.")

def find_serial_port_mac():
    ports = list(serial.tools.list_ports.comports())
    for port in ports:
        if "USB" in port.description.upper():
            return port.device
    raise Exception("No drone found on serial ports.")

def find_serial_port_linux():
    ports = list(serial.tools.list_ports.comports())
    for port in ports:
        if "USB" in port.description.upper():
            return port.device

    # If not found using pyserial, try reading from /dev
    for port in os.listdir('/dev'):
        if "USB" in port.upper():
            return '/dev/' + port
    raise Exception("No drone found on serial ports.")

async def connectToDrone(serialPort):
    '''
    Establishes a connection to the drone over a provided serial port. Returns the drone object.
    Parameters: serialPort (string) - the serial port to connect to
    Returns: drone (System) - the drone object
    
    '''
    print("Connecting to drone...")
    drone = System()

    await drone.connect(system_address=f"serial://{serialPort}:57600")

    async for state in drone.core.connection_state():
        if state.is_connected:
            print("Drone connected!")

            break

    return drone

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(connectToDrone(find_serial_port()))