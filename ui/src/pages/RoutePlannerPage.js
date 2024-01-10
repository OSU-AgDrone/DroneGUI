import ButtonWithIcon from '../components/MainPageButton';
import './RoutePlannerPage.css';
import { Link } from 'react-router-dom';

const RoutePlannerPage = (props) => {
    return (
        <>
            <h1 className='title'>Route Planning</h1>
            <div className='pageContainer'>
                <div className='mapContainer'>
                </div>
                <div className='button-container'>
                    <button style={{ background: 'linear-gradient(0deg, rgba(34, 204, 255, 0.20) 0%, rgba(34, 204, 255, 0.20) 100%), #D9D9D9' }} className='routePlanningButton'>Draw Border</button>
                    <button style={{ background: 'linear-gradient(0deg, rgba(255, 0, 0, 0.20) 0%, rgba(255, 0, 0, 0.20) 100%), #D9D9D9' }} className='routePlanningButton'>Draw Obstacle</button>
                    <button className='routePlanningButton'>Reset Map</button>
                    <button className='routePlanningButton'>Save</button>
                    <Link to="/">
                        <button className='routePlanningButton'>Back</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default RoutePlannerPage;
