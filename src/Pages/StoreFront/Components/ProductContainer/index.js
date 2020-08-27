import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchBar from './Components/SearchBar';
import CategorySideBar from './Components/CategorySideBar';
import ProductList from './Components/ProductList';

const ProductContainer = () => {
  const classes = useStyles();

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
  })
);

export default ProductContainer;
