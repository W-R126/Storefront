import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import storeReducer from './storeReducer';
import productReducer from './productReducer';

export default combineReducers({
  authReducer,
  cartReducer,
  storeReducer,
  productReducer,
});
