import React from 'react';

const Input = props => {
  const { reset, ...other } = props;
  return <input {...other} />;
};

export default Input;
