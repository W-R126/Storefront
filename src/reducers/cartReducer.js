import { ADD_PRODUCT_CART, UPDATE_PRODUCT_CART, UPDATE_PRODUCT_ADDON } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_PRODUCT_CART: {
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
    }
    case UPDATE_PRODUCT_CART: {
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
    // case UPDATE_PRODUCT_ADDON: {
    //   const { proudctId, cartInfo } = action.payload;
    //   const updatedCartList = state.cartList.map(item => {
    //     if (item.id === proudctId) {
    //       const addOns = item.addOns.
    //     }
    //     return item;
    //   })
    //   return {
    //     ...state,
    //     cartList: [...updatedCartList],
    //   };
    // }

    default:
      return state;
  }
};
