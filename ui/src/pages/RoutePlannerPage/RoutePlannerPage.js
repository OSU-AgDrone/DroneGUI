import './RoutePlannerPage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RoutePlannerPage = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <h1 className='title'>{t("routePlanner")}</h1>
            <div className='pageContainer'>
                <div className='mapContainer'>
                </div>
                <div className='button-container'>
                    <button style={{ background: 'linear-gradient(0deg, rgba(34, 204, 255, 0.20) 0%, rgba(34, 204, 255, 0.20) 100%), #D9D9D9' }} className='routePlanningButton'>{t("drawBorder")}</button>
                    <button style={{ background: 'linear-gradient(0deg, rgba(255, 0, 0, 0.20) 0%, rgba(255, 0, 0, 0.20) 100%), #D9D9D9' }} className='routePlanningButton'>{t("drawObstacle")}</button>
                    <button className='routePlanningButton'>{t("resetMap")}</button>
                    <button className='routePlanningButton'>{t("saveMap")}</button>
                    <Link id="backButton" to="/">
                        <button className='routePlanningButton'>{t("back")}</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default RoutePlannerPage;
