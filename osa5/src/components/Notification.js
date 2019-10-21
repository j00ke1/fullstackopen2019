import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, messageStyle }) => {
  if (message === null) {
    return null;
  }

  return <div style={messageStyle}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  messageStyle: PropTypes.object.isRequired
};

export default Notification;
