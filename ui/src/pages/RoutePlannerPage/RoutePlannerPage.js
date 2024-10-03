import './RoutePlannerPage.css';
import { useTranslation } from 'react-i18next';
import MapDrawShape from '../../components/DrawableMap/DrawableMap';
import { useState } from 'react';
import "../../renderer/App.css"

const RoutePlannerPage = () => {

    const [shape, setShape] = useState([])
    
    const makeRequest = () => {
        fetch('http://localhost:5000/fly-mission', {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "shape": shape
               })
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
                    <button onClick={makeRequest} className='regularButton button'>{t("flyMission")}</button>
                </div>
            </div>
        </>
    );
}

export default RoutePlannerPage;
