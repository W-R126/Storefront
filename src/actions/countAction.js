import * as types from "./actionTypes";

export const increaseCountAction = () => (dispatch) => {
  dispatch({
    type: types.INCREASE_COUNT,
  });
};

export const decreaseCountAction = () => (dispatch) => {
  dispatch({
    type: types.DECREASE_COUNT,
  });
};
