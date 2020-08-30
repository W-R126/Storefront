import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.store, action) => {
  switch (action.type) {
    case types.UPDATE_TRANS_TYPE: {
      return {
        ...state,
        transType: action.payload,
      };
    }
    default:
      return state;
  }
};
