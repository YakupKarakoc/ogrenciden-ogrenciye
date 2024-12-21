import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import SecondHandItems from './components/SecondHandItems';
import CategoryItems from "./components/CategoryItems";
import NotPaylasim from './components/NotPaylasim';
import NewAd from './components/NewAd';
import UniqueEvArkadasi from './components/UniqueEvArkadasi';
import Favorites from "./components/Favorites";
import ProductDetail from "./components/ProductDetail"; // Yeni detay bileşeni
import DersBul from "./components/DersBul";
import MyAds from "./components/MyAds"; // Yeni detay bileşeni
import AddNote from "./components/AddNote";
import MyNotes from "./components/MyNotes";
import Survey from "./components/Survey";
import Recommendations from "./components/Recommendations";
import SurveyOptions from "./components/SurveyOptions";

function App() {

  const currentUserId = localStorage.getItem("userId"); // veya context'ten alınabilir
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
        <Route path="/category/:category" element={<CategoryItems />} />
        <Route path="/category/:category/:subCategory" element={<CategoryItems />} />
        <Route path="/products/:id" element={<ProductDetail />} /> {/* Yeni rota */}
        <Route path="/notpaylasim" element={<NotPaylasim />} /> 
        <Route path="/new-ad" element={<NewAd/>} /> 
        <Route path="/uniqueEvArkadasi" element={<UniqueEvArkadasi />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-ads" element={<MyAds />} />
        <Route path="/AddNote" element={<AddNote />} />
        <Route path="/mynotes" element={<MyNotes />} /> 
        <Route path="/survey-options" element={<SurveyOptions />} /> 
        <Route path="/survey" element={<Survey userId={currentUserId} />} />
        <Route path="/recommendations" element={<Recommendations userId={currentUserId} />} />

      </Routes>
    </Router>
  );
}

export default App;
