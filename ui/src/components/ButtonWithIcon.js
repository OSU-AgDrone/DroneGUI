import './ButtonWithIcon.css'

const ButtonWithIcon = (props) => {
    return (
        <div className="button">
            <img className="buttonIcon" width="48" height="48" src={props.buttonIcon} alt="Button Icon"/>
            <p className="buttonText">{props.buttonText}</p>
        </div>
    )
}

export default ButtonWithIcon