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

# Example usage
try:
    serial_port = find_serial_port()
    print("Serial Port:", serial_port)
except Exception as e:
    print(f"Error: {e}")
