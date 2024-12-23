import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import SecondHandItems from './components/secondHandItem/SecondHandItems';
import CategoryItems from "./components/secondHandItem/CategoryItems";
import NotPaylasim from './components/lectureNotes/NotPaylasim';
import NewAd from './components/secondHandItem/NewAd';
import UniqueEvArkadasi from './components/houseMate/UniqueEvArkadasi';
import Favorites from "./components/secondHandItem/Favorites";
import ProductDetail from "./components/secondHandItem/ProductDetail";
import DersBul from "./components/courseAd/DersBul";
import MyAds from "./components/secondHandItem/MyAds";
import AddNote from "./components/lectureNotes/AddNote";
import MyNotes from "./components/lectureNotes/MyNotes";
import Survey from "./components/houseMate/Survey";
import Recommendations from "./components/houseMate/Recommendations";
import SurveyOptions from "./components/houseMate/SurveyOptions";
import NewRoommateAd from './components/houseMate/NewRoommateAd';
import EvIlaniDetayi from './components/houseMate/EvIlaniDetayi'; // Correct import
import NoteFavoritePage from './components/lectureNotes/NoteFavoritePage';

function App() {
  const currentUserId = localStorage.getItem("userId"); // or context-based
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
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/notpaylasim" element={<NotPaylasim />} />
        <Route path="/new-ad" element={<NewAd />} />
        <Route path="/uniqueEvArkadasi" element={<UniqueEvArkadasi />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-ads" element={<MyAds />} />
        <Route path="/AddNote" element={<AddNote />} />
        <Route path="/my-notes" element={<MyNotes />} />
        <Route path="/survey-options" element={<SurveyOptions />} />
        <Route path="/survey" element={<Survey userId={currentUserId} />} />
        <Route path="/recommendations" element={<Recommendations userId={currentUserId} />} />
        <Route path="/newroommatead" element={<NewRoommateAd />} />
        <Route path="/roommatead/:id" element={<EvIlaniDetayi />} /> {/* Correctly mapped */}
        <Route path='/note-favorite-page' element={<NoteFavoritePage/>}></Route>
        

      </Routes>
    </Router>
  );
}

export default App;
