import { combineReducers } from 'redux';
import localizationReducer from './localizationReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import storeReducer from './storeReducer';
import productReducer from './productReducer';

export default combineReducers({
  localizationReducer,
  authReducer,
  cartReducer,
  storeReducer,
  productReducer,
});
