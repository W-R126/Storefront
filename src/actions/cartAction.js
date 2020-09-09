import { UPDATE_PRODUCT_CART } from './actionTypes';

export const UpdateCartAction = (updateCart) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_CART,
    payload: updateCart,
  });
};
