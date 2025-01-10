import ButtonWithIcon from '../../components/MainPageButton/MainPageButton';
import '../../App.css';
import './MainPage.css';
import Ringer from '../../components/Ringer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BatteryGauge from 'react-battery-gauge'


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

  return (
    <div id="mainPage">
      <br/>
      <br/>
      <div id="textAndBatteryContainerContainer">
      <div id="batteryContainer">
      <BatteryGauge 
          className="battery" 
          value={9 /* TODO update to get battery level from drone */} 
          size={200} 
          orientation="vertical"
          customization={{
            batteryBody: {
              strokeColor: theme == "light" ? "black" : "white"
            },
          batteryCap: {
            strokeColor: theme == "light" ? "black" : "white"
          }}}
          />
      </div>
      <div className="textContainer">
      <p id="droneStatus">{t("status")}: On Mission</p> { /*TODO update this to reflect actual data*/ }
      <p id="currentRoute">{t("currentRoute")}: None</p> { /*TODO update this to reflect actual data*/ }
      <p id="connectionStrength">{t("connectionStrength")}: 🟨 🟨 🟨</p> { /*TODO update this to reflect actual data*/ }
      <p id="lastUpdated">{t("lastUpdated")}: 2 mins ago</p> { /*TODO update this to reflect actual data*/ }
      </div>
      </div>
      <div className="buttonContainer">
        <Ringer />
        <ButtonWithIcon url="/routes" buttonIcon="https://img.icons8.com/pastel-glyph/64/route--v1.png" buttonText={t('routePlanner')} />
        <ButtonWithIcon url="/savedMaps" buttonIcon="https://img.icons8.com/64/map.png" buttonText={t('loadRoute')} />
        <ButtonWithIcon link_id="button-link-settings" div_id="button-div-settings" img_id="button-img-settings" url="/settings" buttonIcon="https://img.icons8.com/?size=100&id=2969&format=png&color=000000" alt="settings--v1"  />
        <div className="missionButtons">
          <button className="regularButton button" onClick={startMissionRequest}>{t("startMission")}</button>
          <button className="RedRegularButton button">{t("returnHome")}</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
