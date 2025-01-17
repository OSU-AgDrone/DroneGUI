import './SavedMapsPage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../App.css';


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

    coordinates.forEach((coord, index) => {
        const coordinateItem = document.createElement('div');
        coordinateItem.classList.add('coordinate-item');
        coordinateItem.setAttribute('tabindex', '0');
        coordinateItem.textContent = `${coord.name}`;
        coordinateItem.onclick = () => loadCoordinate(coord); // Handle selection
        coordinatesList.appendChild(coordinateItem);
    });
};

const loadCoordinate = (coord) => {
    console.log('Loaded coordinate:', coord.name);
    // TODO add logic to actually send this route to the map/drone, save on frontend somehow
    // TODO reflect this also in "Current Route" on homepage
    console.log(coord);
};

const SavedMapsPage = (props) => {
    // TODO apply translation to select a route text, select text, and all modal content 
    const { t } = useTranslation();

    return (
        <>
            <body onload={getCoordsRequest()}></body>
            <h1 className='title'>{t("savedMaps")}</h1>
            <div class="modal-content">
                <h2 id="modalHeader">Select a Route</h2> 
                <div id="coordinatesList"></div>
                <Link className='button' class="button routeButton" onClick={null/*TODO actually load*/}>Select</Link>
                <Link className='button' class=' button routeButton' to='/'>
                {t("back")}
                </Link>
            </div>
        </>
    );
}

export default SavedMapsPage;