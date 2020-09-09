import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.cart, action) => {
  switch (action.type) {
    case types.UPDATE_PRODUCT_CART: {
      const addProduct = { ...action.payload };
      const findOne = state.cartList.find(
        (item) => item.productId === addProduct.productId && item.orderType === addProduct.orderType
      );
      let updatedCart = [];
      if (findOne) {
        updatedCart = state.cartList.map((item) => {
          if (item.productId === addProduct.productId && item.orderType === addProduct.orderType) return addProduct;
          else return item;
        });
      } else {
        updatedCart = [...state.cartList, addProduct];
      }
      return {
        ...state,
        cartList: [...updatedCart],
      };
    }
    default:
      return state;
  }
};
