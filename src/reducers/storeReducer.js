import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.store, action) => {
  switch (action.type) {
    case types.UPDATE_STORE_INFO: {
      return {
        ...state,
        store: { ...action.payload },
      };
    }
    default:
      return state;
  }
};
