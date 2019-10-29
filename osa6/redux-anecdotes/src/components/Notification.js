import React from 'react';

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  const store = props.store.getState();

  if (store.message !== null) {
    return <div style={style}>{store.message}</div>;
  }
  return null;
};

export default Notification;
