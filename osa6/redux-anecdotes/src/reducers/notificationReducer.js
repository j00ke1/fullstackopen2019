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

export const setMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: message
    });
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE'
      });
    }, time * 1000);
  };
};

export default notificationReducer;
