#!/bin/bash
if ping -q -c 1 -W 1 8.8.8.8 >/dev/null; then
    git pull
fi

# start the backend
echo "Starting backend..."
source drone-gui-venv/bin/activate
cd backend
python3 app.py &
cd ..

# start the React frontend 
echo "Starting frontend..."
cd ui
npm start &
cd ..
sleep 5


echo "Launching browser..."
chromium-browser http://localhost:3000 --kiosk --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbars --start-maximized

killall node
killall python3

exit