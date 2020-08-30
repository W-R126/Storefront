import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      localStorage.setItem('token', action.payload.access_token);
      return {
        ...state,
        userInfo: { ...action.payload.user },
      };
    }
    default:
      return state;
  }
};
