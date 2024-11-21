import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';


const Ringer = () => {
    const [activeButton, setActiveButton] = useState(localStorage.getItem('activeButton') || '');

    const handleActiveChange = (buttonName) => {
        if (activeButton === buttonName) {
            localStorage.setItem('activeButton', '');
            setActiveButton('');
            return;
        }
        localStorage.setItem('activeButton', buttonName);
        setActiveButton(buttonName);
    };

    const { t } = useTranslation();

    return (
        <a> 
        <button
            onClick={() => handleActiveChange('ringer')}
            id={`${activeButton === "ringer" ? 'activeButton' : ''}`}
            className="button">
            <img className='buttonIcon' src="https://img.icons8.com/ios-filled/50/alarm" width="48" height="48" alt="Ringer" />
            {activeButton === "ringer" ? t("deactivateRinger") : t("activateRinger")}
        </button>
        </a>
    );
};

export default Ringer;