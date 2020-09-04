import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.product, action) => {
  switch (action.type) {
    case types.UPDATE_PRODUCT_PAGINATION: {
      return {
        ...state,
        pagination: action.payload,
      };
    }
    default:
      return state;
  }
};
