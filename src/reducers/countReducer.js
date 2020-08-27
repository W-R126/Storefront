import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.count, action) => {
  switch (action.type) {
    case types.INCREASE_COUNT:
      return {
        ...state,
        value: state.value + 1,
      };
    case types.DECREASE_COUNT:
      return {
        ...state,
        value: state.value - 1,
      };
    default:
      return state;
  }
};
