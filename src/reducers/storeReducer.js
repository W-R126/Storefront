import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.store, action) => {
  switch (action.type) {
    case types.UPDATE_TRANS_TYPE: {
      return {
        ...state,
        orderType: action.payload,
      };
    }
    case types.CHANGE_COUNTRY: {
      return {
        ...state,
        country: { ...action.payload },
      };
    }
    default:
      return state;
  }
};
