import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Genel/Signup';
import Login from './components/Genel/Login';
import Home from './components/Genel/Home';
import Profile from './components/Genel/Profile';
import SecondHandItems from './components/EsyaIlani/SecondHandItems';
import NotPaylasim from './components/DersNotu/NotPaylasim';
import NewAd from './components/EsyaIlani/NewAd';
import EvArkadasi from './components/EvArkadasi/EvArkadasi';
import Favorites from "./components/Genel/Favorites";
import ProductDetail from "./components/EsyaIlani/ProductDetail"; // Yeni detay bileşeni
import DersBul from "./components/DersIlani/DersBul";
import MyAds from "./components/EsyaIlani/MyAds"; // Yeni detay bileşeni

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dersilani2" element={<DersBul />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ikincielesya" element={<SecondHandItems />} />
        <Route path="/products/:id" element={<ProductDetail />} /> {/* Yeni rota */}
        <Route path="/notpaylasim" element={<NotPaylasim />} /> 
        <Route path="/new-ad" element={<NewAd/>} /> 
        <Route path="/evarkadasi" element={<EvArkadasi />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-ads" element={<MyAds />} />

      </Routes>
    </Router>
  );
}

export default App;
