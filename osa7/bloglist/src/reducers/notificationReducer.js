const initialState = {
  messageText: null,
  alertVariant: ''
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_MESSAGE':
      return {
        messageText: payload.message,
        alertVariant: payload.style
      };
    case 'REMOVE_MESSAGE':
      return initialState;
    default:
      return {
        messageText: state.messageText,
        alertVariant: state.alertVariant
      };
  }
};

export const setMessage = payload => ({
  type: 'SET_MESSAGE',
  payload
});

export const removeMessage = () => ({
  type: 'REMOVE_MESSAGE'
});

export default notificationReducer;
