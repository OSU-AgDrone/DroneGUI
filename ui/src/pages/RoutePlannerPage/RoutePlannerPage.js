import './RoutePlannerPage.css';
import { useTranslation } from 'react-i18next';
import MapDrawShape from '../../components/DrawableMap/DrawableMap';
import { useState } from 'react';
import "../../renderer/App.css"

const RoutePlannerPage = (props) => {

    const [shape, setShape] = useState([])
    
    const makeRequest = () => {
        fetch('localhost:5000/generate-mission-plan', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: {
                "shape": shape
               }
        })
    }

    const { t } = useTranslation();
    return (
        <>
            <div className='pageContainer'>
                <div className='mapContainer' >
                    <MapDrawShape callback={setShape}/>
                </div>
                <div className='button-container'>
                    <button className='routePlanningButton'>{t("editSaved")}</button>
                    <button className='routePlanningButton'>{t("resetMap")}</button>
                    <button onClick={makeRequest} className='routePlanningButton'>{t("saveMap")}</button>
                </div>
            </div>
        </>
    );
}

export default RoutePlannerPage;
