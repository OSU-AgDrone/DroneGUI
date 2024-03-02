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
         <h1 className='title'>{t("routePlanner")} <img id="titleImg" src="https://img.icons8.com/pastel-glyph/64/route--v1.png"></img></h1>
            <div className='pageContainer'>
                <div className='mapContainer' >
                    <MapDrawShape callback={setShape}/>
                </div>
                <div className='button-container'>
                    <button onClick={makeRequest} className='routePlanningButton'>{t("saveMap")}</button>
                </div>
            </div>
        </>
    );
}

export default RoutePlannerPage;
