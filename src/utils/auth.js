import _ from 'lodash';

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
