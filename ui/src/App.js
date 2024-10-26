import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar/Navbar';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import MainPage from './pages/MainPage/MainPage';
import RoutePlannerPage from './pages/RoutePlannerPage/RoutePlannerPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import FindDronePage from './pages/FindDronePage/FindDronePage';
import SavedMapsPage from './pages/SavedMapsPage/SavedMapsPage';
import TodoList from './pages/TasksPage/TasksPage';
import AlertDialog from './components/AlertDialog';

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("language") ? localStorage.getItem("language") : 'en',
  resources: {
    en: {
      translation: require('./i18n/english/translation.json'),
    },
    th: {
      translation: require('./i18n/thai/translation.json'),
    }
  },
});

export default function App() {
  const [popUp, setPopUp] = useState(false);

  const handleCancel = () => {
    setPopUp(false);
  };

  const handleOk = () => {
    setPopUp(false);
    document.documentElement.removeAttribute('unsavedChanges');
    if(document.documentElement.getAttribute('modalChange')){
      document.getElementById('modal-root').click();
      document.documentElement.removeAttribute('modalChange');
    } 
    if(document.documentElement.getAttribute('navChange')) {
      document.getElementById(document.documentElement.getAttribute('navChange')).click();
      document.documentElement.removeAttribute('navChange');
    }
  };

  return (
    <Router>
      <I18nextProvider i18n={i18next}>
        <Navbar  setPopUp={setPopUp} popUp={popUp}/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/routes" element={<RoutePlannerPage/>} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/findDrone" element={<FindDronePage />} />
          <Route path="/savedMaps" element={<SavedMapsPage />} />
          <Route path="/tasks" element={<TodoList setPopUp={setPopUp}/>} />
        </Routes>
        <ToastContainer />
        <AlertDialog popUp={popUp} handleCancel={handleCancel} handleOk={handleOk} />
      </I18nextProvider>
    </Router>
  );
}
