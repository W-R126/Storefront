import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import SearchBar from './Components/SearchBar';
import CategorySideBar from './Components/CategorySideBar';
import ProductList from './Components/ProductList';
import { getIsShowSideCategory } from '../../../../utils/store';
import { updateProducdtPageDataAction } from '../../../../actions/productAction';

const ProductContainer = ({ storeLoading, updateProducdtPageDataAction }) => {
  const classes = useStyles();

  const { pageData, storeInfo } = useSelector((state) => ({
    pageData: state.productReducer.pageData,
    storeInfo: state.storeReducer.storeInfo,
  }));

  const showLoadMore = () => {
    if (!pageData) return false;
    if (pageData.current_page < 1 || pageData.total_pages <= 1 || pageData.current_page >= pageData.total_pages) {
      return false;
    }
    return true;
  };

  const handleClickLoadMore = () => {
    updateProducdtPageDataAction({
      ...pageData,
      current_page: pageData.current_page + 1,
    });
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.MainContent}>
        <Grid item md={12} xs={12} style={{ display: 'flex' }}>
          {getIsShowSideCategory(storeInfo) && (
            <Box className={classes.MobileCategoryWrapper}>
              <CategorySideBar />
            </Box>
          )}
          <SearchBar />
        </Grid>
        <Grid item md={12} xs={12} className={classes.ProductContent}>
          {getIsShowSideCategory(storeInfo) && (
            <Box className={classes.DesktopCateggoryWrapper}>
              <CategorySideBar />
            </Box>
          )}
          <ProductList />
        </Grid>
        {showLoadMore() && (
          <Grid item md={12} xs={12} className={classes.LoadMoreContainer}>
            <div className={classes.LoadMoreButton} onClick={handleClickLoadMore} role="button">
              Load More
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '25px 40px 30px 40px',
      '@media screen and (max-width: 768px)': {
        padding: 0,
      },
    },
    MainContent: {
      background: '#fff',
      border: '1px solid rgba(186, 195, 201, 0.5)',
      borderRadius: '3px',
      padding: '25px',
      '@media screen and (max-width: 768px)': {
        paddingLeft: '15px',
        paddingRight: '15px',
        border: 'none',
      },
    },
    ProductContent: {
      display: 'flex',
      marginTop: '42px',
    },
    LoadMoreContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    LoadMoreButton: {
      marginTop: '50px',
      height: '19px',
      color: theme.palette.primary.main,
      fontSize: '16px',
      fontWeight: 300,
      display: 'inline-block',
      cursor: 'pointer',
      '@media screen and (max-width: 25px)': {
        marginTop: '25px',
      },
    },
    DesktopCateggoryWrapper: {
      display: 'flex',
      boxSizing: 'border-box',
      flex: '0 0 238px',
      marginRight: '26px',
      '@media screen and (max-width: 768px)': {
        display: 'none',
      },
    },
    MobileCategoryWrapper: {
      display: 'none',
      boxSizing: 'border-box',
      '@media screen and (max-width: 768px)': {
        display: 'flex',
        flex: '0 0 200px',
        marginRight: '10px',
      },
      '@media screen and (max-width: 480px)': {
        flex: '0 0 108px',
      },
    },
  })
);
export default connect(null, { updateProducdtPageDataAction })(ProductContainer);
