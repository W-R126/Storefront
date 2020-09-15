import * as types from '../actions/actionTypes';
import initialState from './initialState';
import * as CONSTANTS from '../constants';

export default (state = initialState.product, action) => {
  switch (action.type) {
    case types.UPDATE_PRODUCT_PAGEDATA: {
      return {
        ...state,
        pageData: { ...action.payload },
      };
    }
    case types.UPDATE_PRODUCT_LIST: {
      return {
        ...state,
        loading: false,
        productList: [...state.productList, ...action.payload],
      };
    }
    case types.UPDATE_PRODUCT_CATEGORY_FIILTER: {
      return {
        ...state,
        loading: true,
        filter: {
          ...state.filter,
          category: action.payload,
        },
        pageData: {
          current_page: 1,
          total_pages: 0,
          count: 0,
          limit: CONSTANTS.PRODUCT_PAGE_LIMIT,
        },
        productList: [],
      };
    }
    case types.UPDATE_PRODUCT_SEARCH_STR_FILTER: {
      return {
        ...state,
        loading: true,
        filter: {
          ...state.filter,
          searchStr: action.payload,
        },
        pageData: {
          current_page: 1,
          total_pages: 0,
          count: 0,
          limit: CONSTANTS.PRODUCT_PAGE_LIMIT,
        },
        productList: [],
      };
    }
    default:
      return state;
  }
};
