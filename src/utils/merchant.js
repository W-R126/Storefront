import _ from 'lodash';

export const getNetPriceStatus = (merchantNetPrice) => {
  const merchantSettings = _.get(merchantNetPrice, 'merchantSettings', null);
  if (merchantSettings === null) return false;
  return merchantSettings.products.net_price;
};
