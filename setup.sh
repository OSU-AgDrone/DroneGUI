#!/bin/bash
echo "Script started!"

git pull # check for updates
cp -f drone_boot.sh /etc/init.d/drone_boot.sh # adding startup script to init folder


# Install dependencies
sudo apt update -y # update things
sudo apt upgrade -y # upgrade things
sudo apt install python3 python3-pip git firefox -y # install python in case it's not installed
sudo usermod -a -G dialout $USER # add user to dialout group
sudo apt-get install nodejs npm -y
node -v # verifies the right Node.js version is in the environment
npm -v # verifies the right npm version is in the environment

# python environment installs
sudo rm -rf drone-gui-venv # remove old virtual environment
python3 -m venv drone-gui-venv # create new virtual environment
source drone-gui-venv/bin/activate # activate virtual environment
pip3 install -r backend/requirements.txt # install backend dependencies using text file

# npm installs
cd ui # go to frontend directory
npm install # install frontend dependencies
cd .. # go back

echo "Script finished!"

