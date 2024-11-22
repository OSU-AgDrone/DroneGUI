#!/bin/bash

# Update repo
echo "Updating software..."
git pull

# start the React frontend 
echo "Starting frontend..."
cd ui
npm start 

echo "Launching browser..."
firefox -kiosk -private-windowhttp://localhost:3000