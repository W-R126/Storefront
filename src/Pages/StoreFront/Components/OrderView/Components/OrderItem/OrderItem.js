import React from 'react';
import { connect } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import CartAddItemButton from '../../../../../../SharedComponents/CartAddItemButton';
import { updateProductCartAction } from '../../../../../../actions/cartAction';

const OrderItem = ({ wrapperClass, orderInfo, updateProductCartAction }) => {
  const classes = useStyles();

  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);

  return (
    <Box className={classes.root}>
      <Box className={classes.ControlBox}>
        <CartAddItemButton
          type="minus"
          onClick={() => {
            updateProductCartAction({
              ...orderInfo,
              qty: orderInfo.qty - 1,
            });
          }}
          wrapperClass={classes.ProdcutCartButton}
        />
        <Typography variant="h1">{orderInfo.qty}</Typography>
        <CartAddItemButton
          type="plus"
          onClick={() => {
            updateProductCartAction({
              ...orderInfo,
              qty: orderInfo.qty + 1,
            });
          }}
          wrapperClass={classes.ProdcutCartButton}
        />
      </Box>
      <Box className={classes.ProductContent}>
        <Typography className={classes.ProductName} variant="h2">
          {orderInfo.name}
        </Typography>
      </Box>
      <Typography className={classes.ProductPrice} variant="h2">
        {orderInfo.price}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 0 30px 0',
      width: '100%',
      '&  h1': {
        color: theme.palette.primary.text,
      },
      '& h2': {
        color: theme.palette.primary.text,
      },
    },
    ControlBox: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '104px',
    },
    QtyCount: {
      flex: '1 1 100%',
      textAlign: 'center',
      color: theme.palette.primary.text,
    },
    ProdcutCartButton: {
      width: '30px',
      height: '30px',
      flex: '0 0 30px',
    },
    ProductContent: {
      flex: '1 1 250px',
      maxWidth: '250px',
      marginLeft: '50px',
    },
    ProductName: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    ProductPrice: {
      marginLeft: 'auto',
    },
  })
);

export default connect(null, { updateProductCartAction })(OrderItem);
