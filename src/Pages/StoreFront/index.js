import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Header from '../../SharedComponents/Header';
import StoreInfo from './Components/StoreInfo';
import TopBannerImg from '../../assets/img/topbanner.jpg';
import ProductContainer from './Components/ProductContainer';
import Footer from '../../SharedComponents/Footer';

const StoreFrontPage = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.TopBanner} style={{ backgroundImage: `url(${TopBannerImg})` }}></div>
      <StoreInfo />
      <ProductContainer />
      <Footer />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TopBanner: {
      width: '100%',
      height: '398px',
      backgroundSize: 'cover',
      marginTop: '80px',
      overflow: 'hidden',
    },
  })
);
export default StoreFrontPage;
