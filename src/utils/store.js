import moment from 'moment';
import _ from 'lodash';

import { getValueFromHHMM } from './string';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getStoreOpenStatus = (store_openings) => {
  let returnData = { closed: false, nextStatus: '' };

  const dayIndex = new Date().getDay();
  const dayOpenInfo = getOpenDayInfo(store_openings, dayIndex);
  if (dayOpenInfo === null) return { closed: true, nextStatus: '' };
  if (dayOpenInfo.closed) return { closed: true, nextStatus: '' };

  const curDateValue = new Date().valueOf();
  const curMomentOpen = moment(new Date());
  const curMomentClose = moment(new Date());
  const curPrevCloseMoment = moment(new Date());

  let isOpen = false;
  const opening_times = dayOpenInfo.opening_times;
  const oneHourValue = 60 * 60 * 1000;

  opening_times.forEach((item, nIndex) => {
    if (isOpen) return;
    const HHMMValueOpen = getValueFromHHMM(item.open);
    curMomentOpen.set({ hour: HHMMValueOpen[0], minute: HHMMValueOpen[1], second: 0, millisecond: 0 });
    const HHMMValueClose = getValueFromHHMM(item.close);
    curMomentClose.set({ hour: HHMMValueClose[0], minute: HHMMValueClose[1], second: 59, millisecond: 999 });

    if (nIndex >= 1) {
      const HHMMPrevClose = getValueFromHHMM(opening_times[nIndex - 1].closed);
      const PrevCloseMoment = curPrevCloseMoment.set({
        hour: HHMMPrevClose[0],
        minute: HHMMPrevClose[1],
        second: 59,
        millisecond: 999,
      });
      if (curDateValue > PrevCloseMoment.valueOf() && curDateValue < curMomentOpen.valueOf()) {
        if (curDateValue >= curMomentOpen.valueOf() - oneHourValue)
          returnData = {
            closed: true,
            nextStatus: `Opening at ${curMomentOpen.format('HH:mm A')}`,
          };
        else
          returnData = {
            closed: true,
            nextStatus: '',
          };
      }
    }

    if (curMomentOpen.valueOf() <= curDateValue && curDateValue <= curMomentClose.valueOf()) {
      if (curDateValue >= curMomentClose.valueOf())
        returnData = {
          closed: false,
          nextStatus: `Closing at ${curMomentClose.format('HH:mm A')}`,
        };
      else
        returnData = {
          closed: false,
          nextStatus: '',
        };
    }

    if (opening_times.length === 1) {
      if (curMomentOpen.valueOf() - oneHourValue <= curDateValue && curDateValue < curMomentOpen.valueOf())
        returnData = {
          closed: false,
          nextStatus: `Opening at ${curMomentOpen.format('HH:mm A')}`,
        };
    }
  });
  return returnData;
};

export const getOpenDayInfo = (store_openings, dayIndex) => {
  try {
    let dayName = DAY_NAMES[dayIndex];
    return store_openings.find((item) => item.day === dayName);
  } catch (err) {
    return null;
  }
};

export const getProductViewFromStoreSetting = (storeSetting) => {
  try {
    const digitalFront = storeSetting.store.settings.touchpoint_settings.digital_front;
    return digitalFront.product_view;
  } catch {
    return null;
  }
};

export const getIsShowSideCategory = (storeSetting) => {
  try {
    const digitalFront = storeSetting.store.settings.touchpoint_settings.digital_front;
    return digitalFront.product_view.by_category;
  } catch {
    return true;
  }
};

export const getCurrency = (localisationInfo) => {
  const store = _.get(localisationInfo, 'store', null);
  if (store === null) return '';
  const localisation = _.get(store, 'localisation', null);
  if (localisation == null) return '';
  let symbol = _.get(localisation, 'currency_symbol', '');
  return symbol;
};

export const getStorePos = (storeInfo) => {
  const address = _.get(storeInfo, 'address', null);
  if (!address) return null;
  const lat = _.get(address, 'lat', null);
  const lng = _.get(address, 'lng', null);

  if (lat === null || lng === null) return null;
  return { lat: parseFloat(lat), lng: parseFloat(lng) };
};

export const getOrderTypes = (storeInfo) => {
  const store = _.get(storeInfo, 'store', null);
  if (!store) return [];
  const orderTypes = _.get(store, 'order_types', []);
  if (orderTypes.length === 0) return [];

  const touchpoint_settings = storeInfo.store.settings.touchpoint_settings;
  const orderIds = touchpoint_settings.digital_front.order_types;
  if (orderIds === null || orderIds.length === 0) return orderTypes;

  const sortedOrderTypes = [];
  orderIds.forEach((item) => {
    const findOne = orderTypes.find((itemOne) => itemOne.id === item);
    if (findOne) sortedOrderTypes.push(findOne);
  });
  return sortedOrderTypes;
};
