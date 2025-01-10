#!/bin/bash
echo "Script started!"

# Install dependencies
(
    sudo apt update -y ; wait # update things
    echo "20"
    sudo apt upgrade -y ; wait  # upgrade things
    echo "40"
    sudo apt install python3 python3-pip git firefox -y ; wait  # install python in case it's not installed
    echo "60"
    #sudo apt install python3 idle3 python3-pip git python3-dev python3-opencv python3-wxgtk4.0 python3-pip python3-matplotlib python3-lxml python3-pygame -y
    sudo usermod -a -G dialout $USER  ; wait # add user to dialout group
    echo "80"
    sudo apt-get install nodejs npm -y ; wait 
    node -v # verifies the right Node.js version is in the environment
    npm -v # verifies the right npm version is in the environment
    echo "100"
) | zenity --progress --title="AgDrone" --text="Installing base dependencies..." --auto-close --percentage=0

# create virtual environment
(
    sudo rm -rf drone-gui-venv  ; wait # remove old virtual environment
    echo "30"
    python3 -m venv drone-gui-venv  ; wait # create new virtual environment
    echo "60"
    source drone-gui-venv/bin/activate  ; wait # activate virtual environment
    echo "100"
) | zenity --progress --title="AgDrone" --text="Creating virtual environment..." --auto-close --percentage=0


# pip3 installs
(
    pip3 install -r backend/requirements.txt  ; wait # install backend dependencies using text file
    #pip3 install PyYAML mavproxy --user
    echo "100"
) | zenity --progress --title="AgDrone" --text="Installing backend dependencies..." --auto-close --percentage=0


# npm installs
(
    cd ui ; wait # go to frontend directory
    echo "30"
    npm install ; wait  # install frontend dependencies
    echo "900"
    cd ..  ; wait # go back
    echo "100"
) | zenity --progress --title="AgDrone" --text="Installing frontend dependencies..." --auto-close --percentage=0


# check drone gui is up to date
(
    git pull  ; wait # check for updates
    echo "100"
) | zenity --progress --title="AgDrone" --text="Checking for updates..."

zenity --info --title="AgDrone" --text="Done setting up AgDrone!"

echo "Script finished!"

