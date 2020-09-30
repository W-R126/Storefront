import _ from 'lodash';
import { getProductViewFromStoreSetting } from './store';

export const getProductCart = (cartList, productId, orderType) => {
  const findCart = cartList.filter(
    (item) => item.productId === productId && item.orderType.name === _.get(orderType, 'name', '')
  );
  return findCart;
};

export const getOrdredProducts = (productData, storeInfo) => {
  if (productData === undefined || productData === null) {
    return [];
  } else {
    if (storeInfo === undefined || storeInfo === null || Object.keys(storeInfo).length === 0) return productData;
    else {
      let orderedProducts = [];
      const productView = getProductViewFromStoreSetting(storeInfo);
      const productsOrder = productView.products;

      if (productsOrder === null) {
        orderedProducts = [...productData];
      } else {
        if (productView.show_selected) {
          productsOrder
            .sort((a, b) => a.position - b.position)
            .forEach((item) => {
              const findOne = productData.find((itemOne) => itemOne.id === item.id);
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
    return _.get(priceType, 'name', '').toLowerCase() === _.get(orderType, 'pricing_type', '').toLowerCase();
  });
  return findPrice;
};

export const getProductTotalAmount = (productInfo, orderType, net_price) => {
  const priceInfo = getProductPriceInfo(productInfo, orderType, net_price);
  if (!priceInfo) return 0;

  if (net_price) {
    let returnPrice = priceInfo.price;
    let rateValue = 0;
    priceInfo.taxes.forEach((item) => {
      if (item.rate > 0) rateValue += item.rate;
    });
    returnPrice += (rateValue * rateValue) / 100;
    return returnPrice;
  } else {
    return priceInfo.price;
  }
};

export const getAddOnOptionPriceInfo = (optionInfo, orderType) => {
  const priceInfos = _.get(optionInfo.price, 'price_infos', []);
  if (priceInfos.length === 0) return null;
  const findPrice = priceInfos.find((item) => {
    const priceType = _.get(item, 'price_type', {});
    return _.get(priceType, 'name', '').toLowerCase() === _.get(orderType, 'pricing_type', '').toLowerCase();
  });
  return findPrice;
};

export const getAddOnOptionPrice = (optionInfo, orderType, net_price) => {
  const priceInfo = getAddOnOptionPriceInfo(optionInfo, orderType);
  if (!priceInfo) return 0;
  if (net_price) {
    return _.get(priceInfo, 'price', 0);
  } else {
    let priceValue = priceInfo.price;
    let rateValue = 0;
    priceInfo.taxes.forEach((item) => {
      if (item.rate > 0) rateValue += item.rate;
    });
    priceValue += (priceValue * rateValue) / 100;
    return priceValue;
  }
};

export const getAddOnGroupPrice = (groupCartInfo, orderType, net_price) => {
  let allowFree = _.get(groupCartInfo, 'allow_free', 0);
  const options = _.get(groupCartInfo, 'addons', []);

  let totalPrice = 0;
  options.forEach((item, nIndex) => {
    const force_charge = _.get(item, 'force_charge', false);
    if (allowFree > 0 && nIndex < allowFree && !force_charge) {
      allowFree--;
    } else {
      const qty = _.get(item, 'qty', 0);
      const fixed_price = _.get(item, 'fixed_price', 0);
      totalPrice += fixed_price * qty;
    }
  });
  return totalPrice;
};

export const getAddOnCartPrice = (addOnCart, orderType, net_price) => {
  if (!addOnCart || addOnCart.length === 0) return 0;
  let totalValue = 0;
  addOnCart.forEach((item) => {
    totalValue += getAddOnGroupPrice(item, orderType, net_price);
  });
  return totalValue;
};

export const getMeasureTypStr = (measureType) => {
  if (!measureType) return '';
  if (measureType === 'qty') return '';
  else if (measureType === 'grams') return 'g';
  else if (measureType === 'kilograms') return 'Kg';
  else return '';
};

export const checkAddonItemMinsuButtonStatus = (groupInfo, itemInfo) => {
  if (itemInfo.qty === 1 && groupInfo.mandatory && groupInfo.addons.length === 1) return false;
  return true;
};

export const checkAddonItemPlusButtonStatus = (groupInfo, itemInfo) => {
  const extra = _.get(itemInfo, 'extra', -1);
  const itemQty = _.get(itemInfo, 'qty', 0);

  if (extra >= 0 && itemQty >= extra + 1) {
    return false;
  }
  return true;
};

export const getCartTotalPrice = (cartList, orderType, netPrice) => {
  let totalPrice = 0;

  const filteredCartList = cartList.filter((item) => item.orderType.id === orderType.id);
  if (filteredCartList.length === 0) {
    return 0;
  }

  filteredCartList.forEach((item) => {
    const { priceInfo } = item;
    const addonprice = getAddOnCartPrice(item.addons);
    if (netPrice) totalPrice += priceInfo.price * item.qty;
    else {
      let rateValue = 0;
      priceInfo.taxes.forEach((item) => {
        if (item.rate > 0) rateValue += item.rate;
      });
      totalPrice += (priceInfo.price + priceInfo.price * (rateValue / 100) + addonprice) * item.qty;
    }
  });
  return totalPrice;
};
