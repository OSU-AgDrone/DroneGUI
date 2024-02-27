import ButtonWithIcon from '../../components/MainPageButton';
import './MainPage.css';
import '../../renderer/App.css';
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
      <div className="capacityIcons"></div>
      <div className="buttonContainer">
        <ButtonWithIcon url="/routes" buttonIcon="https://img.icons8.com/pastel-glyph/64/route--v1.png" buttonText={t('routePlanner')} />
        <ButtonWithIcon buttonIcon="https://img.icons8.com/ios-filled/50/camera" alt="circled-play" buttonText={t('cameraFeed')} />
        <ButtonWithIcon buttonIcon="https://img.icons8.com/ios-filled/100/calendar--v1.png" buttonText={t('calendar')}  />
        <ButtonWithIcon url="/findDrone" buttonIcon="https://img.icons8.com/ios-filled/100/map-marker--v1.png" alt="map-marker--v1" buttonText={t('findDrone')}  />
        <ButtonWithIcon url="/settings" buttonIcon="https://img.icons8.com/ios-filled/100/000000/settings--v1.png" alt="settings--v1" buttonText={t('settings')}  />
      </div>
    </div>
  );
};

export default MainPage;