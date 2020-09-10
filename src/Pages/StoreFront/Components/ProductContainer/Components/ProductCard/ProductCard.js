import React, { useState } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Skeleton from '@material-ui/lab/Skeleton';

import ProductView from '../../../ProductView';
import { getCurrency } from '../../../../../../utils/store';
import { getProductCart, getProductPriceInfo, getProductTotalAmount } from '../../../../../../utils/product';
import { formatPrice } from '../../../../../../utils/string';
import { updateProductCartAction, addProductCartAction } from '../../../../../../actions/cartAction';

import ProductPlaceHolderImg from '../../../../../../assets/img/product-card-placeholder.png';

const ProductCard = ({
  productInfo,
  currencyData,
  net_price,
  cartInfo,
  orderType,
  updateProductCartAction,
  addProductCartAction,
  loading,
}) => {
  const classes = useStyles();

  const [showProductView, setShowProductView] = useState(false);

  const getProductImage = () => {
    const imgArr = _.get(productInfo, 'images', []);
    if (imgArr.length === 0) return ProductPlaceHolderImg;
    else return imgArr[0].thumbnail || ProductPlaceHolderImg;
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
    const productCart = getProductCart(cartInfo, productInfo.id, orderType);
    return _.get(productCart, 'qty', 0);
  };

  const updateCarts = (addNumber) => {
    updateProductCartAction({
      ...getProductCart(cartInfo, productInfo.id, orderType),
      qty: getCartCount().qty + addNumber,
    });
  };

  const getStock = () => {
    const stocks = _.get(productInfo, 'stocks', []);
    if (stocks.length === 0) return 0;
    return stocks[0].current_stock;
  };

  const renderBottom = () => {
    if (loading) return null;

    if (getCartCount() === 0)
      return (
        <div className={classes.AddCart} onClick={() => setShowProductView(true)} role="button">
          Add to cart
        </div>
      );
    else
      return (
        <div className={classes.ProductCount}>
          <div className={classes.CircleButton} onClick={() => updateCarts(-1)} role="button">
            <RemoveIcon />
          </div>
          <div className={classes.CountValue}>{getCartCount()}</div>
          <div
            className={classes.CircleButton}
            onClick={() => {
              addProductCartAction({
                productId: productInfo.id,
                name: productInfo.name,
                qty: 1,
                price: getProductTotalAmount(productInfo, orderType, net_price),
                orderType: _.get(orderType, 'name', ''),
              });
            }}
            role="button"
          >
            <AddIcon />
          </div>
        </div>
      );
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <Skeleton className={classes.SkelotonProductImg} />
      ) : (
        <div className={classes.ProductImg} style={{ backgroundImage: `url(${getProductImage()})` }}>
          {productInfo.measure_type !== null &&
            productInfo.measure_amount !== null &&
            productInfo.measure_type !== 'qty' && (
              <div className={classes.ProductLabel}>
                {productInfo.measure_amount} {productInfo.measure_type}
              </div>
            )}
        </div>
      )}
      <div className={classes.ProductContent}>
        <div className={classes.TopSection}>
          <div className={classes.LeftInfo}>
            {loading ? (
              <Skeleton className={classes.SkeletonTitle} animation="pulse" />
            ) : (
              <div className={classes.Title}>{productInfo.name}</div>
            )}
            {loading ? (
              <Skeleton className={classes.SkeltonStatus} />
            ) : (
              <div className={classes.Status}>Code: {productInfo.bar_code}</div>
            )}
          </div>
          <div className={classes.Value}>
            {loading ? <Skeleton className={classes.SkeltonStatus} /> : renderPriceInfo()}
            {/* <div className={classes.Stock}>{`${getStock()} in stock`}</div> */}
          </div>
        </div>
        <div className={classes.Description}>{productInfo.short_description}</div>
        <div className={classes.Bottom}>{renderBottom()}</div>
      </div>
      {showProductView && (
        <ProductView
          open={showProductView}
          hideModal={() => setShowProductView(false)}
          productId={productInfo.id}
          // productId={'023af2b9-4206-4995-9cf9-9a956e220d37'}
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
      flex: '0 0 95px',
      display: 'flex',
      flexDirection: 'column',
      backgroundRepeat: 'no-repeat',
      border: 'solid 1px #f3f5f7',
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
      minWidth: '100px',
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
    SkelotonProductImg: {
      flex: '0 0 95px',
      height: '100%',
      transform: 'scale(1, 1)',
    },
    SkeletonTitle: {
      width: '100px',
    },
    SkeltonStatus: {
      width: '60px',
    },
  })
);

export default connect(null, { addProductCartAction, updateProductCartAction })(ProductCard);
