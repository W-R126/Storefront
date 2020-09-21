import { ADD_PRODUCT_CART, UPDATE_PRODUCT_CART, UPDATE_PRODUCT_ADDON } from './actionTypes';

export const addProductCartAction = (addCart) => (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_CART,
    payload: addCart,
  });
};

export const updateProductCartAction = (updateCart) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_CART,
    payload: updateCart,
  });
};

export const updateAddOnAction = (updateAddOnData) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_ADDON,
    payload: updateAddOnData,
  });
};
