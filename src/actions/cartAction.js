import { UPDATE_PRODUCT_CART } from './actionTypes';

export const updateProductCartAction = (updateCart) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_CART,
    payload: updateCart,
  });
};
