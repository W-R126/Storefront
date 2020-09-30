import moment from 'moment';
import _ from 'lodash';

export const getValueFromHHMM = (strTime) => {
  if (!strTime) return [0, 0];
  var timeValue = strTime.split(':');
  return [timeValue[0], timeValue[1]];
};

export const HHMMtoHHMMA = (strTime) => {
  var timeValue = strTime.split(':');
  const curMoment = moment(new Date());
  curMoment.set({ hour: timeValue[0], minute: timeValue[1] });
  return curMoment.format('HH:MM A');
};

export const formatPrice = (value, storeInfo) => {
  if (storeInfo === undefined || storeInfo === null || Object.keys(storeInfo).length === 0) return value;
  const localisation = _.get(storeInfo, 'localisation', null);
  if (localisation == null) return value;

  let returnValue = '0';
  if (localisation.currency_decimal) {
    if (value === null) returnValue = '0.00';
    returnValue = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else returnValue = value;

  if (localisation.digit_separator === ',') {
    return returnValue.toString().replace('.', ',');
  }
  return returnValue;
};
