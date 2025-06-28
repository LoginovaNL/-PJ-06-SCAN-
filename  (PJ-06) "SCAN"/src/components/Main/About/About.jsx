import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';
import about_picture from "../../../icons/about_picture.svg"

const About = ({ isSuccessfulAuthorization }) => {
  const navigate = useNavigate();

  const handleRequestDataClick = () => {
    if (isSuccessfulAuthorization) {
      navigate('/search');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="about-block">
      <div className="about-info-block">
        <h1 className="about-h1-box">Сервис по поиску<br />публикаций <br />о компании<br />по его ИНН</h1>
        <p className="about-p-box">Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
        {isSuccessfulAuthorization && <button 
          className="button" 
          id="requestDataButton" 
          onClick={handleRequestDataClick}>
          Запросить данные
          </button>
        }
      </div>
      <img className="about-image" src={about_picture} alt="image" />
    </div>
  )
}

export default About