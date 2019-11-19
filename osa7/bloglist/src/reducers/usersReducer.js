import usersService from '../services/users';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INIT_USERS':
      return [...state, ...payload];
    default:
      return state;
  }
};

export const initUsers = () => {
  return async dispatch => {
    const users = await usersService.getAllUsers();
    dispatch({
      type: 'INIT_USERS',
      payload: users
    });
  };
};
