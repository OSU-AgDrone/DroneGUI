# User Interface (UI) Developer Guide
## General Info
The UI for the Ag Drone Mission Planner app is built on (React)[https://react.dev/reference/react] and (Node.js)[https://nodejs.org/en], meaning `App.js` contains the main page for the site and is hosted using `npm`. All other pages and components can be found in `/src`. Prior to Fall 2024, this app was also build with Electron, making it a desktop application. For simplicity, our team decided to remove Electron and return to a pure web app, since ultimately the site will be hosted on a Raspberry Pi tablet anyways. However, there may be leftover artifacts such as files and dependencies that we missed during the deletion of Electron, so we encourage future teams to further clean up the repository. 

The components of this app, in `ui/src/components`, make up the various elements used in the site such as custom buttons, icons, and maps. The pages, in `ui/src/pages/`, each use JavaScript to create an HTML page which contains these components. Many pages have their own local CSS file, though much of the styling is controlled through the main `App.css`. Future teams might benefit from consolidating the CSS even more, since the scattered styling can overlap in confusing ways.

The main page is meant to be a comprehensive dashboard for the drone, displaying all important information that would be relevant to a user monitoring the autonomouos drone. It includes a battery gauge and a time since it last connected, which is important since the drone is expected to go out of range as it completes missions. Be aware that not all of these features are necessarily connected to the backend functionality yet and may include hardcoded examples as a proof-of-concept. 

The UI connects to a Python flask backend, in `/backend`, and does so through HTTP requests from the JavaScript pages and components. The `fetch` function is what enables this and is typically making `GET` or `POST` requests to the backend. For the app to be fully functional, both the UI and the backend must be running. If the backend isn't running or properly communicating with the UI, you will see the routes page will be empty. This is a good way to check that the backend is up and running. The backend will also log the `GET` and `POST` requests it receives in the terminal, so you should expect to see these when a route is saved or loaded, for example. 

## Running the UI
### Prerequisites
Node.js must be [installed](https://nodejs.org/en/download/package-manager) on the device which will host the web app. Note that the installation scripts for the Raspberry Pi tablet will do this automatically

### Steps
1. Open a terminal window and run `npm install` if this is the first time running the app. This will install all necessary dependencies and only needs to be done when dependencies are changed or a clean install is performed.
2. Run `npm start` to start the app. On success, you should see the localhost address of the site and `webpack compiled successfully`. 
3. Navigate to the site, which by default will be at `http://localhost:3000`

### Troubleshooting
- If the frontend and backend aren't communicating, be sure to check the console output using the developer tools in your browser. A CORS error may be fixed by restarting both apps and/or interchanging `localhost` for `127.0.0.1`, though these are sort of random successes we've had in these cases and not guaranteed fixes. The backend IS configured to support local cross-origin requests (since both the frontend and backend are hosted on the same device), so CORS errors generally indicate an issue with the backend. **Be sure the backend is started with the given instructions or it may not correctly configure CORS and will reject requests from the frontend**.

## TODOs

