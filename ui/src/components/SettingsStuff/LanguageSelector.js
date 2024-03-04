import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LanguageSelector = () => {
    const [language, setLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            document.documentElement.setAttribute('lang', storedLanguage);
            return storedLanguage;
        } else {
            return 'en';
        }
    });

    const [activeLanguage, setActiveLanguage] = useState(language);
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        setLanguage(lng);
        localStorage.setItem('language', lng);
        document.documentElement.setAttribute('lang', lng);
        setActiveLanguage(lng);
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <button className={activeLanguage === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>English</button>
            <button className={activeLanguage === 'th' ? 'active' : ''} onClick={() => changeLanguage('th')}>ไทย</button>
        </div>
    );
};

export default LanguageSelector;
