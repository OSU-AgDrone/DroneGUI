import ButtonWithIcon from '../components/MainPageButton'
import './MainPage.css'

const MainPage = (props) => {
    return (
        <div>
            <div className="capacityIcons">
            </div>
            <div className='buttonContainer'>
            <ButtonWithIcon url="/routes" buttonIcon="https://img.icons8.com/pastel-glyph/64/route--v1.png" buttonText="Route Planner"/>
            <ButtonWithIcon buttonIcon="https://img.icons8.com/ios-filled/50/circled-play.png" alt="circled-play" buttonText="Camera Feed"/>
            <ButtonWithIcon buttonIcon="https://img.icons8.com/ios-filled/100/calendar--v1.png" buttonText="Calendar"/>
            <ButtonWithIcon buttonIcon="https://img.icons8.com/ios-filled/100/map-marker--v1.png" alt="map-marker--v1" buttonText="Find Drone"/>
            </div>
        </div>
    )
}

export default MainPage