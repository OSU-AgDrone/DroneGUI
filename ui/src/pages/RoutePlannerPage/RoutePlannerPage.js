import './RoutePlannerPage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MapDrawShape from '../../components/DrawableMap/DrawableMap';
import { useState } from 'react';
import "../../App.css"

const RoutePlannerPage = () => {

    const [shape, setShape] = useState([])
    
    const makeRequest = () => {
        fetch('http://127.0.0.1:5000/fly-mission', { // if getting a CORS error, use 127.0.0.1 instead (localhost alias)
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
                    <h2>{t("Main Page")}</h2>
                        <Link className='regularButton' to='/'>
                            {t("back")}
                        </Link>
                </div>
            </div>
        </>
    );
}

export default RoutePlannerPage;
