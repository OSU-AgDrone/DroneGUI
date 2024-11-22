#!/bin/bash
# start the backend in the virtual python environment created in setup.sh
echo "Starting backend..."
python -m flask run

# start the React frontend 
echo "Starting frontend..."
cd ui
npm start 

echo "Launching browser..."
chromium-browser --window-size=800,480 --start-fullscreen --app=http://localhost:3000