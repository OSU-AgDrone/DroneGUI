from mavsdk import System
import asyncio

async def run():
    print("Connecting to drone...")
    drone = System()

    # ls /dev/tty* #(mac)
    # Replace with the address of the serial port the telemetry radio is connected to. The Baudrate is set to 57600 (default)
    await drone.connect(system_address = "serial:///dev/tty.usbserial-D30EZV7Q:57600")

    async for state in drone.core.connection_state():
        if state.is_connected:
            print("Drone discovered!")

            # wait for user to press enter
            input("Press Enter to exit...\n")

            break

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run())

