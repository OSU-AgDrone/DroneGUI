import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './SettingsPage.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/SettingsStuff/LanguageSelector';
import ThemeSelector from '../../components/SettingsStuff/ThemeSelector';
import FontSizeSelector from '../../components/SettingsStuff/FontSizeSelector';

const SettingsPage = () => {
  const [t, i18n] = useTranslation();

  return (
    <div id="settingsPage">
      <h1>{t("settings")} <img id="titleImg" src="https://img.icons8.com/ios-filled/40/000000/settings--v1.png"></img></h1>
      <FontSizeSelector />
      <br />
      <hr />
      <ThemeSelector />
      <br />
      <br />
      <hr />
      <h2>{t("language")}:</h2>
      <LanguageSelector />
      <br />
      <hr />
      <br />
      <Link className='regularButton' to='/'>
        {t("back")}
      </Link>
    </div>
  );
};

export default SettingsPage;
