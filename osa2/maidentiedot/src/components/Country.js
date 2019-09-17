import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country, filteredCountries, setFilter }) => {
  const [currentWeather, setCurrentWeather] = useState({});

  const handleClick = e => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const url = `http://api.weatherstack.com/current?access_key=020b636ffdb32ddb50cc7203b7239cea&query=${country.capital}`;
      axios.get(url).then(res => {
        setCurrentWeather(res.data.current);
      });
    }
  }, [filteredCountries.length, country.capital]);

  if (filteredCountries.length === 1) {
    return (
      <>
        <h2>{country.name}</h2>
        <p>
          Capital: {country.capital}
          <br />
          Population: {country.population}
        </p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt='Country flag' height='100' />
        <h3>Current weather in {country.capital}</h3>
        <p>
          Temperature: {currentWeather.temperature}&deg;C
          <br />
          Wind: {currentWeather.wind_speed}kph from {currentWeather.wind_dir}
          <br />
          <img src={currentWeather.weather_icons} alt='Weather icon' />
        </p>
      </>
    );
  }
  return (
    <div>
      {country.name}{' '}
      <button value={country.name} onClick={handleClick}>
        Show
      </button>
    </div>
  );
};

export default Country;
