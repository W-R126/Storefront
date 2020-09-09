import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import _ from 'lodash';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import ProductView from '../../../ProductView';
import { getCurrency } from '../../../../../../utils/store';
import { getProductCart, getProductPriceInfo } from '../../../../../../utils/product';
import { GET_CURRENCY } from '../../../../../../graphql/localisation/localisation-query';
import { formatPrice } from '../../../../../../utils/string';
import * as types from '../../../../../../actions/actionTypes';

const ProductCard = ({ productInfo, net_price }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showProductView, setShowProductView] = useState(false);

  const { data: currencyData } = useQuery(GET_CURRENCY);

  const { cartInfo, orderType } = useSelector((state) => ({
    cartInfo: state.cartReducer.cartList,
    orderType: state.storeReducer.orderType,
  }));

  const getProductImage = () => {
    const imgArr = _.get(productInfo, 'images', []);
    if (imgArr.length === 0) return '';
    else return imgArr[0].url;
  };

  const renderPriceInfo = () => {
    const priceInfo = getProductPriceInfo(productInfo, orderType, net_price);
    if (!priceInfo) return '';

    if (net_price) {
      const netPriceNames = priceInfo.taxes.map((taxItem) => taxItem.name);
      const netPriceStr = netPriceNames.join(', ');

      return (
        <div className={classes.Price}>
          {getCurrency(currencyData)} {formatPrice(priceInfo.price, currencyData)}
          {netPriceNames.length > 0 && <span>+{netPriceStr}</span>}
        </div>
      );
    } else {
      let priceValue = priceInfo.price;
      priceInfo.taxes.forEach((item) => {
        priceValue += item.rate;
      });
      return (
        <div className={classes.Price}>
          {getCurrency(currencyData)} {formatPrice(priceValue, currencyData)}
        </div>
      );
    }
  };

  const getCartCount = () => {
    const productCart = getProductCart(cartInfo, productInfo.id);
    return _.get(productCart, 'qty', 0);
  };

  const updateCarts = (addNumber) => {
    if (addNumber === 1 && _.get(getProductCart(cartInfo, productInfo.id), 'id', -1) === -1) {
      // dispatch({
      //   type: types.UPDATE_PRODUCT_CART,
      //   payload: [...cartInfo, { id: productInfo.id, qty: 1, price: getPriceInfo() }],
      // });
      console.log('click update carts');
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

  const getStock = () => {
    const stocks = _.get(productInfo, 'stocks', []);
    if (stocks.length === 0) return 0;
    return stocks[0].current_stock;
  };

  return (
    <div className={classes.root}>
      <div className={classes.ProductImg} style={{ backgroundImage: `url(${getProductImage()})` }}>
        <div className={classes.ProductLabel}>
          {productInfo.measure_amount} {productInfo.measure_type}
        </div>
      </div>
      <div className={classes.ProductContent}>
        <div className={classes.TopSection}>
          <div className={classes.LeftInfo}>
            <div className={classes.Title}>{productInfo.name}</div>
            <div className={classes.Status}>Code: {productInfo.bar_code}</div>
          </div>
          <div className={classes.Value}>
            {renderPriceInfo()}
            <div className={classes.Stock}>{`${getStock()} in stock`}</div>
          </div>
        </div>
        <div className={classes.Description}>{productInfo.short_description}</div>
        <div className={classes.Bottom}>
          {getCartCount() === 0 ? (
            <div className={classes.AddCart} onClick={() => setShowProductView(true)} role="button">
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
      {showProductView && (
        <ProductView
          open={showProductView}
          hideModal={() => setShowProductView(false)}
          // productId={productInfo.id}
          productId={'023af2b9-4206-4995-9cf9-9a956e220d37'}
          currencyData={currencyData}
          net_price={net_price}
        />
      )}
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
      color: theme.palette.primary.text,
    },
    ProductImg: {
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
      flex: '0 0 90px',
      display: 'flex',
      flexDirection: 'column',
      backgroundRepeat: 'no-repeat',
    },
    ProductLabel: {
      marginTop: 'auto',
      width: '100%',
      height: '25px',
      backgroundColor: 'rgba(1, 86, 184, 0.77)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 300,
      fontSize: '13px',
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
      fontWeight: 'normal',
      lineHeight: '20px',
      marginBottom: '4px',
      fontSize: '14px',
    },
    Status: {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 300,
    },
    Value: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginLeft: '15px',
      lineHeight: '18px',
      fontSize: '12px',
    },
    Price: {
      fontWeight: 'normal',
      lineHeight: '18px',
      fontSize: '14px',
      paddingTop: '2px',
      '& span': {
        fontSize: '12px',
        fontWeight: 300,
        marginLeft: '3px',
      },
    },
    Stock: {
      fontSize: '13px',
      fontWeight: 300,
      lineHeight: '18px',
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
