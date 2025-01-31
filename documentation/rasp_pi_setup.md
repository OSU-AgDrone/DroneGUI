# Setting up the Raspberry Pi

## Installing Raspberry Pi OS (64-bit)
### Writing the OS to an SD card
For installing the operating system, follow the [official installation instruction](https://www.raspberrypi.com/documentation/computers/getting-started.html).
    - We recommend using a 32GB MicroSD card or larger that is designed for endurance. Our testing was conducted on [this specific MicroSD card](https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-high-endurance-uhs-i-microsd?sku=SDSQQNR-128G-GN6IA), but any MicroSD card will work that the Raspberry Pi Imager will allow you to use.
## Setup the Raspberry Pi with the AgDrone software
1. Start up the Raspberry Pi with the MicroSD card, case, screen, keyboard, and mouse assembled. 
2. Once the Raspberry Pi has booted up and is on the desktop, connect to a wired or wireless network.
    - For a wired network, plug in the ethernet cable into the Raspberry Pi
    - For a wireless network, tap/click on the network logo on the top-right corner of the screen. 
        - If you are asked to set the WiFi region, set it. 
        - If the network you added when using the Raspberry Pi Imager is connected, then you don't need to do anything. 
        - If you did not set a network or the network you set is not connecting, tap on it to connect.
3. Open the Terminal application, which is the black icon with an angle bracket on it, on the topbar. Next, paste this command and press enter/return to start the install process.
    `curl https://raw.githubusercontent.com/OSU-AgDrone/DroneGUI/refs/heads/main/install.sh | bash`