import './findDronePage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Ringer from '../../components/Ringer';
import '../../renderer/App.css';

const FindDronePage = (props) => {
    const { t } = useTranslation();

    return (
        <>
            <h1 className='title'>{t("findDrone")} <img id="titleImg" src="https://img.icons8.com/ios-filled/45/map-marker--v1.png"></img></h1>
            <div className='pageContainer'>
                <div className='button-container'>
                    <Ringer />
                    <Link id="backButton" to="/">
                        <button className='button findDroneButton' style={{ "marginTop": "8rem" }}>
                            {t("back")}
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default FindDronePage;
