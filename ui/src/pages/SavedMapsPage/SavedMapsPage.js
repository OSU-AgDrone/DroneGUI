import './SavedMapsPage.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../renderer/App.css';
import BatteryGauge from 'react-battery-gauge'

const SavedMapsPage = (props) => {
    const { t } = useTranslation();
    const baseCustomization = {
          batteryMeter: {
            outerGap: 0,
            gradFill: [
              { color: 'red', offset: 0 },
              { color: 'orange', offset: 15 },
              { color: 'green', offset: 90 },
            ],
          },
          readingText: {
            lightContrastColor: 'black',
            darkContrastColor: 'white',
            lowBatteryColor: 'red',
          },
    }
    
    const applyThemeCustomization = () => {
        const theme = document.documentElement.getAttribute('data-theme');

        let themeCustomization = {};
        if(theme === 'dark' || theme === 'black'){
            themeCustomization = {
            batteryBody: {
                fill: 'white',
                strokeColor:  'white',
                strokeWidth: 2,
            },
                batteryCap: {
                    fill: 'white',
                    strokeColor: 'white',
                    cornerRadius: 3,
                    strokeWidth: 0,
                    capToBodyRatio: 0.4,
                },
            };
        }else if(theme === 'light' || theme === 'white'){
            themeCustomization = {
                batteryBody: {
                    fill: 'black',
                    strokeColor: 'black',
                    strokeWidth: 2,
                  },
                  batteryCap: {
                    fill: 'black',
                    strokeColor: 'black',
                    cornerRadius: 3,
                    strokeWidth: 0,
                    capToBodyRatio: 0.4,
                  },
            };
        }
        return { ...baseCustomization, ...themeCustomization };
      };
      const customization = applyThemeCustomization();

    return (
        <>
            <h1 className='title'>{t("savedMaps")} <img id="titleImg" src="https://img.icons8.com/45/map.png"></img></h1>
            <div className='pageContainer'>
            <BatteryGauge value={9} size={200} orientation="vertical" customization={customization} />  {/*change battery value to get battery from drone */}
                <div className='button-container'>
                    <button className='button findDroneButton' style={{ "marginTop": "3rem" }}>
                        {t("loadMap")}
                    </button>
                    <h2>{t("droneCommands")}</h2>

                    <button className='button findDroneButton' >
                        {t("takeOff")}
                        <img style={{marginLeft:".5rem"}} width="35" height="35" src="https://img.icons8.com/ios/50/airplane-take-off.png" alt="airplane-take-off"/>
                    </button>
                    <button className='button findDroneButton' >
                        {t("land")}
                        <img style={{marginLeft:".5rem"}} width="35" height="35" src="https://img.icons8.com/ios/50/airplane-landing.png" alt="airplane-landing"/>
                    </button>
                </div>
            </div>
            
            <div style={{ bottom: "0", fontSize:"xx-small",marginBottom:"0rem", padding:"0" }}>
                <a  style={{ bottom: "0", position: "absolute", marginBottom:"0rem", padding:"0"}} href="https://icons8.com/icon/12662/airplane-landing">Airplane Landing</a>
                <a style={{ bottom: "0",  left: "4.5rem", position: "absolute", marginBottom:"0rem", padding:"0"}} href="https://icons8.com/icon/2487/airplane-take-off" target="_blank" rel="noopener noreferrer">Airplane Take Off</a>
                <p style={{ bottom: "0", left: "9rem", position: "absolute", marginBottom:"0rem", padding:"0" }} > icon by</p>
                <a style={{ bottom: "0", left: "11rem", position: "absolute", marginBottom:"0", padding:"0"}} href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>
            </div>
        </>
    );
}

export default SavedMapsPage;
