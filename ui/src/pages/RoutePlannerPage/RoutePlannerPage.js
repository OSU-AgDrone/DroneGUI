import './RoutePlannerPage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MapDrawShape from '../../components/DrawableMap/DrawableMap';
import { useState } from 'react';
import MainPage from '../MainPage/MainPage'
import "../../App.css"

const RoutePlannerPage = () => {

    // moving the following to Main Page, but leaving until we can test it
    // const [shape, setShape] = useState([])
    
    // const makeRequest = () => {
    //     fetch('http://127.0.0.1:5000/fly-mission', { // if getting a CORS error, use 127.0.0.1 instead (localhost alias)
    //         method: 'post',
    //         mode: 'cors',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //             "shape": shape
    //            })
    //     })
    // }

    const { t } = useTranslation();
    return (
        <>
         <h1 className='title'>{t("routePlanner")}</h1>
            <div className='pageContainer'>
                <div className='mapContainer' >
                    <MapDrawShape callback={MainPage.setShape}/> 
                </div>
                <div className='button-container'>
                        <Link className='regularButton' id='backButton' to='/'>
                            {t("back")}
                        </Link>
                </div>
            </div>
        </>
    );
}

export default RoutePlannerPage;
