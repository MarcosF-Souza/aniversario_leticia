import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';
import Cartinhas from './components/Cartinhas';
import NossoMapa from './components/NossoMapa';
import Scrapbook from './components/Scrapbook';
import TrilhaSonora from './components/TrilhaSonora';
import LinhaDoTempo from './components/LinhaDoTempo';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cartas" element={<Cartinhas />} />
          <Route path="/mapa" element={<NossoMapa />} />
          <Route path="/scrapbook" element={<Scrapbook />} />
          <Route path="/trilha" element={<TrilhaSonora />} />
          <Route path="/linha-do-tempo" element={<LinhaDoTempo />} />
          <Route path="/futuro" element={<ComingSoon />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
