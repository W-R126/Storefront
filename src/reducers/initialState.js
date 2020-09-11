import * as CONSTANTS from '../constants';

export default {
  auth: {
    userInfo: {},
  },
  cart: {
    cartList: [],
  },
  store: {
    storeInfo: {},
    orderType: {},
    country: {},
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
  },
};
