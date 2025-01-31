#!/bin/bash
sudo apt install git -y # install git 
git clone https://github.com/OSU-AgDrone/DroneGUI.git # clone repository
cd DroneGUI # move to repository
git checkout main # checkout main branch
sudo cp drone_boot.sh /etc/init.d/drone_boot.sh # adding startup script to init folder