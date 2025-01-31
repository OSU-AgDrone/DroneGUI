import './SavedMapsPage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../App.css';

// store the selected route (will be sent to localStorage when submitted)
let route = null;

// save route to local storage, persisting across pages
function saveSelectedRoute() {
    localStorage.setItem('selectedRoute', route);
    console.log("saved")
}

export const getCoordsRequest = () => {
    fetch('http://127.0.0.1:5000/get-coords', {
        method: 'get',
        mode: 'cors',
        headers: {'Content-Type':'application/json'}
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        console.log(data)
        displayRoutes(data)
    }).catch(error => console.error('Error', error))
}

const displayRoutes = (coordinates) => {
    const coordinatesList = document.getElementById('coordinatesList');
    coordinatesList.innerHTML = ''; // Clear previous list

    // create html for each coord
    coordinates.forEach((coord, index) => {
        const coordinateItem = document.createElement('div');
        coordinateItem.classList.add('coordinate-item');
        coordinateItem.setAttribute('tabindex', '0');
        coordinateItem.textContent = `${coord.name}`;
        coordinatesList.appendChild(coordinateItem);
    });

    // add focus event listeners to know which is selected
    document.querySelectorAll('.coordinate-item').forEach(div => {
    div.addEventListener('focus', function () {
      route = this.textContent;
      console.log(`Focused Value: ${route}`);
    });
  });
};

const SavedMapsPage = (props) => {
    // TODO apply translation to select a route text, select text, and all modal content 
    const { t } = useTranslation();

    return (
        <>
            <body onload={getCoordsRequest()}></body>
            <h1 className='title'>{t("savedMaps")}</h1>
            <div className="modal-content">
                <h2 id="modalHeader">Select a Route</h2> 
                <div id="coordinatesList"></div>
                <div id="savedButtons">
                    <Link className='button routeButton' onClick={saveSelectedRoute}>Select</Link>
                    <Link className='button routeButton' to='/'>
                    {t("back")}
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SavedMapsPage;