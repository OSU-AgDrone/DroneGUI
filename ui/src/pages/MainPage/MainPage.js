import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BatteryGauge from 'react-battery-gauge';
import LiquidGauge from 'react-liquid-gauge'; 
import ButtonWithIcon from '../../components/MainPageButton/MainPageButton';
import '../../App.css';
import './MainPage.css';
import Ringer from '../../components/Ringer';
import getCoordsRequest from '../SavedMapsPage/SavedMapsPage';

const MainPage = (props) => {
  const { t } = useTranslation();
  const [fontSize, setFontSize] = useState(() => {
      return localStorage.getItem('fontSize') || 16;
  });
  const [route, setRoute] = useState(() => {
      return localStorage.getItem('selectedRoute') || 'None';
  });
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

  // setShape is used in RoutePlannerPage
  const [shape, setShape] = useState([])
  const startMissionRequest = () => {
      fetch('http://127.0.0.1:5000/fly-mission', { // if getting a CORS error, use 127.0.0.1 instead (localhost alias)
          method: 'post',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              "shape": shape
              })
      })
  }

  // Replace these values with Backend Info
  const [batteryLevel, setBatteryLevel] = useState(9); 
  const [tankLevel, setTankLevel] = useState(50); 

  return (
    <div id="mainPage">
      <div id="textAndBatteryContainerContainer">
        <div id="batteryContainer">
          <BatteryGauge
            className="battery"
            value={batteryLevel}
            size={200}
            orientation="vertical"
            customization={{
              batteryBody: { strokeColor: theme === 'light' ? 'black' : 'white' },
              batteryCap: { strokeColor: theme === 'light' ? 'black' : 'white' },
              readingText: { fontSize: fontSize },
            }}
          />
        </div>

        <div id="tankContainer">
          <LiquidGauge
            value={tankLevel}
            width={150}
            height={150}
            textSize={1}
            textOffsetX={0}
            textOffsetY={20}
            riseAnimation
            waveAnimation
            waveFrequency={2}
            waveAmplitude={3}
            circleStyle={{
              fill: '#047dba',
            }}
            waveTextStyle={{
              fill: '#fff',
              fontSize: '24px',
            }}
            waveColor="#4b9cd3"
          />
          <p className="gauge-label">Tank Level</p>
        </div>

        <div className="textContainer">
          <p id="droneStatus">{t("status")}: On Mission</p>
          <p id="currentRoute">{t("currentRoute")}: <span style={{ fontWeight: 'bold', color: '#047dba' }}>{route}</span></p>
          <p id="connectionStrength">{t("connectionStrength")}: 🟨 🟨 🟨</p>
          <p id="lastUpdated">{t("lastUpdated")}: 2 mins ago</p>
        </div>
      </div>

      <div className="buttonContainer">
        <Ringer />
        <ButtonWithIcon url="/routes" buttonIcon="https://img.icons8.com/pastel-glyph/64/route--v1.png" buttonText={t('routePlanner')} />
        <ButtonWithIcon url="/savedMaps" buttonIcon="https://img.icons8.com/64/map.png" buttonText={t('loadRoute')} onClick={getCoordsRequest()} />
        <ButtonWithIcon link_id="button-link-settings" div_id="button-div-settings" img_id="button-img-settings" url="/settings" buttonIcon="https://img.icons8.com/?size=100&id=2969&format=png&color=000000" alt="settings--v1" />

        <div className="missionButtons">
          <button className="regularButton button">{t("startMission")}</button>
          <button className="RedRegularButton button">{t("returnHome")}</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;