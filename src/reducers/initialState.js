import * as CONSTANTS from '../constants';

export default {
  auth: {
    userInfo: {},
  },
  cart: {
    cartList: [],
  },
  merchant: {
    netPrice: false,
    loading: true,
  },
  store: {
    storeInfo: {},
    storeLoading: true,
    orderType: {},
  },
  product: {
    productList: [],
    pageData: {
      current_page: 1,
      total_pages: 0,
      limit: CONSTANTS.PRODUCT_PAGE_LIMIT,
      count: 0,
    },
    filter: {
      category: 'all',
      searchStr: '',
    },
    loading: true,
  },
  localization: {
    countryCode: 'GB',
  },
};
