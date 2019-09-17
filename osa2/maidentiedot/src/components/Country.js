import React from 'react';

const Country = ({ country, filteredCountries }) => {
  if (filteredCountries.length === 1) {
    // country.languages.map(language => language.name)

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
        <img src={country.flag} alt='none' height='100' />
      </>
    );
  }
  return <div>{country.name}</div>;
};

export default Country;
