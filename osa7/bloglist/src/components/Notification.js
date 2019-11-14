import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Notification = props => {
  if (props.message === null) {
    return null;
  }
  return <div style={props.messageStyle}>{props.message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  messageStyle: PropTypes.object
};

const mapStateToProps = state => {
  return {
    message: state.notification.messageText,
    messageStyle: state.notification.messageStyle
  };
};

export default connect(mapStateToProps)(Notification);
