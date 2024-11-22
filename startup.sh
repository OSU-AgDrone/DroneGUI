#!/bin/bash

# Update repo
echo "Updating software..."
git pull

# start the React frontend 
echo "Starting frontend..."
cd ui
npm start

echo "Launching browser..."
#chromium-browser http://localhost:5000 --kiosk --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbars --start-maximized