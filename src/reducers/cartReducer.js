import { UPDATE_PRODUCT_CART } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.cart, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_CART: {
      const addProduct = { ...action.payload };
      let updatedCart = [];
      if (addProduct.qty <= 0) {
        updatedCart = state.cartList.filter((item) => {
          if (item.productId && item.orderType.id === addProduct.orderType.id) return false;
          else return true;
        });
      } else {
        const findOne = state.cartList.find(
          (item) => item.productId === addProduct.productId && item.orderType.id === addProduct.orderType.id
        );

        if (findOne) {
          updatedCart = state.cartList.map((item) => {
            if (item.productId === addProduct.productId && item.orderType.id === addProduct.orderType.id)
              return addProduct;
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
