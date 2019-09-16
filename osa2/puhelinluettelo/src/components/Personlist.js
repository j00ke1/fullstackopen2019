import React from 'react';

const Personlist = ({ phoneBookRows }) => {
  return (
    <div>
      <h3>Numbers</h3>
      <div>{phoneBookRows()}</div>
    </div>
  );
};

export default Personlist;
