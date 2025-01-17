#!/bin/bash
echo "Script started!"

# check drone gui is up to date
(
    echo "# Checking for drone updates"
    git pull # check for updates
    echo "100"

) | zenity --progress --title="AgDrone" --text="Checking for updates..."  --auto-close --percentage=20

# Install dependencies
(
    echo "# Updating and installing base dependencies"
    sudo apt update -y # update things
    echo "20"

    echo "# Upgrading dependencies"
    sudo apt upgrade -y # upgrade things
    echo "40"

    echo "# Installing python and browser dependencies"
    sudo apt install python3 python3-pip git firefox -y # install python in case it's not installed
    echo "60"

    echo "# Adding user to dialout group"
    sudo usermod -a -G dialout $USER # add user to dialout group
    echo "80"

    echo "# Installing nodejs and npm"
    sudo apt-get install nodejs npm -y
    node -v # verifies the right Node.js version is in the environment
    npm -v # verifies the right npm version is in the environment
    echo "100"

) | zenity --progress --title="AgDrone" --text="Installing dependencies..." --auto-close --percentage=0

# create virtual environment
(
    echo "# Removing existing virtual environment"
    sudo rm -rf drone-gui-venv # remove old virtual environment
    echo "25"

    echo "# Creating new virtual environment"
    python3 -m venv drone-gui-venv # create new virtual environment
    echo "50"

    echo "# Activating virtual environment"
    source drone-gui-venv/bin/activate # activate virtual environment
    echo "75"

    echo "# Installing backend python dependencies"
    pip3 install -r backend/requirements.txt # install backend dependencies using text file
    echo "100"

) | zenity --progress --title="AgDrone" --text="Setting up backend..." --auto-close --percentage=0


# npm installs
(
    echo "# Installing frontend npm dependencies"
    cd ui # go to frontend directory
    npm install # install frontend dependencies
    cd .. # go back
    echo "100"

) | zenity --progress --title="AgDrone" --text="Setting up frontend..." --auto-close --percentage=0

echo "Script finished!"

zenity --info --title="AgDrone" --text="Done setting up AgDrone!"
