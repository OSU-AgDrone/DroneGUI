import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';
import "../../renderer/App.css";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    
    function handleUnsavedChanges(e) {
        if (document.documentElement.getAttribute('unsavedChanges') !== null){
            const confirmation = window.confirm(t("unsavedChanges") + " " + t("confirm_form"));
            if (!confirmation){
                e.preventDefault();
            }else{
                document.documentElement.removeAttribute('unsavedChanges');
            }
        }
    }

    return (
        <div className='navbar'>
            <div>
                <div className="dropdown">
                    <a
                        style={{
                            display: "block",
                            textAlign: "center",
                            position: "fixed",
                            top: "3px",
                            left: "3px",
                        }}
                        className='dropdown-menu'
                    >
                        <img 
                            style={{ display: "inline-block" }}
                            src="https://img.icons8.com/ios-filled/50/menu"
                            width="25"
                            height="25"
                            alt="Ringer"
                        />
                    </a>
                    <div className="dropdown-content">
                        <Link onClick={handleUnsavedChanges} to="/" id='home' >{t("home")}</Link>
                        <Link onClick={handleUnsavedChanges} to='/routes' id='routes' >{t("routePlanner")}</Link>
                        <Link onClick={handleUnsavedChanges} to='/savedMaps' id='savedMaps'>{t("savedMaps")}</Link>
                        <Link onClick={handleUnsavedChanges} to='/tasks' id='tasks' >{t("Task List")}</Link>
                        <Link onClick={handleUnsavedChanges} to='/findDrone' id='findDrone' >{t("findDrone")}</Link>
                        <Link onClick={handleUnsavedChanges} to='/settings' id='settings' >{t("settings")}</Link>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
};

export default Navbar;
