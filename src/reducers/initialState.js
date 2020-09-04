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
    pagination: {
      page: 1,
      limit: CONSTANTS.PRODUCT_PAGE_LIMIT,
      page_data: {
        current_page: -1,
        total_pages: -1,
        limit: -1,
        count: -1,
      },
    },
  },
};
