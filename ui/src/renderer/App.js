import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from '../pages/MainPage/MainPage';
import RoutePlannerPage from '../pages/RoutePlannerPage/RoutePlannerPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import FindDronePage from '../pages/FindDronePage/FindDronePage';
import SavedMapsPage from '../pages/SavedMapsPage/SavedMapsPage';
import TasksPage from '../pages/TasksPage/TasksPage';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import '../components/Navbar/Navbar.css';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

i18next.init({
  interpolation: { escapeValue: false }, 
  lng: localStorage.getItem("language"),
  resources: {
    en: {
      translation: require('../i18n/english/translation.json'),
    },
    th: {
      translation: require('../i18n/thai/translation.json'),
    }
  },
});

export default function App() {
 
  return (
    <Router>
      <I18nextProvider i18n={i18next}>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/routes" element={<RoutePlannerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/findDrone" element={<FindDronePage />} />
        <Route path="/savedMaps" element={<SavedMapsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
      <ToastContainer />
      </I18nextProvider>
    </Router>
  );
}
