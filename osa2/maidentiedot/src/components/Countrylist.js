import React from 'react';
import Country from './Country';

const Countrylist = ({ countries, filter, filteredCountries, setFilter }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return filteredCountries.map(country => (
    <Country
      key={country.name}
      country={country}
      filteredCountries={filteredCountries}
      setFilter={setFilter}
    />
  ));
};

export default Countrylist;
