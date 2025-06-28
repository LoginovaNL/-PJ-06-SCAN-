import React, { useState, useEffect } from 'react';

const CompanyINN = ({ companyINN, setCompanyINN }) => {
  const [error, setError] = useState('');

  const validateInn = (inn) => {
    let errorObj = { code: 0, message: '' };
    let result = false;

    if (typeof inn === 'number') {
      inn = inn.toString();
    } else if (typeof inn !== 'string') {
      inn = '';
    }

    if (!inn.length) {
      errorObj.code = 1;
      errorObj.message = 'Обязательное поле';
    } else if (/[^0-9]/.test(inn)) {
      errorObj.code = 2;
      errorObj.message = 'Введите корректные данные';
    } else if (inn.length !== 10) { 
      errorObj.code = 3;
      errorObj.message = 'Введите корректные данные';
    } else {
      const checkDigit = (inn, coefficients) => {
        let n = 0;
        for (let i = 0; i < coefficients.length; i++) {
          n += coefficients[i] * inn[i];
        }
        return parseInt(n % 11 % 10, 10);
      };

      const n10Coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8];
      const checkDigitResult = checkDigit(inn, n10Coefficients);
      
      if (checkDigitResult === parseInt(inn[9], 10)) {
        result = true;
      }

      if (!result) {
        errorObj.code = 4;
        errorObj.message = 'Введите корректные данные';
      }
    }

    setError(errorObj.message);
    return result;
  };

  useEffect(() => {
    validateInn(companyINN);
  }, [companyINN]);

  return (
    <div className="form-field form-field-inputs">
      <label htmlFor="companyINN">
        ИНН компании <span className={error ? "required-asterisk error" : "required-asterisk"}>*</span>
      </label>
      <input
        type="text"
        id="companyINN"
        name="companyINN"
        className={error ? 'input-error' : ''}
        value={companyINN}
        onChange={(e) => setCompanyINN(e.target.value)}
        onBlur={() => validateInn(companyINN)}
        placeholder="10 цифр"
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CompanyINN;
