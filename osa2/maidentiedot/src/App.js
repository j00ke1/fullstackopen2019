import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Searchform from './components/Searchform';
import Countrylist from './components/Countrylist';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res => {
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, countries]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <Searchform handleFilterChange={handleFilterChange} filter={filter} />
      <Countrylist
        countries={countries}
        filter={filter}
        filteredCountries={filteredCountries}
        setFilter={setFilter}
      />
    </div>
  );
};

export default App;
