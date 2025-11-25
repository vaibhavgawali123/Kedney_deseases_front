import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PredictionPage from './pages/PredictionPage';
import NearbyHospitals from './pages/NearbyHospitals';
import Navbar from './components/Navbar';
import ResearchComparison from './pages/ResearchComparison';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/hospitals" element={<NearbyHospitals />} />
        <Route path="/admin" element={<ResearchComparison />} />
      </Routes>
    </Router>
  );
}

export default App;
// py -3.10 -m venv venv
// .\venv\Scripts\activate