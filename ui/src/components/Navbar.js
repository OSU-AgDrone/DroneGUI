import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';
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

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        setActiveTheme(newTheme);
    };

    return (
        <div id='navbar'>
            <div>
                <button onClick={handleOpen}>{t("menu")}</button>
            </div>
            <br/><br/>
            <div>
                {list ? (
                    <div ref={ref}>
                        <Link to="/" id='home' onClick={handleOpen}>{t("home")}</Link>
                        <Link to="/settings" id='setting' onClick={handleOpen}>{t("settings")}</Link>
                        <Link to='/routes' id='routes' onClick={handleOpen}>{t("routePlanner")}</Link>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;
