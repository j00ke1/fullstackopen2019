const initialState = {
  messageText: null,
  messageStyle: {}
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_MESSAGE':
      return {
        messageText: payload.message,
        messageStyle: payload.style
      };
    case 'REMOVE_MESSAGE':
      return initialState;
    default:
      return {
        messageText: state.messageText,
        messageStyle: state.messageStyle
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
