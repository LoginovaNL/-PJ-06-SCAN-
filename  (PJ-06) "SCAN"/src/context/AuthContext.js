import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSuccessfulAuthorization, setIsSuccessfulAuthorization] = useState(false);

  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    const tokenExpire = localStorage.getItem('tokenExpire');
    const now = new Date();
    if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
      console.log("Token expired or not found.");
      setIsSuccessfulAuthorization(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpire');
    } else {
      setIsSuccessfulAuthorization(true);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isSuccessfulAuthorization, setIsSuccessfulAuthorization, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
