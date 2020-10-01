import { SET_CUR_MODAL } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.modalStatus, action) => {
  switch (action.type) {
    case SET_CUR_MODAL: {
      return {
        ...state,
        curModal: action.payload,
      };
    }
    default:
      return state;
  }
};
