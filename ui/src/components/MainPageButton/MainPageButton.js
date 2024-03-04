import './MainPageButton.css';
import '../../renderer/App.css';
import { Link } from 'react-router-dom';

const ButtonWithIcon = (props) => {
    return (
        <Link id="home_link" to={props.url}>
            <div className="button">
                <img className="buttonIcon" width="48" height="48" src={props.buttonIcon} alt="Button Icon" />
                <p className="buttonText">{props.buttonText}</p>
            </div>
        </Link>
    );
};

export default ButtonWithIcon;
