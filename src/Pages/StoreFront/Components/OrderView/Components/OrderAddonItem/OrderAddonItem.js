import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import { useQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import CartAddItemButton from '../../../../../../SharedComponents/CartAddItemButton';
import { formatPrice } from '../../../../../../utils/string';
import { GET_CURRENCY } from '../../../../../../graphql/localisation/localisation-query';
import { updateProductCartAction } from '../../../../../../actions/cartAction';

const OrderAddonItem = ({ cartInfo, groupInfo, itemCartInfo, updateProductCartAction }) => {
  const classes = useStyles();
  const { data: currencyData } = useQuery(GET_CURRENCY);

  const { cartList } = useSelector((state) => ({
    cartList: state.cartReducer.cartList,
  }));

  const changeQty = (addNumber) => {
    const newQty = itemCartInfo.qty + addNumber;
    let groupInfoTemp;
    if (newQty === 0) {
      groupInfoTemp = {
        ...groupInfoTemp,
        addons: [...groupInfo.addons.filter((item) => item.id !== itemCartInfo.id)],
      };
    } else {
      groupInfoTemp = {
        ...groupInfo,
        addons: [
          ...groupInfo.addons.map((item) => {
            if (item.id === itemCartInfo.id)
              return {
                ...item,
                qty: newQty,
              };
            return item;
          }),
        ],
      };
    }

    let productAddons;

    if (groupInfoTemp.addons.length === 0) {
      productAddons = [...cartInfo.addons.filter((item) => item.id !== groupInfoTemp.id)];
    } else {
      productAddons = [
        ...cartInfo.addons.map((item) => {
          if (item.id === groupInfoTemp.id) return groupInfoTemp;
          return item;
        }),
      ];
    }

    updateProductCartAction({
      ...cartInfo,
      addons: productAddons,
    });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.ControlBox}>
        <CartAddItemButton
          type="minus"
          onClick={() => {
            changeQty(-1);
          }}
        />
        <Typography className={classes.Count} variant="h3">
          {itemCartInfo.qty}
        </Typography>
        <CartAddItemButton
          type="plus"
          onClick={() => {
            changeQty(1);
          }}
        />
      </Box>
      <Typography className={classes.ItemName} variant="h3">
        {itemCartInfo.name}
      </Typography>
      <Typography className={classes.Price} variant="h3">
        {formatPrice(itemCartInfo.fixed_price, currencyData)}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: '17px 0 0 0',
    },
    ControlBox: {
      flex: '0 0 65px',
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: '20px',
    },
    Count: {
      fontSize: '15px',
      color: theme.palette.primary.text,
      flex: '1 1 100%',
      textAlign: 'center',
    },
    ItemName: {
      flex: '1 1 150px',
      textAlign: 'left',
      color: theme.palette.primary.text,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    Price: {
      margin: '0 0 0 8px',
      flex: '1 0 auto',
      textAlign: 'right',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'flex',
      flexWrap: 'nowrap',
    },
  })
);

export default connect(null, { updateProductCartAction })(OrderAddonItem);
