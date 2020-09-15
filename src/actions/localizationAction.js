import { SET_LOCALIZATION } from './actionTypes';

export const setLocalizationAction = (countryCode) => (dispatch) => {
  dispatch({
    type: SET_LOCALIZATION,
    payload: countryCode,
  });
};
