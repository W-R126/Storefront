import _ from 'lodash';

import { getProductViewFromStoreSetting } from './store';

export const getProductCart = (cartList, productId) => {
  const findCart = cartList.find((item) => item.id === productId);
  return findCart;
};

export const getOrdredProducts = (productData, storeSettingData) => {
  if (productData === undefined || productData === null) {
    return [];
  } else {
    if (storeSettingData === undefined || storeSettingData === null) return _.get(productData, 'products', []);
    else {
      let orderedProducts = [];
      const productList = productData.products;
      const productView = getProductViewFromStoreSetting(storeSettingData);
      const productsOrder = productView.products;

      if (productsOrder === null) {
        orderedProducts = _.get(productData, 'products', []);
      } else {
        productsOrder
          .sort((a, b) => a.position - b.position)
          .forEach((item) => {
            const findOne = productList.find((productItem) => productItem.id === item.id);
            if (findOne)
              orderedProducts.push({
                ...findOne,
                position: item.position,
              });
          });
      }

      if (productView.sort_by_name) {
        orderedProducts = [...orderedProducts.sort((a, b) => a.name - b.name)];
      }
      return orderedProducts;
    }
  }
};
