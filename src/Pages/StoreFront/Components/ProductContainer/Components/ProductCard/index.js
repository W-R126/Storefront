import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import _ from 'lodash';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { getCurrency } from '../../../../../../utils/store';
import { getProductCart } from '../../../../../../utils/product';
import * as types from '../../../../../../actions/actionTypes';
import { GET_CURRENCY } from '../../../../../../graphql/localisation/localisation-query';
import { formatPrice } from '../../../../../../utils/string';

const ProductCard = ({ productInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data: currencyData } = useQuery(GET_CURRENCY);

  const { cartInfo } = useSelector((state) => ({
    cartInfo: state.cartReducer.cartList,
  }));

  const getProductImage = () => {
    const imgArr = _.get(productInfo, 'images', []);
    if (imgArr.length === 0) return '';
    else return imgArr[0];
  };

  const getPriceInfo = () => {
    let price = 0;
    const prices = _.get(productInfo, 'prices', []);
    if (prices.length === 0) price = 0;
    const priceInfos = _.get(prices[0], 'price_infos', []);
    if (priceInfos.length === 0) price = 0;
    price = _.get(priceInfos[0], 'price', 0);
    return formatPrice(price, currencyData);
  };

  const getCartCount = () => {
    const productCart = getProductCart(cartInfo, productInfo.id);
    return _.get(productCart, 'qty', 0);
  };

  const updateCarts = (addNumber) => {
    if (addNumber === 1 && _.get(getProductCart(cartInfo, productInfo.id), 'id', -1) === -1) {
      dispatch({
        type: types.UPDATE_PRODUCT_CART,
        payload: [...cartInfo, { id: productInfo.id, qty: 1, price: getPriceInfo() }],
      });
    } else {
      const cartList = [];
      cartInfo.forEach((item) => {
        if (item.id === productInfo.id) {
          const qtyCount = item.qty + addNumber;
          if (qtyCount > 0)
            cartList.push({
              ...item,
              qty: qtyCount,
            });
        } else {
          cartList.push(item);
        }
      });
      dispatch({
        type: types.UPDATE_PRODUCT_CART,
        payload: cartList,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.ProductImg} style={{ backgroundImage: `url(${getProductImage()})` }}></div>
      <div className={classes.ProductContent}>
        <div className={classes.TopSection}>
          <div className={classes.LeftInfo}>
            <div className={classes.Title}>{productInfo.name}</div>
            <div className={classes.Status}>Code: ${productInfo.bar_code}</div>
          </div>
          <div className={classes.Value}>
            <div className={classes.Price}>
              {getCurrency(currencyData)} {getPriceInfo()}
            </div>
            {/* <div className={classes.Stock}>10 in stock</div> */}
          </div>
        </div>
        <div className={classes.Description}>{productInfo.short_description}</div>
        <div className={classes.Bottom}>
          {getCartCount() === 0 ? (
            <div className={classes.AddCart} onClick={() => updateCarts(1)} role="button">
              Add to cart
            </div>
          ) : (
            <div className={classes.ProductCount}>
              <div className={classes.CircleButton} onClick={() => updateCarts(-1)} role="button">
                <RemoveIcon />
              </div>
              <div className={classes.CountValue}>{getCartCount()}</div>
              <div className={classes.CircleButton} onClick={() => updateCarts(1)} role="button">
                <AddIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: '5px',
      boxSizing: 'border-box',
      height: '129px',
      boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.05)',
      border: 'solid 0.5px rgba(186, 195, 201, 0.5)',
    },
    ProductImg: {
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
      flex: '0 0 90px',
    },
    ProductContent: {
      flex: '1 1 100%',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '10px',
      paddingRight: '17px',
      paddingBottom: '12px',
    },
    TopSection: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    LeftInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    Title: {
      fontWeight: 500,
      lineHeight: '20px',
      marginBottom: '4px',
      fontSize: '14px',
    },
    Status: {
      fontSize: '12px',
      lineHeight: '18px',
    },
    Value: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginLeft: '15px',
      lineHeight: '18px',
      fontSize: '12px',
    },
    Price: {
      fontWeight: 500,
      lineHeight: '18px',
      fontSize: '12px',
    },
    Description: {
      fontSize: '12px',
      fontWeight: 300,
      lineHeight: '18px',
      margin: '5px 0 0 0',
    },
    Bottom: {
      display: 'flex',
      marginTop: 'auto',
    },
    AddCart: {
      margin: '3px 0 0 auto',
      color: theme.palette.primary.main,
      fontSize: '12px',
      cursor: 'pointer',
      lineHeight: 'normal',
    },
    ProductCount: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        width: '15px',
      },
    },
    CircleButton: {
      display: 'flex',
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      borderRadius: '10px',
      backgroundColor: '#41474e',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
    },
    CountValue: {
      fontSize: '20px',
      textAlign: 'center',
      width: '30px',
    },
  })
);

export default ProductCard;
