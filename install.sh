#!/bin/bash
sudo apt install git -y # install git 

cd /dev # move to dev folder
sudo git clone https://github.com/OSU-AgDrone/DroneGUI.git # clone repository
cd DroneGUI # move to repository
sudo git checkout main # checkout main branch
sudo ./setup.sh # run setup script

sudo cp drone_boot.service /etc/systemd/system/drone_boot.service # adding startup script to init folder
sudo systemctl enable drone_boot.service # enable service
sudo systemctl start drone_boot.service # start service