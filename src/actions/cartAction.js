import { UPDATE_PRODUCT_CART, CLEAR_PRODUCT_ORDERTYPE_CART } from './actionTypes';

export const updateProductCartAction = (updateCart) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_CART,
    payload: updateCart,
  });
};

export const clearProductCartAction = (orderType) => (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT_ORDERTYPE_CART,
    payload: orderType,
  });
};
