import _ from 'lodash';
import {
  UPDATE_PRODUCT_PAGEDATA,
  UPDATE_PRODUCT_LIST,
  UPDATE_PRODUCT_CATEGORY_FIILTER,
  UPDATE_PRODUCT_SEARCH_STR_FILTER,
} from './actionTypes';
import { GET_PRODUCTS } from '../graphql/products/product-query';
import { PRODUCT_PAGE_LIMIT } from '../constants';

export const getProductPaginationAction = (client, filter, pageData) => (dispatch) => {
  let variableJSON = {};
  variableJSON['filter'] = {
    page: pageData.current_page,
    limit: PRODUCT_PAGE_LIMIT,
    count: true,
  };

  if (filter.searchStr.length > 0) variableJSON.filter['name'] = { __like: `%${filter.searchStr}%` };
  if (filter.category !== 'all') variableJSON['category_id'] = { __like: `%${filter.category}%` };

  client
    .query({
      query: GET_PRODUCTS,
      variables: {
        ...variableJSON,
      },
    })
    .then((res) => {
      const extensions = _.get(res.data, 'extensions', null);

      let pageData = {
        current_page: 1,
        total_pages: 0,
        limit: PRODUCT_PAGE_LIMIT,
        count: 0,
      };

      if (extensions) {
        pageData = { ...extensions.page_data };
      }

      dispatch({
        type: UPDATE_PRODUCT_PAGEDATA,
        payload: pageData,
      });

      dispatch({
        type: UPDATE_PRODUCT_LIST,
        payload: _.get(res.data, 'products', []),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateProducdtPageDataAction = (newPageData) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_PAGEDATA,
    payload: newPageData,
  });
};

export const updateCatgoryFilterAction = (newCategory) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_CATEGORY_FIILTER,
    payload: newCategory,
  });
};

export const updateSearchStrProductAction = (newStr) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_SEARCH_STR_FILTER,
    payload: newStr,
  });
};
