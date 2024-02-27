import './RoutePlannerPage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MapDrawShape from '../../components/DrawableMap';

const RoutePlannerPage = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <div className='pageContainer'>
                <div className='mapContainer'>
                    <MapDrawShape/>
                </div>
                <div className='button-container'>
                    <button className='routePlanningButton'>{t("drawBorder")}</button>
                    <button className='routePlanningButton'>{t("resetMap")}</button>
                    <button className='routePlanningButton'>{t("saveMap")}</button>
                </div>
            </div>
        </>
    );
}

export default RoutePlannerPage;
