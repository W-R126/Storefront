import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import OrderView from '../../../OrderView';
import { getCartTotalPrice } from '../../../../../../utils/product';
import { formatPrice } from '../../../../../../utils/string';
import { getCurrency } from '../../../../../../utils/store';

const CartButton = ({ wrapperClass, orderTypesList }) => {
  const classes = useStyles();

  const { storeInfo, cartList, orderType, netPrice } = useSelector((state) => ({
    storeInfo: state.storeReducer.storeInfo,
    orderType: state.storeReducer.orderType,
    cartList: state.cartReducer.cartList,
    netPrice: state.merchantReducer.netPrice,
  }));

  const [showOrderView, setShowOrderView] = useState(false);

  const checkCartButtonStatus = () => {
    const filteredCarts = cartList.filter((item) => item.id === orderType.id);
    if (filteredCarts.length > 0) return true;
    return false;
  };

  const renderPrice = () => {
    const filteredCart = cartList.filter((item) => item.orderType.id === orderType.id);
    if (filteredCart.length === 0) return null;
    const totalPrice = getCartTotalPrice(filteredCart, orderType, netPrice);

    return (
      <Typography className={classes.Price} variant="h2">
        <span style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: getCurrency(storeInfo) }}></span>
        {formatPrice(totalPrice, storeInfo)}
      </Typography>
    );
  };

  const getButtonClasses = () => {
    const filteredCart = cartList.filter((item) => item.orderType.id === orderType.id);
    if (filteredCart.length === 0) return false;
    const totalPrice = getCartTotalPrice(filteredCart, orderType, netPrice);
    if (totalPrice > 0) {
      return true;
    }
    return false;
  };

  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);

  return (
    <Box className={rootClasses.join(' ')}>
      <Button
        className={getButtonClasses() ? classes.MainButtonActive : classes.MainButton}
        onClick={() => {
          if (!getButtonClasses()) return;
          setShowOrderView(!showOrderView);
        }}
        variant={getButtonClasses() ? 'contained' : ''}
        color={getButtonClasses() ? 'primary' : ''}
      >
        <ShoppingCartOutlinedIcon className={getButtonClasses() ? classes.CartIconActive : classes.CartIcon} />
        {renderPrice()}
      </Button>
      {showOrderView && (
        <OrderView
          orderTypesList={orderTypesList}
          hideModal={() => {
            setShowOrderView(false);
          }}
        />
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      position: 'relative',
    },
    MainButton: {
      backgroundColor: theme.palette.primary.greyBack,
      borderRadius: '4px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '7px',
      paddingRight: '7px',
      minWidth: '40px',
      boxShadow: 'none',
      '& .MuiButton-label': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    MainButtonActive: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '4px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '7px',
      paddingRight: '7px',
      minWidth: '40px',
      boxShadow: 'none',
      '& .MuiButton-label': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    CartIcon: {
      width: '26px',
      height: '26px',
      color: theme.palette.primary.title,
    },
    CartIconActive: {
      width: '26px',
      height: '26px',
      color: 'white',
    },
    Price: {
      marginLeft: '7px',
      fontSize: '20px',
      fontWeight: 'normal',
      display: 'flex',
      whiteSpace: 'nowrap',
      flexWrap: 'nowrap',
      color: 'white',
      '@media screen and (max-width: 500px)': {
        display: 'none',
      },
    },
  })
);
export default CartButton;
