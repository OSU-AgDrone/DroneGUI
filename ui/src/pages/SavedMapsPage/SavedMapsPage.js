import './SavedMapsPage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../App.css';

const SavedMapsPage = (props) => {
    const { t } = useTranslation();

    const getCoordsRequest = () => {
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
            coordinateItem.textContent = `${coord.name}`;
            coordinateItem.onclick = () => loadCoordinate(coord); // Handle selection
            coordinatesList.appendChild(coordinateItem);
        });
    
        // show the modal
        document.getElementById('coordinateModal').style.display = 'block';
    };

    const closeModal = () => {
        document.getElementById('coordinateModal').style.display = 'none';
    };

    const loadCoordinate = (coord) => {
        console.log('Loaded coordinate:', coord.name);
        // TODO add logic to actually send this route to the map/drone, save on frontend somehow
        // TODO reflect this also in "Current Route" on homepage
        console.log(coord);
        // close the modal after selection
        closeModal();
    };

    return (
        <>
            <h1 className='title'>{t("savedMaps")}</h1>
            <div className='pageContainer'>
                <div className='button-container'>
                    <button className='button findDroneButton' style={{ "marginTop": "3rem" }} onClick={getCoordsRequest}>
                        {t("loadMap")}
                    </button>
                    <Link className='regularButton' to='/'>
                        {t("back")}
                    </Link>
                </div>
            </div>

            {/* <!-- Modal for showing coords/routes --> */}
            <div id="coordinateModal" class="modal">
            <div class="modal-content">
                <h2 id="modalHeader">Select a Route</h2>
                <div id="coordinatesList"></div>
                <button onClick={closeModal}>Close</button>
            </div>
            </div>
            
            <div style={{ bottom: "0", fontSize:"xx-small",marginBottom:"0rem", padding:"0" }}>
                <a  style={{ bottom: "0", position: "absolute", marginBottom:"0rem", padding:"0"}} href="https://icons8.com/icon/12662/airplane-landing">Airplane Landing</a>
                <a style={{ bottom: "0",  left: "4.5rem", position: "absolute", marginBottom:"0rem", padding:"0"}} href="https://icons8.com/icon/2487/airplane-take-off" target="_blank" rel="noopener noreferrer">Airplane Take Off</a>
                <p style={{ bottom: "0", left: "9rem", position: "absolute", marginBottom:"0rem", padding:"0" }} > icon by</p>
                <a style={{ bottom: "0", left: "11rem", position: "absolute", marginBottom:"0", padding:"0"}} href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>
            </div>
        </>
    );
}

export default SavedMapsPage;
