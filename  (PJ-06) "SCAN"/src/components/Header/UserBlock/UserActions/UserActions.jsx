import React, { useState, useEffect } from 'react';
import './UserActions.css';
import loading_icon from '../../../../icons/loading_icon.svg';

const UserActions = () => {
  const [data, setData] = useState({ usedCompanyCount: 0, companyLimit: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanyInfo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setData({
        usedCompanyCount: data.eventFiltersInfo.usedCompanyCount,
        companyLimit: data.eventFiltersInfo.companyLimit,
      });
    } catch (error) {
      console.error("Ошибка при получении информации о компаниях:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
    const intervalId = setInterval(fetchCompanyInfo, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="user-actions-rectangle">
      {isLoading ? (
        <img src={loading_icon} alt="Loading" className="loading-icon" />
      ) : (
        <div className="user-actions-data">
          <div className="action-item">Использовано компаний</div>
          <div className="number-item used-companies-number">{data.usedCompanyCount}</div>
          <div className="action-item">Лимит по компаниям</div>
          <div className="number-item limit-companies-number">{data.companyLimit}</div>
        </div>
      )}
    </div>
  );
};

export default UserActions;
