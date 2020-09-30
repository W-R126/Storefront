import { UPDATE_PRODUCT_CART, CLEAR_PRODUCT_ORDERTYPE_CART } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.cart, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_CART: {
      const addProduct = { ...action.payload };
      let updatedCart = [];
      if (addProduct.qty <= 0) {
        updatedCart = state.cartList.filter((item) => item.id !== addProduct.id);
      } else {
        const findOne = state.cartList.find((item) => item.id === addProduct.id);

        if (findOne) {
          updatedCart = state.cartList.map((item) => {
            if (item.id === addProduct.id) return addProduct;
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
    case CLEAR_PRODUCT_ORDERTYPE_CART: {
      return {
        ...state,
        cartList: [...state.cartList.filter((item) => item.orderType.id !== action.payload.id)],
      };
    }
    default:
      return state;
  }
};
