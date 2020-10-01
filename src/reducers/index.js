import { combineReducers } from 'redux';
import localizationReducer from './localizationReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import merchantReducer from './merchantReducer';
import storeReducer from './storeReducer';
import productReducer from './productReducer';
import modalStatusReducer from './modalStatusReducer';

export default combineReducers({
  localizationReducer,
  authReducer,
  cartReducer,
  merchantReducer,
  storeReducer,
  productReducer,
  modalStatusReducer,
});
