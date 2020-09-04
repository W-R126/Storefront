import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ProductCard from '../ProductCard';

import { GET_PRODUCTS } from '../../../../../../graphql/products/product-query';
import { GET_STORE_SETTING_PRODUCT } from '../../../../../../graphql/store/store-query';
import { GET_MERCHANT_NET_PRICE } from '../../../../../../graphql/merchant/merchant-query';
import { getOrdredProducts } from '../../../../../../utils/product';
import { getIsShowSideCategory } from '../../../../../../utils/store';

import { UPDATE_PRODUCT_PAGINATION } from '../../../../../../actions/actionTypes';

const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => ({
    pagination: state.productReducer.pagination,
  }));

  const { loading, error, data: productData, extensions: productExtensions } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        page: pagination.page,
        limit: pagination.limit,
        count: true,
      },
    },
  });
  const { loading: storeSettingLoading, error: storeSettingError, data: storeSettingData } = useQuery(
    GET_STORE_SETTING_PRODUCT
  );
  const { data: merchantNetPrice } = useQuery(GET_MERCHANT_NET_PRICE);

  useEffect(() => {
    let page_data = {
      current_page: -1,
      total_pages: -1,
      limit: -1,
      count: -1,
    };

    const extensions = _.get(productData, 'extensions', null);
    if (!extensions) return;
    if (productData.extensions) {
      page_data = { ...productData.extensions.page_data };
    }

    dispatch({
      type: UPDATE_PRODUCT_PAGINATION,
      payload: {
        ...pagination,
        page_data: page_data,
      },
    });
  }, [dispatch, pagination, productData]);

  const getNetPriceStatus = () => {
    const merchantSettings = _.get(merchantNetPrice, 'merchantSettings', null);
    if (merchantSettings === null) return false;
    return merchantSettings.products.net_price;
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {getOrdredProducts(productData, storeSettingData).map((item, nIndex) => {
            return (
              <Grid item lg={getIsShowSideCategory(storeSettingData) ? 4 : 3} md={6} xs={12} key={item.id}>
                <ProductCard productInfo={item} net_price={getNetPriceStatus()} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: '26px',
    },
  })
);
export default ProductList;
