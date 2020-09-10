import _ from 'lodash';
import { getProductViewFromStoreSetting } from './store';

export const getProductCart = (cartList, productId, orderType) => {
  const findCart = cartList.find((item) => item.id === productId && item.orderType === _.get(orderType, 'name', ''));
  return findCart;
};

export const getOrdredProducts = (productData, storeSettingData) => {
  if (productData === undefined || productData === null) {
    return [];
  } else {
    if (storeSettingData === undefined || storeSettingData === null) return productData;
    else {
      let orderedProducts = [];
      const productView = getProductViewFromStoreSetting(storeSettingData);
      const productsOrder = productView.products;

      if (productsOrder === null) {
        orderedProducts = [...productData];
      } else {
        if (productView.show_selected) {
          let maxOrderValue = Math.max.apply(
            Math,
            productsOrder.map(function (o) {
              return o.position;
            })
          );

          productData.forEach((item) => {
            const findOne = productsOrder.find((orderItem) => orderItem.id === item.id);
            if (findOne)
              orderedProducts.push({
                ...item,
                position: findOne.position,
              });
            else {
              maxOrderValue++;
              orderedProducts.push({
                ...item,
                position: maxOrderValue,
              });
            }
          });

          orderedProducts = [...orderedProducts.sort((a, b) => a.position - b.position)];
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

export const getProductTotalAmount = (productInfo, orderType, net_price) => {
  const priceInfo = getProductPriceInfo(productInfo, orderType, net_price);
  if (!priceInfo) return 0;

  if (net_price) {
    let returnPrice = priceInfo.price;
    priceInfo.taxes.forEach((item) => {
      returnPrice += item.rate;
    });
    return returnPrice;
  } else {
    return priceInfo.price;
  }
};
