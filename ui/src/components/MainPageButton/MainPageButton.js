import './MainPageButton.css';
import '../../App.css';
import { Link } from 'react-router-dom';

const ButtonWithIcon = (props) => {
    return (
        <Link id={props.link_id} to={props.url}>
            <div id={props.div_id} className="button">
                <img id={props.img_id} className="buttonIcon" width="48" height="48" src={props.buttonIcon} alt="Button Icon" />
                <p className="buttonText">{props.buttonText}</p>
            </div>
        </Link>
    );
};

export default ButtonWithIcon;