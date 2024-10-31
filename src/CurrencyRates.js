import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyRates = () => {
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = '4ab87f2bec0e44fcb84899395d71a447';

  useEffect(() => {
    const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

    const fetchRates = async () => {
        try {
          const url = `https://api.currencyfreaks.com/latest?apikey=${apiKey}&base=USD`;
          console.log('Fetching URL:', url);
      
          const response = await axios.get(url);
          console.log('API Response:', response.data);
      
          const exchangeRates = response.data.rates;
      
          if (exchangeRates) {
            const currencyData = currencies.map(currency => {
              const rate = exchangeRates[currency];
              if (rate) {
                return {
                  currency,
                  weBuy: (rate * 1.05).toFixed(4),
                  exchangeRate: rate.toFixed(4),
                  weSell: (rate * 0.95).toFixed(4),
                };
              } else {
                console.warn(`Rate not found for currency: ${currency}`);
                return null;
              }
            }).filter(Boolean);
      
            setRates(currencyData);
          } else {
            setError('No rates found');
          }
        } catch (error) {
          setError(`Error fetching currency rates: ${error.message}`);
          console.error("Error fetching currency rates", error);
        }
      };
      

    fetchRates();
  }, [apiKey]);

  return (
    <div>
      <h1>Currency Rates (1 USD)</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.length > 0 ? (
            rates.map((rate, index) => (
              <tr key={index}>
                <td>{rate.currency}</td>
                <td>{rate.weBuy}</td>
                <td>{rate.exchangeRate}</td>
                <td>{rate.weSell}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyRates;
