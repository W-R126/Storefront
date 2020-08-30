import moment from 'moment';

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
