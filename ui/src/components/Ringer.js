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
        <button
            onClick={() => handleActiveChange('ringer')}
            id={`${activeButton === "ringer" ? 'activeButton' : ''}`}
            className="button findDroneButton"
            style={{
                display: "flex",
                marginBottom: "2rem"
            }}
        >
            <img className='ringerButton' style={{ marginTop: "1px", paddingRight: "5px" }} src="https://img.icons8.com/ios-filled/50/alarm" width="24" height="24" alt="Ringer" />
            {activeButton === "ringer" ? t("deactivateRinger") : t("activateRinger")}
        </button>
    );
};

export default Ringer;