#!/bin/bash
# start the backend in the virtual python environment created in setup.sh
echo "Starting backend..."
python -m flask run

# start the React frontend 
echo "Starting frontend..."
cd ui
npm start 

echo "Launching browser..."
chromium-browser -kiosk -private-window http://localhost:3000