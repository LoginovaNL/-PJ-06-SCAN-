import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import './Authorization.css';
import icon_lock from "../../icons/icon_lock.svg";
import icon_facebook from "../../icons/icon_facebook.svg";
import icon_google from "../../icons/icon_google.svg";
import icon_yandex from "../../icons/icon_yandex.svg";
import authorization_picture from "../../icons/authorization_picture.svg";

const Authorization = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { isSuccessfulAuthorization, setIsSuccessfulAuthorization } = useAuth(); 

  useEffect(() => {
    if (isSuccessfulAuthorization) {
      navigate('/');
    }
  }, [isSuccessfulAuthorization, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('tokenExpire', data.expire);
        setIsSuccessfulAuthorization(true);
        navigate('/');
      } else {
        throw new Error(data.message || 'Ошибка при входе');
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      setUsernameError(true);
      setPasswordError(true);
    }
  };

  const validateUsername = (input) => {
    setUsernameError(false);
  };

  const validatePassword = (input) => {
    setPasswordError(false);
  };

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    validateUsername(input);
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword(input);
  };

  return (
    <div className="content">
      <div className="left-content">
        <h1 className="h1-text">Для оформления подписки <br />на тариф, необходимо <br />авторизоваться.</h1>
        <img className="picture-desktop" src={authorization_picture} alt="People with key image" />
      </div>


      <div className="auth-block">
        <img className="icon-lock" src={icon_lock} alt="image" />
        <div className="auth-form">
          <div className="tabs">
            <div className="tab active">Войти</div>
            <div className="tab"><a className="inactive" href="#">Зарегистрироваться</a></div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input">
              <label htmlFor="username">Логин или номер телефона:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
                style={{ borderColor: usernameError ? 'red' : '' }}
              />
              {usernameError && <div className="form-error">Введите корректные данные</div>}
            </div>

            <div className="input">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password" 
                required
                style={{ borderColor: passwordError ? 'red' : '' }}
              />
              {passwordError && <div className="form-error">Введите правильный пароль</div>}
            </div>  

            <div className="auth-button-div">
              <button className="button auth-button" type="submit" disabled={!username || !password}>Войти</button>
            </div>  

            <a href="#" className="reset-password">Восстановить пароль</a>

          </form>

          <div className="auth-social-media">
            <p className="enter-with">Войти через:</p>
            <div className="social-buttons">
              <button><img src={icon_google} alt="Google" /></button>
              <button><img src={icon_facebook} alt="Facebook" /></button>
              <button><img src={icon_yandex} alt="Yandex" /></button>
            </div>
          </div>
        </div>
      </div>
      <img className="picture-mobile" src={authorization_picture} alt="People with key image" />
    </div>
  )
}

export default Authorization;
