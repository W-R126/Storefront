import _ from 'lodash';
import { getMerchantId, getStoreId } from '../constants';

export const getUserAvatar = (userInfo) => {
  const profile = _.get(userInfo, 'profile', null);
  if (null) return '';
  return _.get(profile, 'url', null);
};

export const getUserName = (userInfo) => {
  return `${_.get(userInfo, 'frist_name', '')} ${_.get(userInfo, 'last_name', '')}`;
};

export const getUserEmail = (userInfo) => {
  return _.get(userInfo, 'email', '');
};

export const checkUserMerchantRole = (userInfo) => {
  const merchant = _.get(userInfo, 'merchants', []);
  const roles = _.get(userInfo, 'roles', []);
  if (merchant.length === 0 || roles.length === 0) return false;

  const merchantId = getMerchantId();
  const storeId = getStoreId();

  const findRole = roles.find((item) => item.merchant_id === merchantId);
  if (!findRole) return false;

  const findMerchant = merchant.find((item) => item.id === merchantId);
  if (!findMerchant) return false;

  const findStore = findMerchant.stores.find((item) => item.id === storeId);
  if (findStore) return true;
  else return false;
};

export const getMerchantName = (userInfo) => {
  const merchant = _.get(userInfo, 'merchants', []);
  const roles = _.get(userInfo, 'roles', []);
  if (merchant.length === 0 || roles.length === 0) return '';

  const merchantId = getMerchantId();
  const storeId = getStoreId();

  const findRole = roles.find((item) => item.merchant_id === merchantId);
  if (!findRole) return '';

  const findMerchant = merchant.find((item) => item.id === merchantId);
  if (!findMerchant) return '';

  const findStore = findMerchant.stores.find((item) => item.id === storeId);
  if (findStore) return findMerchant.tname;
  else return '';
};

export const checkUserIsLogin = (authInfo) => {
  const uesrID = _.get(authInfo, 'id', null);
  if (uesrID === null) return false;
  return true;
};
