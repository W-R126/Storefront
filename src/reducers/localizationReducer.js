import { SET_LOCALIZATION } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.localization, action) => {
  switch (action.type) {
    case SET_LOCALIZATION: {
      return {
        ...state,
        countryCode: action.payload,
      };
    }
    default:
      return state;
  }
};
