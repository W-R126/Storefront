import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.cart, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT_CART: {
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
    }
    case types.UPDATE_PRODUCT_CART: {
      const addProduct = { ...action.payload };
      let updatedCart = [];
      if (addProduct.qty <= 0) {
        updatedCart = state.cartList.filter((item) => {
          if (item.productId && item.orderType === addProduct.orderType) return false;
          else return true;
        });
      } else {
        const findOne = state.cartList.find(
          (item) => item.productId === addProduct.productId && item.orderType === addProduct.orderType
        );

        if (findOne) {
          updatedCart = state.cartList.map((item) => {
            if (item.productId === addProduct.productId && item.orderType === addProduct.orderType) return addProduct;
            else return item;
          });
        } else {
          updatedCart = [...state.cartList, addProduct];
        }
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
