import React from 'react';
import { connect, useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import CartAddItemButton from '../../../../../../SharedComponents/CartAddItemButton';
import OrderAddonItem from '../OrderAddonItem';
import { updateProductCartAction } from '../../../../../../actions/cartAction';
import { formatPrice } from '../../../../../../utils/string';
import { getAddOnGroupPrice } from '../../../../../../utils/product';

const OrderItem = ({ wrapperClass, orderInfo, net_price, updateProductCartAction }) => {
  const classes = useStyles();
  const { storeInfo } = useSelector((state) => ({
    storeInfo: state.storeReducer.storeInfo,
  }));

  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);

  const renderPrice = () => {
    const priceInfo = orderInfo.priceInfo;
    const addonsCartPrice = getAddOnGroupPrice(orderInfo.addons, net_price);

    if (!priceInfo) return '';
    if (net_price) {
      const netPriceNames = priceInfo.taxes.filter((item) => item.rate > 0).map((taxItem) => taxItem.name);
      const netPriceStr = netPriceNames.join(', ');

      return (
        <Typography className={classes.ProductPrice} variant="h2">
          {formatPrice((priceInfo.price + addonsCartPrice) * orderInfo.qty, storeInfo)}
          {netPriceNames.length > 0 && <span>+{netPriceStr}</span>}
        </Typography>
      );
    } else {
      let priceValue = priceInfo.price;
      let rateValue = 0;
      priceInfo.taxes.forEach((item) => {
        if (item.rate > 0) rateValue += item.rate;
      });
      priceValue += priceValue * (rateValue / 100) + addonsCartPrice;
      return (
        <Typography className={classes.ProductPrice} variant="h2">
          {formatPrice(priceValue * orderInfo.qty, storeInfo)}
        </Typography>
      );
    }
  };

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
      {renderPrice()}
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
      '@media screen and (max-width: 550px)': {
        width: '65px',
      },
    },
    QtyCount: {
      flex: '1 1 100%',
      textAlign: 'center',
      color: theme.palette.primary.text,
      '@media screen and (max-width: 550px)': {
        fontSize: '16px',
        lineHeight: '20px',
      },
    },
    ProdcutCartButton: {
      width: '30px',
      height: '30px',
      flex: '0 0 30px',
      '@media screen and (max-width: 550px)': {
        width: '20px',
        height: '20px',
        flex: '0 0 20px',
      },
    },
    ProductContent: {
      flex: '1 1 250px',
      maxWidth: '250px',
      marginLeft: '50px',
      '@media screen and (max-width: 550px)': {
        flex: '1 1 208px',
        maxWidth: '208px',
        marginLeft: '20px',
      },
    },
    ProductName: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: '30px',
      '@media screen and (max-width: 550px)': {
        fontSize: '15px',
        lineHeight: '19px',
      },
    },
    ProductPrice: {
      display: 'flex',
      marginLeft: 'auto',
      lineHeight: '30px',
      whiteSpace: 'nowrap',
      '@media screen and (max-width: 550px)': {
        fontSize: '15px',
        lineHeight: '19px',
      },
    },
  })
);

export default connect(null, { updateProductCartAction })(OrderItem);
