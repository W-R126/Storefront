import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.product, action) => {
  switch (action.type) {
    case types.UPDATE_PRODUCT_PAGEDATA: {
      return {
        ...state,
        pageData: { ...action.payload },
      };
    }
    case types.UPDATE_PRODUCT_LIST: {
      return {
        ...state,
        productList: [...state.productList, ...action.payload],
      };
    }
    default:
      return state;
  }
};
