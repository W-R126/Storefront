import axios from 'axios';

export const getCountryCode = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://ipapi.co/json/')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
