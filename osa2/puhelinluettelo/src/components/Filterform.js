import React from 'react';

const Filterform = ({ handleFilterChange, filter }) => {
  return (
    <div>
      Filter by name: <input onChange={handleFilterChange} value={filter} />
    </div>
  );
};

export default Filterform;
