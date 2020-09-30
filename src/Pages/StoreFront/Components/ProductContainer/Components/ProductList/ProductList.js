import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { withApollo } from '@apollo/react-hoc';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import ProductCard from '../ProductCard';
import { getIsShowSideCategory } from '../../../../../../utils/store';
import { getOrdredProducts } from '../../../../../../utils/product';
import { getProductPaginationAction } from '../../../../../../actions/productAction';
import { getMerchantId, getStoreId } from '../../../../../../constants';

const ProductList = ({ client, getProductPaginationAction }) => {
  const {
    productList,
    orderType,
    filter,
    pageData,
    productLoading,
    storeInfo,
    storeLoading,
    netPriceLoading,
  } = useSelector((state) => ({
    productList: state.productReducer.productList,
    orderType: state.storeReducer.orderType,
    filter: state.productReducer.filter,
    pageData: state.productReducer.pageData,
    productLoading: state.productReducer.loading,
    storeInfo: state.storeReducer.storeInfo,
    storeLoading: state.storeReducer.storeLoading,
    netPriceLoading: state.merchantReducer.merchantLoading,
  }));

  const storeId = getStoreId();
  const merchantId = getMerchantId();

  useEffect(() => {
    if (storeId && merchantId) getProductPaginationAction(client, filter, pageData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pageData.current_page, storeId, merchantId]);

  const renderLoadingCards = () => {
    const renderCards = [];
    for (let i = 0; i < 9; i++) {
      renderCards.push(
        <CardGrid item key={i} isSidebar={getIsShowSideCategory(storeInfo)}>
          <ProductCard productInfo={undefined} orderType={orderType} loading={true} />
        </CardGrid>
      );
    }
    return renderCards;
  };

  // const getGroupedCategory = () => {
  //   const orderedProducts = getOrdredProducts(productList, storeSettingData);
  //   if (filter.category === 'all') {
  //     if (!getIsShowSideCategory(storeSettingData)) return orderedProducts;
  //     const orderedCategory = getOrderedCategories(categoryList, storeSettingData);
  //     if (orderedCategory.length === 0) return orderedProducts;
  //     let groupProducts = [];
  //     orderedCategory.forEach((item) => {
  //       const filteredProduct = orderedProducts.filter((itemOne) => itemOne.category.id === item.id);
  //       groupProducts = [...groupProducts, ...filteredProduct];
  //     });
  //     return groupProducts;
  //   } else {
  //     return orderedProducts;
  //   }
  // };

  if (storeLoading) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {renderLoadingCards()}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {(productLoading || netPriceLoading) && pageData.total_pages === 0 ? (
            <>{renderLoadingCards()}</>
          ) : (
            <>
              {getOrdredProducts(productList, storeInfo).map((item, nIndex) => {
                return (
                  <CardGrid item key={nIndex} isSidebar={getIsShowSideCategory(storeInfo)}>
                    <ProductCard productInfo={item} orderType={orderType} loading={false} />
                  </CardGrid>
                );
              })}
            </>
          )}
          {productLoading &&
            pageData.total_pages > 1 &&
            pageData.current_page < pageData.total_pages &&
            renderLoadingCards()}
        </Grid>
      </Grid>
    </Grid>
  );
};

const CardGrid = styled(Grid)`
  ${(props) => {
    if (props.isSidebar) {
      return 'max-width: 100%; flex-basis: 100%; @media screen and (min-width: 1100px) {max-width: 50%; flex-basis: 50%}; @media screen and (min-width: 1440px) {max-width: 33.33%; flex-basis: 33.33%}; @media screen and (min-width: 1900px) {max-width: 25%; flex-basis: 25%};';
    } else {
      return 'max-width: 100%; flex-basis: 100%; @media screen and (min-width: 768px) {max-width: 50%; flex-basis: 50%}; @media screen and (min-width: 1100px) {max-width: 33.33%; flex-basis: 33.33%}; @media screen and (min-width: 1600px) {max-width: 25%; flex-basis: 25%};';
    }
  }}
`;

export default withApollo(
  connect(null, {
    getProductPaginationAction,
  })(ProductList)
);
