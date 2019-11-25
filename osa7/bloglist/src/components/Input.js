import React from 'react';

import Form from 'react-bootstrap/Form';

const Input = props => {
  const { reset, ...other } = props;
  return <Form.Control type='text' {...other} />;
};

export default Input;
