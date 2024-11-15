#!/bin/bash
echo "Script started!"

# Install dependencies
echo "Installing base dependencies..."

sudo apt update -y # update things
sudo apt install python3 python3-pip git -y # install python in case it's not installed
#sudo apt install python3 idle3 python3-pip git python3-dev python3-opencv python3-wxgtk4.0 python3-pip python3-matplotlib python3-lxml python3-pygame -y
sudo usermod -a -G dialout $USER # add user to dialout group

curl -o install.sh https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh # installs nvm
bash install.sh # run install script
nvm install 22 # download and install Node.js (you may need to restart the terminal)
node -v # verifies the right Node.js version is in the environment
npm -v # verifies the right npm version is in the environment

echo "Base dependencies installed!"

# create virtual environment
echo "Creating virtual environment..."
sudo rm -rf drone-gui-venv # remove old virtual environment
python3 -m venv drone-gui-venv # create new virtual environment
source drone-gui-venv/bin/activate # activate virtual environment
echo "Virtual environment created!"

# pip3 installs
echo "Installing backend dependencies..."
pip3 install -r backend/requirements.txt # install backend dependencies using text file
#pip3 install PyYAML mavproxy --user
echo "Backend dependencies installed!"

# npm installs
echo "Installing frontend dependencies..."
cd ui # go to frontend directory
npm install # install frontend dependencies
cd .. # go back
echo "Frontend dependencies installed!"

