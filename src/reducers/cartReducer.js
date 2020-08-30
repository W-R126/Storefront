import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.cart, action) => {
  switch (action.type) {
    case types.UPDATE_PRODUCT_CART: {
      return {
        ...state,
        cartList: [...action.payload],
      };
    }
    default:
      return state;
  }
};
