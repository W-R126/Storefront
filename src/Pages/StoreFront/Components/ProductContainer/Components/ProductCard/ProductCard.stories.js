import React from 'react';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import store from '../../../../../../store';

import ProductCard from './ProductCard';

import AllergyImg1 from '../../../../../../assets/img/flags/ad.svg';

export default {
  title: 'SharedComponents/ProductCard',
  decorators: [withKnobs],
};

export const normal = () => {
  const prodductInfo: Object = object('ProductInfo', defaultProductInfo);
  const currencyData: Object = object('CurrencyData', defaultCurrencyData);
  const orderType: Object = object('OrderType', defaultOrderType);
  const cartInfo: Array = object('CartInfo', defaultCartInfo);
  const netPrice: Boolean = boolean('Net Price', false);
  const loading: Boolean = boolean('Loading', false);

  return (
    <Provider store={store}>
      <ProductCard
        productInfo={prodductInfo}
        currencyData={currencyData}
        orderType={orderType}
        netPrice={netPrice}
        cartInfo={cartInfo}
        loading={loading}
      />
    </Provider>
  );
};

const defaultProductInfo = {
  name: 'Mac & Cheese ',
  bar_code: '113',
  product_code: null,
  images: [
    {
      id: 0,
      url: AllergyImg1,
    },
  ],
  description: '',
  measure_type: 'qty',
  measure_amount: 1,
  stocks: [{ current_stock: -429, __typename: 'Stock' }],
  prices: [
    {
      price_infos: [
        {
          price_type: { id: '3', name: 'click', __typename: 'PriceType' },
          price: 4,
          taxes: [{ id: '4', rate: -1, name: 'VAT', __typename: 'Tax' }],
          __typename: 'ProductPriceInfo',
        },
        {
          price_type: { id: '2', name: 'delivery', __typename: 'PriceType' },
          price: 4,
          taxes: [{ id: '4', rate: -1, name: 'VAT', __typename: 'Tax' }],
          __typename: 'ProductPriceInfo',
        },
        {
          price_type: { id: '1', name: 'pos', __typename: 'PriceType' },
          price: 4,
          taxes: [{ id: '4', rate: -1, name: 'VAT', __typename: 'Tax' }],
          __typename: 'ProductPriceInfo',
        },
      ],
      __typename: 'ProductPrice',
    },
  ],
  allergies: [],
  ingredients: [],
  __typename: 'Product',
};

const defaultCurrencyData = {
  store: {
    localisation: { currency_symbol: '&#163;', currency_decimal: true, __typename: 'Localisation' },
    __typename: 'Store',
  },
};

const defaultOrderType = {
  id: '4',
  name: 'Delivery',
};

const defaultCartInfo = [];
