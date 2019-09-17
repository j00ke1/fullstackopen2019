import React from 'react';

const Searchform = ({ handleFilterChange, filter }) => {
  return (
    <div>
      <h3>Find countries</h3>
      <input type='text' onChange={handleFilterChange} value={filter} />
    </div>
  );
};

export default Searchform;
