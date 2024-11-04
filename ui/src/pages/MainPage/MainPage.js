import ButtonWithIcon from '../../components/MainPageButton/MainPageButton';
import '../../App.css';
import './MainPage.css';
import Ringer from '../../components/Ringer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = (props) => {
  const { t } = useTranslation();
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

  return (
    <div>
      <br/>
      <br/>
      <div className="capacityIcons"></div>
      <div className="buttonContainer">
        <Ringer />
        <ButtonWithIcon url="/routes" buttonIcon="https://img.icons8.com/pastel-glyph/64/route--v1.png" buttonText={t('routePlanner')} />
        <ButtonWithIcon url="/savedMaps" buttonIcon="https://img.icons8.com/64/map.png" buttonText={t('savedMaps')} />
        <ButtonWithIcon link_id="button-link-settings" div_id="button-div-settings" img_id="button-img-settings" url="/settings" buttonIcon="https://img.icons8.com/?size=100&id=2969&format=png&color=000000" alt="settings--v1"  />
      </div>
    </div>
  );
};

export default MainPage;
