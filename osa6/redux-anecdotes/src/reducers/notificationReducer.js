const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data;
    case 'REMOVE_MESSAGE':
      return null;
    default:
      return state;
  }
};

export const setMessage = message => {
  return {
    type: 'SET_MESSAGE',
    data: message
  };
};

export const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE'
  };
};

export default notificationReducer;
