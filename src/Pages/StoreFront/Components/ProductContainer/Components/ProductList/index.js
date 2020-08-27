import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../ProductCard';

const ProductList = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item md={4}>
        <ProductCard />
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
export default ProductList;
