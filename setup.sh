#!/bin/bash
echo "Script started!"

# Install dependencies
zenity --progress --title="AgDrone" --text="Installing base dependencies..." --auto-close --percentage=5

sudo apt update -y # update things
sudo apt upgrade -y # upgrade things
zenity --progress --title="AgDrone" --text="Installing base dependencies..." --auto-close --percentage=30
sudo apt install python3 python3-pip git firefox -y # install python in case it's not installed
#sudo apt install python3 idle3 python3-pip git python3-dev python3-opencv python3-wxgtk4.0 python3-pip python3-matplotlib python3-lxml python3-pygame -y
sudo usermod -a -G dialout $USER # add user to dialout group
zenity --progress --title="AgDrone" --text="Installing base dependencies..." --auto-close --percentage=70
sudo apt-get install nodejs npm -y
node -v # verifies the right Node.js version is in the environment
npm -v # verifies the right npm version is in the environment

zenity --progress --title="AgDrone" --text="Installing base dependencies..." --auto-close --percentage=100

# create virtual environment
zenity --progress --title="AgDrone" --text="Creating virtual environment..." --auto-close --percentage=0
sudo rm -rf drone-gui-venv # remove old virtual environment
python3 -m venv drone-gui-venv # create new virtual environment
zenity --progress --title="AgDrone" --text="Creating virtual environment..." --auto-close --percentage=50
source drone-gui-venv/bin/activate # activate virtual environment
zenity --progress --title="AgDrone" --text="Creating virtual environment..." --auto-close --percentage=100

# pip3 installs
zenity --progress --title="AgDrone" --text="Installing backend dependencies..." --auto-close --percentage=0
pip3 install -r backend/requirements.txt # install backend dependencies using text file
#pip3 install PyYAML mavproxy --user
zenity --progress --title="AgDrone" --text="Installing backend dependencies..." --auto-close --percentage=40

# npm installs
zenity --progress --title="AgDrone" --text="Installing frontend dependencies..." --auto-close --percentage=75
cd ui # go to frontend directory
npm install # install frontend dependencies
cd .. # go back
zenity --progress --title="AgDrone" --text="Installing frontend dependencies..." --auto-close --percentage=100

# check drone gui is up to date
zenity --progress --title="AgDrone" --text="Checking for updates..." --auto-close --percentage=0
git pull # check for updates

zenity --progress --title="AgDrone" --text="Checking for updates..." --auto-close --percentage=100

zenity --info --title="AgDrone" --text="Script finished!"

echo "Script finished!"

