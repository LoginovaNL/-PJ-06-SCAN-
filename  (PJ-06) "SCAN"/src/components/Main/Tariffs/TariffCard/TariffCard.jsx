import React from 'react';
import './TariffCard.css';
import tariffs_green_checkbox_icon from "../../../../icons/tariffs_green_checkbox_icon.svg";

const TariffCard = ({
  name,
  description,
  icon,
  colorClass,
  activeColorClass,
  isActive,
  isSuccessfulAuthorization,
  textColorClass,
  price,
  oldPrice,
  installmentText,
  features,
  priceMarginClass
}) => {
  const isCurrentTariff = isActive && isSuccessfulAuthorization;

  return (
    <div className={`tariff-card ${isCurrentTariff ? activeColorClass : ''}`}>
      <div className={`tariff-colored-block ${colorClass}`}>
        <div className="tariff-name-block">
          <h3 style={{ color: `${textColorClass}` }}>{name}</h3>
          <p style={{ color: `${textColorClass}` }}>{description}</p>
        </div>
        <div className="tarif-icon-block">
          <img className="tariff-icon" src={icon} alt={`${name} icon`} />
        </div>
      </div>

      {isCurrentTariff ? (
         <div className="your-tariff-badge">Текущий тариф</div>
       ) : (
         <div className="your-tariff-badge" style={{ visibility: 'hidden' }}>Текущий тариф</div>
       )}

      <div className="tariff-card-text-block">
        <div className="tariff-price-block">
          <h3 className={`price ${priceMarginClass}`}>{price}</h3>
          {oldPrice && <p className="last-price-tag">{oldPrice}</p>}
        </div>
        <p className="installment-text">{installmentText}</p>
      </div>
      <div className="tariff-to-include">
        <p className="card-text-20px">В тариф входит:</p>
        {features.map((feature, index) => (
          <div key={index} className="tariff-to-include-lines">
            <img
              className="green-checkbox"
              src={tariffs_green_checkbox_icon}
              alt="checkbox"
            />
            <p className="card-text">{feature}</p>
          </div>
        ))}
        <div className='tariff-button-div'>
          {isCurrentTariff && isSuccessfulAuthorization ? (
            <button className="button-tariffs grey center" id="requestDataButton">
              Перейти в личный кабинет
            </button>
          ) : (
            <button className="button-tariffs center" id="requestDataButton">
              Подробнее
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TariffCard;