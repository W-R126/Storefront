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
  let variableJSON = { touchpoint_type: 'digital_front' };
  variableJSON['filter'] = {
    page: pageData.current_page,
    limit: PRODUCT_PAGE_LIMIT,
    count: true,
  };

  if (filter.searchStr && filter.searchStr.length > 0)
    variableJSON.filter['name'] = `%${filter.searchStr.toLowerCase()}%`;
  if (filter.category !== 'all') variableJSON['category_id'] = filter.category;

  client
    .query({
      query: GET_PRODUCTS,
      variables: {
        ...variableJSON,
      },
    })
    .then((res) => {
      console.log('***********');
      console.log(res.data.products);

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
      dispatch({
        type: UPDATE_PRODUCT_PAGEDATA,
        payload: pageData,
      });

      dispatch({
        type: UPDATE_PRODUCT_LIST,
        payload: [],
      });
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
