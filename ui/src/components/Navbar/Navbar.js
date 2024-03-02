import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';
import "../../renderer/App.css";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation();
    const [list, setOpen] = React.useState(false);
    const ref = useRef(null);

    const handleOpen = (e) => {
        console.log("== ref.current:", ref.current);
        if (!ref.current) {
            setOpen(false);
        }
        setOpen(!list);
    };

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
                        <Link to="/" id='home' onClick={handleOpen}>{t("home")}</Link>
                        <Link to="/settings" id='setting' onClick={handleOpen}>{t("settings")}</Link>
                        <Link to='/routes' id='routes' onClick={handleOpen}>{t("routePlanner")}</Link>
                        <Link to='/findDrone' id='findDrone' onClick={handleOpen}>{t("findDrone")}</Link>
                        <Link to='/savedMaps' id='savedMaps' onClick={handleOpen}>{t("savedMaps")}</Link>
                        <Link to='/tasks' id='tasks' onClick={handleOpen}>{t("Task List")}</Link>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};

export default Navbar;
