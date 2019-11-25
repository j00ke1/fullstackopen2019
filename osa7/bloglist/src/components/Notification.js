import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

const Notification = props => {
  if (props.message === null) {
    return null;
  }
  return <Alert variant={props.alertVariant}>{props.message}</Alert>;
};

Notification.propTypes = {
  message: PropTypes.string,
  messageStyle: PropTypes.object
};

const mapStateToProps = state => {
  return {
    message: state.notification.messageText,
    alertVariant: state.notification.alertVariant
  };
};

export default connect(mapStateToProps)(Notification);
