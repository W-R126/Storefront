import { UPDATE_MERCHANT_NET_PRICE } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.merchant, action) => {
  switch (action.type) {
    case UPDATE_MERCHANT_NET_PRICE: {
      return {
        ...state,
        netPrice: action.payload,
        merchantLoading: false,
      };
    }
    default:
      return state;
  }
};
