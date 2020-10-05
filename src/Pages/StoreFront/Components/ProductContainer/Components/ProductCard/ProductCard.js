import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import ProductCardSkeleton from './ProductCard.skeleton';
import ProductView from '../../../ProductView';
import AddOnView from '../../../AddOnView';
import CartAddItemButton from '../../../../../../SharedComponents/CartAddItemButton';
import { getCurrency } from '../../../../../../utils/store';
import {
  getAddOnCartPrice,
  getProductCart,
  getProductPriceInfo,
  getProductTotalAmount,
} from '../../../../../../utils/product';
import { formatPrice } from '../../../../../../utils/string';
import { updateProductCartAction } from '../../../../../../actions/cartAction';

import ProductPlaceHolderImg from '../../../../../../assets/img/product-card-placeholder.png';
import { getMeasureTypStr } from '../../../../../../utils/product';
import { MODAL_STATUS } from '../../../../../../constants';
import { SET_CUR_MODAL } from '../../../../../../actions/actionTypes';

const ProductCard = ({ productInfo, orderType, updateProductCartAction, loading }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { storeInfo, cartInfo, netPrice, curModal } = useSelector((state) => ({
    storeInfo: state.storeReducer.storeInfo,
    cartInfo: state.cartReducer.cartList,
    netPrice: state.merchantReducer.netPrice,
    curModal: state.modalStatusReducer.curModal,
  }));

  const [isNewProductCart, setIsNewProductCart] = useState(false);
  const [showProductView, setShowProductView] = useState(false);
  const [showAddOnView, setShowAddOnView] = useState(false);
  const [tempProductCart, setTempProductCart] = useState();

  const getProductImage = () => {
    const imgArr = _.get(productInfo, 'images', []);
    if (imgArr.length === 0) return ProductPlaceHolderImg;
    else return imgArr[0].thumbnail || ProductPlaceHolderImg;
  };

  const renderPriceInfo = () => {
    const priceInfo = getProductPriceInfo(productInfo, orderType, netPrice);
    const addonsCartPrice = getAddOnCartPrice(getAddOns(), orderType);
    if (!priceInfo) return '';

    if (netPrice) {
      const netPriceNames = priceInfo.taxes.filter((item) => item.rate > 0).map((taxItem) => taxItem.name);
      const netPriceStr = netPriceNames.join(', ');

      return (
        <div className={classes.Price}>
          <div style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: getCurrency(storeInfo) }}></div>
          {formatPrice(priceInfo.price + addonsCartPrice, storeInfo)}
          {netPriceNames.length > 0 && <span>+{netPriceStr}</span>}
        </div>
      );
    } else {
      let priceValue = priceInfo.price;
      let rateValue = 0;
      priceInfo.taxes.forEach((item) => {
        if (item.rate > 0) rateValue += item.rate;
      });
      priceValue += priceValue * (rateValue / 100) + addonsCartPrice;
      return (
        <div className={classes.Price}>
          <div style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: getCurrency(storeInfo) }}></div>
          {formatPrice(priceValue, storeInfo)}
        </div>
      );
    }
  };

  const getCartCount = () => {
    const productCart = getProductCart(cartInfo, productInfo.id, orderType);
    if (productCart.length > 0) return productCart[productCart.length - 1].qty;
    return 0;
  };

  const updateCarts = (addNumber) => {
    const productCart = getProductCart(cartInfo, productInfo.id, orderType);
    updateProductCartAction({
      ...productCart[productCart.length - 1],
      qty: getCartCount() + addNumber,
    });
  };

  const getAddOns = (product) => {
    if (!product) return [];
    const addons = _.get(product, 'addons', []);
    if (addons && addons.length > 0) {
      const filterAddons = [];
      addons.forEach((item) => {
        const { options } = item;
        const optionsTemp = options.map((item) => {
          if (item.default) return { ...item, qty: 1 };
          else return item;
        });
        let itemTemp = { ...item };
        delete itemTemp.options;
        filterAddons.push({
          ...item,
          addons: [...optionsTemp],
        });
      });
      return filterAddons;
    } else return [];
  };

  const handleClickAddCart = () => {
    dispatch({
      type: SET_CUR_MODAL,
      payload: MODAL_STATUS.NONE,
    });

    const productAddonCart = getAddOns();
    const productTemp = { ...productInfo };
    delete productTemp.id;
    delete productTemp.addons;
    delete productTemp.prices;
    setIsNewProductCart(true);
    setTempProductCart({
      ...productInfo,
      id: uuidv4(),
      productId: productInfo.id,
      priceInfo: getProductPriceInfo(productInfo, orderType),
      qty: 1,
      orderType: orderType,
      addons: [...productAddonCart],
    });
    setShowAddOnView(true);
  };

  const getStock = () => {
    const stocks = _.get(productInfo, 'stocks', []);
    if (stocks.length === 0) return 0;
    return stocks[0].current_stock;
  };

  const getAddOnPossible = () => {
    const addOns = _.get(productInfo, 'addons', []);
    if (addOns.length > 0) return true;
    return false;
  };

  const getAddonViewProductCart = () => {
    if (isNewProductCart) return tempProductCart;
    else {
      const productCart = getProductCart(cartInfo, productInfo.id, orderType);
      return productCart[productCart.length - 1];
    }
  };

  const renderQtySection = () => {
    if (productInfo.pack_qty > 1) {
      return `${productInfo.pack_qty} x ${productInfo.pack_item.measure_amount}${getMeasureTypStr(
        productInfo.pack_item.measure_type
      )}`;
    } else {
      if (!productInfo.measure_amount || !productInfo.measure_type) return '';
      if (parseInt(productInfo.measure_amount) === 1 && getMeasureTypStr(productInfo.measure_type).length === 0)
        return '';
      return `${productInfo.measure_amount}${getMeasureTypStr(productInfo.measure_type)}`;
    }
  };

  const renderBottom = () => {
    if (loading) return null;

    if (getCartCount() === 0)
      return (
        <div
          className={classes.AddCart}
          onClick={(e) => {
            e.stopPropagation();
            if (getAddOnPossible()) {
              handleClickAddCart();
            } else {
              const productAddonCart = getAddOns();
              const productTemp = { ...productInfo };
              delete productTemp.id;
              delete productTemp.addons;
              delete productTemp.prices;

              updateProductCartAction({
                ...productTemp,
                id: uuidv4(),
                productId: productInfo.id,
                qty: 1,
                priceInfo: getProductPriceInfo(productInfo, orderType),
                orderType: orderType,
                addons: [...productAddonCart],
              });
            }
          }}
          role="button"
        >
          Add to cart
        </div>
      );
    else
      return (
        <div
          className={classes.ProductCount}
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="button"
        >
          <CartAddItemButton
            onClick={(e) => {
              e.stopPropagation();
              updateCarts(-1);
            }}
            type="minus"
          />
          <div className={classes.CountValue}>{getCartCount()}</div>
          <CartAddItemButton
            onClick={(e) => {
              e.stopPropagation();
              if (getAddOnPossible()) {
                setIsNewProductCart(false);
                setShowAddOnView(true);
              } else updateCarts(1);
            }}
            type="plus"
          />
        </div>
      );
  };

  return (
    <>
      <div
        className={classes.root}
        role="button"
        onClick={() => {
          dispatch({
            type: SET_CUR_MODAL,
            payload: MODAL_STATUS.NONE,
          });
          setShowProductView(true);
        }}
      >
        {loading ? (
          <ProductCardSkeleton />
        ) : (
          <>
            <div className={classes.ProductImg} style={{ backgroundImage: `url(${getProductImage()})` }}>
              {renderQtySection().length > 0 && <div className={classes.ProductLabel}>{renderQtySection()}</div>}
            </div>
            <div className={classes.ProductContent}>
              <div className={classes.TopSection}>
                <div className={classes.Title}>{productInfo.name}</div>
                {renderPriceInfo()}
              </div>
              <div className={classes.TopSection}>
                {_.get(productInfo, 'stocked', false) && (
                  <>
                    <div className={classes.Status}>Code: {productInfo.product_code}</div>
                    <div className={classes.Value}>
                      <div className={classes.Stock}>{`${getStock()} in stock`}</div>
                    </div>
                  </>
                )}
              </div>

              <div className={classes.Description}>{productInfo.short_description}</div>
              <div className={classes.Bottom}>{renderBottom()}</div>
            </div>
          </>
        )}
      </div>

      {showProductView && (
        <ProductView
          open={true}
          hideModal={() => {
            setShowProductView(false);
          }}
          productInfo={productInfo}
          setCurProductCart={(cartOne) => {
            setTempProductCart({ ...cartOne });
          }}
          setShowAddonView={() => {
            setShowAddOnView(true);
          }}
        />
      )}
      {showAddOnView && (
        <AddOnView
          open={true}
          hideModal={() => {
            setShowAddOnView(false);
          }}
          productInfo={productInfo}
          curProductCart={getAddonViewProductCart()}
          productPrice={getProductTotalAmount(productInfo, orderType, netPrice)}
          isNew={isNewProductCart}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: '5px',
      boxSizing: 'border-box',
      minHeight: '132px',
      boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.05)',
      border: 'solid 0.5px rgba(186, 195, 201, 0.5)',
      color: theme.palette.primary.text,
      cursor: 'pointer',
    },
    ProductImg: {
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
      flex: '0 0 95px',
      display: 'flex',
      flexDirection: 'column',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      marginTop: '-5px',
      marginBottom: '-5px',
      marginLeft: '-5px',
    },
    ProductLabel: {
      position: 'absolute',
      marginTop: 'auto',
      minWidth: '38px',
      width: 'auto',
      height: '38px',
      backgroundColor: 'rgba(20, 54, 106, 0.89)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 'normal',
      fontSize: '12px',
      bottom: '5px',
      left: '5px',
      borderRadius: '50%',
      textAlign: 'center',
      paddingLeft: '5px',
      paddingRight: '5px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    ProductContent: {
      flex: '1 1 100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '5px 17px 11px 10px',
      overflow: 'hidden',
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
      fontSize: '14px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    Status: {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 300,
      marginRight: '15px',
    },
    Value: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginLeft: 'auto',
      lineHeight: '18px',
      fontSize: '12px',
    },
    Price: {
      fontWeight: 'normal',
      lineHeight: '18px',
      fontSize: '14px',
      paddingTop: '2px',
      display: 'flex',
      flexWrap: 'nowrap',
      marginLeft: '15px',
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
      display: 'flex',
      justifyContent: 'flex-end',
      whiteSpace: 'nowrap',
    },
    Description: {
      fontSize: '12px',
      fontWeight: 300,
      lineHeight: '18px',
      margin: '5px 0 0 0',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    Bottom: {
      display: 'flex',
      marginTop: 'auto',
    },
    AddCart: {
      margin: '3px 0 0 auto',
      color: theme.palette.primary.main,
      fontSize: '14px',
      fontWeight: 'normal',
      cursor: 'pointer',
      lineHeight: 'normal',
    },
    ProductCount: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
    },
    CountValue: {
      fontSize: '20px',
      textAlign: 'center',
      width: '30px',
    },
  })
);

export default connect(null, { updateProductCartAction })(ProductCard);
