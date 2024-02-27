import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SettingsPage.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeSelector from '../../components/ThemeSelector';
import FontSizeSelector from '../../components/FontSizeSelector';

const SettingsPage = () => {
  const [t, i18n] = useTranslation();

  return (
    <div id="settingsPage">
      <h1>{t("settings")}</h1>
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
