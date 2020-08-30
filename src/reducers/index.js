import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import storeReducer from './storeReducer';

export default combineReducers({
  authReducer,
  cartReducer,
  storeReducer,
});
