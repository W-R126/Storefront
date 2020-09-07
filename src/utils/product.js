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
    if (storeSettingData === undefined || storeSettingData === null) return productData;
    else {
      let orderedProducts = [];
      const productList = productData;
      const productView = getProductViewFromStoreSetting(storeSettingData);
      const productsOrder = productView.products;

      if (productsOrder === null) {
        orderedProducts = [...productData];
      } else {
        if (productView.show_selected) {
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
        } else {
          orderedProducts = [...productData];
        }
      }

      if (productView.sort_by_name) {
        orderedProducts = [...orderedProducts.sort((a, b) => a.name - b.name)];
      }
      return orderedProducts;
    }
  }
};

export const getProductPriceInfo = (productInfo, orderType) => {
  const prices = _.get(productInfo, 'prices', []);
  if (prices.length === 0) return null;
  const findPrice = prices[0].price_infos.find((item) => {
    const priceType = _.get(item, 'price_type', {});
    return _.get(priceType, 'name', '').toLowerCase() === _.get(orderType, 'name', '').toLowerCase();
  });
  return findPrice;
};
