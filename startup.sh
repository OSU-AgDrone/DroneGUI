#!/bin/bash

# Update repo
echo "Updating software..."
git pull

# start the React frontend 
echo "Starting frontend..."
cd ui
gnome-terminal -- /bin/sh -c "npm start"
cd ..

echo "Launching browser..."
#firefox -kiosk -private-window http://localhost:3000