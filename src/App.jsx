import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cartas" element={<ComingSoon />} />
          <Route path="/mapa" element={<ComingSoon />} />
          <Route path="/scrapbook" element={<ComingSoon />} />
          <Route path="/trilha" element={<ComingSoon />} />
          <Route path="/linha-do-tempo" element={<ComingSoon />} />
          <Route path="/futuro" element={<ComingSoon />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
