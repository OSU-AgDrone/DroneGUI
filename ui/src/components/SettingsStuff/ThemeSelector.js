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
                {t("Light")}
            </button>
            <button onClick={() => handleThemeChange('dark')}
                className={activeTheme === 'dark' ? 'active' : ''}>
                {t("Dark")}
            </button>
        </div>
    );
}

export default ThemeSelector;