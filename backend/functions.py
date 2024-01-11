from mavsdk import System
import asyncio

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