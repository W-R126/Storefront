import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { withApollo } from '@apollo/react-hoc';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchBar from './Components/SearchBar';
import CategorySideBar from './Components/CategorySideBar';
import ProductList from './Components/ProductList';

import { getProductPaginationAction } from '../../../../actions/product';

const ProductContainer = ({ client, getProductPaginationAction }) => {
  const classes = useStyles();

  const { pageData } = useSelector((state) => ({
    pageData: state.productReducer.pageData,
  }));

  const showLoadMore = () => {
    if (!pageData) return false;
    if (pageData.current_page < 1 || pageData.total_pages <= 1 || pageData.current_page >= pageData.total_pages) {
      return false;
    }
    return true;
  };

  const handleClickLoadMore = () => {
    getProductPaginationAction(client, pageData.current_page + 1);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.MainContent}>
        <Grid item md={12}>
          <SearchBar />
        </Grid>
        <Grid item md={12} className={classes.ProductContent}>
          <CategorySideBar />
          <ProductList />
        </Grid>
        {showLoadMore() && (
          <Grid item md={12} className={classes.LoadMoreContainer}>
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
      padding: '25px 40px 202px 40px',
    },
    MainContent: {
      background: '#fff',
      border: '1px solid rgba(186, 195, 201, 0.5)',
      borderRadius: '3px',
      padding: '25px',
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
    },
  })
);
export default withApollo(connect(null, { getProductPaginationAction })(ProductContainer));
