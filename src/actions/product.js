import _ from 'lodash';
import { UPDATE_PRODUCT_PAGEDATA, UPDATE_PRODUCT_LIST } from './actionTypes';
import { GET_PRODUCTS } from '../graphql/products/product-query';
import { PRODUCT_PAGE_LIMIT } from '../constants';

export const getProductPaginationAction = (client, searchPageIndex) => (dispatch) => {
  client
    .query({
      query: GET_PRODUCTS,
      variables: {
        filter: {
          page: searchPageIndex,
          limit: PRODUCT_PAGE_LIMIT,
          count: true,
        },
      },
    })
    .then((res) => {
      const extensions = _.get(res.data, 'extensions', null);

      let pageData = {
        current_page: 0,
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
