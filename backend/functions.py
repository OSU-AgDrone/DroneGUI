from mavsdk import System, tune
import asyncio
import os
import serial.tools.list_ports
import platform
import subprocess


def find_serial_port():
    '''
    Finds serial port that drone telemetry radio is connected to. Currently supports
    Windows, Darwin, and Linux.
    
    '''
    system = platform.system()
    ports = list(serial.tools.list_ports.comports())
    for port in ports:
        if "USB" in port.description.upper():
            return port.device # works on windows & mac
    if system == "Linux":
        # If not found using pyserial, try reading from /dev
        for port in os.listdir('/dev'):
            if "USB" in port.upper():
                return '/dev/' + port
        raise Exception("No drone found on serial ports.")
    else:
        raise Exception(f"Unsupported operating system: {system}")
    
async def connectToDroneTimeout(serialPort, timeout):
    '''
    Timeout shell function to connect to the drone.
    Parameters: serialPort (string) - the serial port to connect to
                timeout (int) - the timeout in seconds
    Returns: drone (System) - the drone object
    '''
    try:
        return await asyncio.wait_for(connectToDrone(serialPort), timeout)
    except asyncio.TimeoutError:
        print("Connection timed out.")
        return None

async def connectToDrone(serialPort):
    '''
    Establishes a connection to the drone over a provided serial port. Returns the drone object.
    Parameters: serialPort (string) - the serial port to connect to
    Returns: drone (System) - the drone object
    
    '''
    print("Connecting to Drone")
    system = platform.system()

    # To connect on Windows, mavsdk_server_address & port need to be
    # provided, and bin/mavsdk_server_win32.exe needs to be run using
    # ./mavsdk_server_win32.exe {CONNECTION_STRING}
    # e.g ./mavsdk_server_win32.exe serial://COM3:57600
    connection_string = f"serial://{serialPort}:57600"

    if system == 'Windows':
        mavsdk_server = subprocess.Popen(['./bin/mavsdk_server_win32.exe', connection_string]) # needs to be killed with mavsdk_server.terminate() when program is killed
        drone = System(mavsdk_server_address='localhost', port=50051)
    else:
        drone = System()

    await drone.connect(system_address=connection_string)

    async for state in drone.core.connection_state():
        if state.is_connected:
            print(f"Drone discovered and connected!")
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

async def beepDrone(drone):
    '''
    Beeps the drone.
    Parameters: drone (System) - the drone object
    
    '''
    print("Beeping")
    tune_desc = tune.TuneDescription(
        song_elements=[tune.SongElement.NOTE_A, tune.SongElement.DURATION_4],
        tempo=120  # Adjust the tempo as needed (in the range: 32 - 255)
    )

    await drone.tune.play_tune(tune_desc)


if __name__ == "__main__":
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(connectToDrone(find_serial_port()))
    async def main():
        # Connect to the drone
        input("Press Enter to connect to the drone...")
        serial_port = find_serial_port()
        print(f"Connecting to drone on {serial_port}...")
        drone = await connectToDroneTimeout(serial_port, timeout=10)

        # Beep the drone
        input("Press Enter to beep the drone...")
        await armDrone(drone)
        print("Beeped the drone!")

    asyncio.run(main())