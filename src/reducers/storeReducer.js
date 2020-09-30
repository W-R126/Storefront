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
    case types.UPDATE_STORE_INFO: {
      return {
        ...state,
        storeInfo: { ...action.payload },
        storeLoading: false,
      };
    }
    case types.UPDATE_STORE_LOADING: {
      return {
        ...state,
        storeLoading: action.payload,
      };
    }
    default:
      return state;
  }
};
