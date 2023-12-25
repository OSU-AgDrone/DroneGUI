import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from '../pages/MainPage';
import RoutePlannerPage from '../pages/RoutePlannerPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/routes" element={<RoutePlannerPage/>}/>
      </Routes>
    </Router>
  );
}
