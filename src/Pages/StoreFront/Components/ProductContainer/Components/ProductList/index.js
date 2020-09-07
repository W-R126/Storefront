import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '@apollo/react-hoc';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ProductCard from '../ProductCard';

import { GET_STORE_SETTING_PRODUCT } from '../../../../../../graphql/store/store-query';
import { GET_MERCHANT_NET_PRICE } from '../../../../../../graphql/merchant/merchant-query';
import { getOrdredProducts } from '../../../../../../utils/product';
import { getIsShowSideCategory } from '../../../../../../utils/store';

import { getProductPaginationAction } from '../../../../../../actions/product';

const ProductList = ({ client, getProductPaginationAction }) => {
  const classes = useStyles();
  const { productList } = useSelector((state) => ({
    productList: state.productReducer.productList,
  }));

  const { loading: storeSettingLoading, error: storeSettingError, data: storeSettingData } = useQuery(
    GET_STORE_SETTING_PRODUCT
  );
  const { data: merchantNetPrice } = useQuery(GET_MERCHANT_NET_PRICE);

  useEffect(() => {
    getProductPaginationAction(client, 1);
  }, [client, getProductPaginationAction]);

  const getNetPriceStatus = () => {
    const merchantSettings = _.get(merchantNetPrice, 'merchantSettings', null);
    if (merchantSettings === null) return false;
    return merchantSettings.products.net_price;
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {getOrdredProducts(productList, storeSettingData).map((item, nIndex) => {
            return (
              <Grid item lg={getIsShowSideCategory(storeSettingData) ? 4 : 3} md={6} xs={12} key={item.id}>
                <ProductCard productInfo={item} net_price={getNetPriceStatus()} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
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
export default withApollo(
  connect(null, {
    getProductPaginationAction,
  })(ProductList)
);
