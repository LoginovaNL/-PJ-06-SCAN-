import React from 'react';
import './Main.css';
import About from "./About/About";
import WhyUs from "./WhyUs/WhyUs";
import Tariffs from "./Tariffs/Tariffs";

const Main = ({ isSuccessfulAuthorization, userTariff }) => {
  return (
    <div className="main-content">
        <About isSuccessfulAuthorization={isSuccessfulAuthorization} />
        <WhyUs />
        <Tariffs isSuccessfulAuthorization={isSuccessfulAuthorization} userTariff={userTariff} />
    </div>
  )
}

export default Main