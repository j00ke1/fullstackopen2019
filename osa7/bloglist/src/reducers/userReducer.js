const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return { ...state, ...payload };
    case 'REMOVE_USER':
      return null;
    default:
      return state;
  }
};

export const setUser = payload => ({
  type: 'SET_USER',
  payload
});

export const removeUser = () => ({
  type: 'REMOVE_USER'
});
