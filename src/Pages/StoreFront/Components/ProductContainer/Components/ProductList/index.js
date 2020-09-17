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
import { GET_CURRENCY } from '../../../../../../graphql/localisation/localisation-query';
import { GET_CATEGORIES } from '../../../../../../graphql/categories/categories-query';

import { getIsShowSideCategory } from '../../../../../../utils/store';
import { getOrdredProducts } from '../../../../../../utils/product';
import { getOrderedCategories } from '../../../../../../utils/category';
import { getProductPaginationAction } from '../../../../../../actions/productAction';

const ProductList = ({ client, getProductPaginationAction, loading }) => {
  const classes = useStyles();
  const { productList, cartInfo, orderType, filter, pageData, productLoading } = useSelector((state) => ({
    productList: state.productReducer.productList,
    cartInfo: state.cartReducer.cartList,
    orderType: state.storeReducer.orderType,
    filter: state.productReducer.filter,
    pageData: state.productReducer.pageData,
    productLoading: state.productReducer.loading,
  }));

  const { loading: storeSettingLoading, error: storeSettingError, data: storeSettingData } = useQuery(
    GET_STORE_SETTING_PRODUCT
  );
  const { data: merchantNetPrice } = useQuery(GET_MERCHANT_NET_PRICE);
  const { data: currencyData } = useQuery(GET_CURRENCY);
  const { data: categoryList, loading: categoryLoading, error } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    getProductPaginationAction(client, filter, pageData);
  }, [filter, pageData.current_page]);

  const getNetPriceStatus = () => {
    const merchantSettings = _.get(merchantNetPrice, 'merchantSettings', null);
    if (merchantSettings === null) return false;
    return merchantSettings.products.net_price;
  };

  const renderLoadingCards = () => {
    const renderCards = [];
    const limitValue = 4;
    // const limitValue = getIsShowSideCategory(storeSettingData) ? 4 : 3;
    for (let i = 0; i < 9; i++) {
      renderCards.push(
        <Grid item lg={limitValue} md={6} xs={12} key={i}>
          <ProductCard
            productInfo={undefined}
            currencyData={currencyData}
            net_price={getNetPriceStatus()}
            cartInfo={cartInfo}
            orderType={orderType}
            loading={true}
          />
        </Grid>
      );
    }
    return renderCards;
  };

  const getGroupedCategory = () => {
    const orderedProducts = getOrdredProducts(productList, storeSettingData);
    if (filter.category === 'all') {
      if (!getIsShowSideCategory(storeSettingData)) return orderedProducts;
      const orderedCategory = getOrderedCategories(categoryList, storeSettingData);
      if (orderedCategory.length === 0) return orderedProducts;
      let groupProducts = [];
      orderedCategory.forEach((item) => {
        const filteredProduct = orderedProducts.filter((itemOne) => itemOne.category.id === item.id);
        groupProducts = [...groupProducts, ...filteredProduct];
      });
      return groupProducts;
    } else {
      return orderedProducts;
    }
  };

  return (
    <Grid container className={classes.root} style={{}}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {productLoading && pageData.total_pages === 0 && renderLoadingCards()}
          {getGroupedCategory().map((item, nIndex) => {
            return (
              <Grid item lg={getIsShowSideCategory(storeSettingData) ? 4 : 3} md={6} xs={12} key={nIndex}>
                <ProductCard
                  productInfo={item}
                  currencyData={currencyData}
                  net_price={getNetPriceStatus()}
                  cartInfo={cartInfo}
                  orderType={orderType}
                  loading={false}
                />
              </Grid>
            );
          })}
          {productLoading &&
            pageData.total_pages > 1 &&
            pageData.current_page < pageData.total_pages &&
            renderLoadingCards()}
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);
export default withApollo(
  connect(null, {
    getProductPaginationAction,
  })(ProductList)
);
