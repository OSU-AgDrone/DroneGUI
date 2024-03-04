import React from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const ThemeSelector = () => {
    const [t, i18n] = useTranslation();
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme);
            return storedTheme;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            return 'light';
        }
    });
    const [activeTheme, setActiveTheme] = useState(theme);
    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        setActiveTheme(newTheme);
    }
    
    return (
        <div>
            <h2>{t("theme")}:</h2>
            <button onClick={() => handleThemeChange('light')}
                className={activeTheme === 'light' ? 'active' : ''}>
                {t("brownLight")}
            </button>
            <button onClick={() => handleThemeChange('dark')}
                className={activeTheme === 'dark' ? 'active' : ''}>
                {t("blueDark")}
            </button>
            <button onClick={() => handleThemeChange('black')}
                className={activeTheme === 'black' ? 'active' : ''}>
                {t("blackDark")}
            </button>
            <button onClick={() => handleThemeChange('white')}
                className={activeTheme === 'white' ? 'active' : ''}>
                {t("whiteLight")}
            </button>
        </div>
    );
}

export default ThemeSelector;