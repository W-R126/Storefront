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

export const formatPrice = (value, localisationInfo) => {
  const store = _.get(localisationInfo, 'store', null);
  if (store === null) return value;
  const localisation = _.get(store, 'localisation', null);
  if (localisation == null) return value;

  if (localisation.currency_decimal) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else return value;
};
