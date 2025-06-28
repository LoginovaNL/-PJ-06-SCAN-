import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';
import './fonts/ferry.otf';
import './fonts/InterRegular.ttf';
import './fonts/InterMedium.ttf';
import './fonts/InterBold.ttf';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Authorization from './components/Authorization/Authorization';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import user_pic_example from './icons/user_pic_example.png';

function App() {
  const { isSuccessfulAuthorization, checkAuthStatus } = useAuth();
  const [userTariff, setUserTariff] = useState('beginner');
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState(user_pic_example);
  
  useEffect(() => {
    if (!isSuccessfulAuthorization) {
        console.log("Пользователь не залогинен, обновите UI");
      }
  }, [isSuccessfulAuthorization]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <Router>
      <div className="app-container">
        <Header isSuccessfulAuthorization={isSuccessfulAuthorization} userName={userName} setUserName={setUserName} userPicture={userPicture} setUserPicture={setUserPicture} />
        <Routes>
          <Route path="/" element={<Main isSuccessfulAuthorization={isSuccessfulAuthorization} userTariff={userTariff} />} /> 
          <Route path="/auth" element={<Authorization />} />
          <Route path="/search" element={isSuccessfulAuthorization ? <Search /> : <Authorization redirectBack="/search" />} />
          <Route path="/results" element={isSuccessfulAuthorization ? <SearchResults /> : <Authorization redirectBack="/results" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

