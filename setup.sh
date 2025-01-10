#!/bin/bash
echo "Script started!"

# Install dependencies
zenity --info --title="AgDrone" --text="Installing base dependencies..." --auto-kill

sudo apt update -y # update things
sudo apt install python3 python3-pip git firefox -y # install python in case it's not installed
#sudo apt install python3 idle3 python3-pip git python3-dev python3-opencv python3-wxgtk4.0 python3-pip python3-matplotlib python3-lxml python3-pygame -y
sudo usermod -a -G dialout $USER # add user to dialout group

sudo apt-get install nodejs npm -y
node -v # verifies the right Node.js version is in the environment
npm -v # verifies the right npm version is in the environment

zenity --info --title="AgDrone" --text="Base dependencies installed!" --auto-kill

# create virtual environment
zenity --info --title="AgDrone" --text="Creating virtual environment..." --auto-kill
sudo rm -rf drone-gui-venv # remove old virtual environment
python3 -m venv drone-gui-venv # create new virtual environment
source drone-gui-venv/bin/activate # activate virtual environment
zenity --info --title="AgDrone" --text="Virtual environment created!" --auto-kill

# pip3 installs
zenity --info --title="AgDrone" --text="Installing backend dependencies..." --auto-kill
pip3 install -r backend/requirements.txt # install backend dependencies using text file
#pip3 install PyYAML mavproxy --user
zenity --info --title="AgDrone" --text="Backend dependencies installed!" --auto-kill

# npm installs
zenity --info --title="AgDrone" --text="Installing frontend dependencies..." --auto-kill
cd ui # go to frontend directory
npm install # install frontend dependencies
cd .. # go back
zenity --info --title="AgDrone" --text="Frontend dependencies installed!" --auto-kill

# check drone gui is up to date
zenity --info --title="AgDrone" --text="Checking for updates..." --auto-kill
git pull # check for updates
sudo apt update -y # update things
sudo apt upgrade -y # upgrade things
zenity --info --title="AgDrone" --text="Updates checked!" --auto-kill

echo "Script finished!"

