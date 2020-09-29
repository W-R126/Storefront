import React from 'react';
import { connect } from 'react-redux';

import { useQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import CartAddItemButton from '../../../../../../SharedComponents/CartAddItemButton';
import OrderAddonItem from '../OrderAddonItem';
import { updateProductCartAction } from '../../../../../../actions/cartAction';
import { formatPrice } from '../../../../../../utils/string';
import { GET_CURRENCY } from '../../../../../../graphql/localisation/localisation-query';

const OrderItem = ({ wrapperClass, orderInfo, updateProductCartAction }) => {
  debugger;
  const classes = useStyles();
  const { data: currencyData } = useQuery(GET_CURRENCY);

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
        {orderInfo.addons.map((item, nIndex) => {
          return item.addons.map((itemAddon, nIndex1) => {
            return (
              <OrderAddonItem
                key={`${nIndex}-${nIndex1}`}
                cartInfo={orderInfo}
                groupInfo={item}
                itemCartInfo={itemAddon}
              />
            );
          });
        })}
      </Box>
      <Typography className={classes.ProductPrice} variant="h2">
        {formatPrice(orderInfo.price * orderInfo.qty, currencyData)}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'flex-start',
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
      lineHeight: '30px',
    },
    ProductPrice: {
      marginLeft: 'auto',
      lineHeight: '30px',
    },
  })
);

export default connect(null, { updateProductCartAction })(OrderItem);
