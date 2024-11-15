#!/bin/bash
echo "Script started!"

# Install dependencies
echo "Installing base dependencies..."
sudo apt update -y
sudo apt install python3 python3-pip git -y
#sudo apt install python3 idle3 python3-pip git python3-dev python3-opencv python3-wxgtk4.0 python3-pip python3-matplotlib python3-lxml python3-pygame -y
sudo usermod -a -G dialout $USER
echo "Base dependencies installed!"

# create virtual environment
echo "Creating virtual environment..."
python3 -m venv drone-gui-venv
source drone-gui-venv/bin/activate
echo "Virtual environment created!"

# pip3 installs
echo "Installing backend dependencies..."
pip3 install -r backend/requirements.txt
#pip3 install PyYAML mavproxy --user
echo "Backend dependencies installed!"

# npm installs
echo "Installing frontend dependencies..."
cd ui
npm install
cd ..
echo "Frontend dependencies installed!"

