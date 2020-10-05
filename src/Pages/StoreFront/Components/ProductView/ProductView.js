import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import ReactHtmlParser from 'react-html-parser';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dialog, Box, Typography, TextField, Button } from '@material-ui/core';

import CloseIconButton from '../../../../SharedComponents/CloseIconButton';
import AllergyBox from './Components/AllergyBox';
import IngredientsBox from './Components/IngredientsBox';

import { getAddOnCartPrice, getProductPriceInfo, getMeasureTypStr } from '../../../../utils/product';
import { formatPrice } from '../../../../utils/string';
import { getCurrency } from '../../../../utils/store';

import { updateProductCartAction } from '../../../../actions/cartAction';

import PlaceHolderImg from '../../../../assets/img/product-card-placeholder.png';

const ProductView = ({
  open,
  hideModal,
  productInfo,
  setShowAddonView,
  setCurProductCart,
  updateProductCartAction,
}) => {
  console.log(productInfo);
  const classes = useStyles();
  const [productCart, setProductCart] = useState({
    qty: 1,
  });

  const { storeInfo, netPrice, orderType } = useSelector((state) => ({
    storeInfo: state.storeReducer.storeInfo,
    netPrice: state.merchantReducer.netPrice,
    orderType: state.storeReducer.orderType,
  }));

  const getAddOns = (product) => {
    if (!product) return [];
    const addons = _.get(product, 'addons', []);
    if (addons && addons.length > 0) {
      const filterAddons = [];
      addons.forEach((item) => {
        const { options } = item;
        if (options.length > 0) {
          const optionsTemp = [];
          options.forEach((optionItem) => {
            const optionItemTemp = { ...optionItem };
            delete optionItemTemp.price;
            if (optionItem.default)
              optionsTemp.push({ ...optionItemTemp, fixed_price: optionItem.price.fixed_price, qty: 1 });
          });

          let itemTemp = { ...item };
          delete itemTemp.options;
          filterAddons.push({
            ...itemTemp,
            addons: [...optionsTemp],
          });
        }
      });
      return filterAddons;
    } else return [];
  };

  const setDefaultProductCart = (product) => {
    const addons = getAddOns(product);
    const productTemp = { ...product };
    delete productTemp.id;
    delete productTemp.addons;
    delete productTemp.prices;
    setProductCart({
      id: uuidv4(),
      ...productTemp,
      qty: 1,
      productId: product.id,
      priceInfo: getProductPriceInfo(product, orderType),
      orderType: orderType,
      addons: [...addons],
    });
  };

  useEffect(() => {
    setDefaultProductCart(productInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInfo]);

  const getProductImage = () => {
    const product = productInfo;
    const imgArr = _.get(product, 'images', []);
    if (imgArr.length === 0) return PlaceHolderImg;
    else if (imgArr[0].url === '' || imgArr[0].url === null) return PlaceHolderImg;
    else return imgArr[0].url;
  };

  const getProductLabel = () => {
    const pack_qty = _.get(productInfo, 'pack_qty', 0);

    if (pack_qty > 1) {
      const packItem = _.get(productInfo, 'pack_item', {});

      return `${pack_qty} x ${_.get(packItem, 'measure_amount', '')}${getMeasureTypStr(
        _.get(packItem, 'measure_type', '')
      )}`;
    } else {
      if (!productInfo.measure_amount || !productInfo.measure_type) return '';
      if (parseInt(productInfo.measure_amount) === 1 && getMeasureTypStr(productInfo.measure_type).length === 0)
        return '';
      return `${productInfo.measure_amount}${getMeasureTypStr(productInfo.measure_type)}`;
    }
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

  const renderPriceInfo = () => {
    const priceInfo = getProductPriceInfo(productInfo, orderType, netPrice);
    const addOnPrice = getAddOnCartPrice(productCart.addons, orderType, netPrice);

    if (!priceInfo)
      return (
        <div className={classes.Price}>
          <div style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: getCurrency(storeInfo) }}></div>
          {formatPrice(addOnPrice, storeInfo)}
        </div>
      );

    if (netPrice) {
      const netPriceNames = priceInfo.taxes.map((taxItem) => taxItem.name);
      const netPriceStr = netPriceNames.join(', ');

      return (
        <div className={classes.Price}>
          <div style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: getCurrency(storeInfo) }}></div>
          {formatPrice(priceInfo.price + addOnPrice, storeInfo)}
          {netPriceNames.length > 0 && <span>+{netPriceStr}</span>}
        </div>
      );
    } else {
      let priceValue = priceInfo.price;
      let rateValue = 0;
      priceInfo.taxes.forEach((item) => {
        if (item.rate > 0) rateValue += item.rate;
      });
      priceValue += priceValue * (rateValue / 100) + addOnPrice;
      return (
        <div className={classes.Price}>
          <div style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: getCurrency(storeInfo) }}></div>
          {formatPrice(priceValue, storeInfo)}
        </div>
      );
    }
  };

  return (
    <>
      <Dialog open={open} onClose={hideModal} fullWidth={true} maxWidth="md" className={classes.root}>
        <CloseIconButton onClick={hideModal} wrapperClass={classes.CloseButtonWrapper} />
        <Box className={classes.TopSection}>
          <Box className={classes.ShowMobile} style={{ flexDirection: 'column' }}>
            <Typography className={classes.ProductTitle} variant="h1">
              {_.get(productInfo, 'name', '')}
            </Typography>
            {!_.get(productInfo, 'stocked', false) && (
              <>
                <Typography>Code: {productInfo.product_code || 'N/A'}</Typography>
                <Typography variant="h3" style={{ marginTop: '5px' }}>
                  {`SKU: ${_.get(productInfo, 'SKU', '')}`}
                </Typography>
              </>
            )}
          </Box>

          <div className={classes.ProductImg} style={{ backgroundImage: `url(${getProductImage()})` }}>
            {getProductLabel().length > 0 && <div className={classes.ProductLabel}>{getProductLabel()}</div>}
          </div>

          <Box className={classes.ProductInfoDiv}>
            <Box className={classes.ShowDesktop} style={{ flexDirection: 'column' }}>
              <Typography className={classes.ProductTitle} variant="h1">
                {_.get(productInfo, 'name', '')}
              </Typography>

              {_.get(productInfo, 'stocked', false) && (
                <>
                  <Typography>Product Code: {productInfo.product_code || 'N/A'}</Typography>
                  <Typography variant="h3" style={{ marginTop: '5px' }}>
                    {`SKU: ${_.get(productInfo, 'SKU', '')}`}
                  </Typography>
                </>
              )}

              <Typography variant="h3" style={{ marginTop: '19px', flexDirection: 'column' }}>
                {ReactHtmlParser(_.get(productInfo, 'description', ''))}
              </Typography>
            </Box>
            <Box className={classes.CartBox}>
              <Box style={{ boxSizing: 'border-box', flex: '1 1 auto' }}>
                {_.get(productInfo, 'stocked', false) && (
                  <Typography variant="h2" style={{ display: 'flex' }}>
                    Stock: <div className={classes.StockValue}>{getStock()}</div>
                  </Typography>
                )}
                <Typography variant="h2" style={{ marginTop: '5px', display: 'flex' }}>
                  {`Price:`} {renderPriceInfo()}
                </Typography>
              </Box>
              <Box className={classes.CartControlField}>
                <TextField
                  className={classes.CartInput}
                  id="cart-input"
                  label="Qty"
                  value={_.get(productCart, 'qty', 0)}
                  onChange={(e) => {
                    setProductCart({
                      ...productCart,
                      qty: parseInt(e.target.value.replace(/\D/, '0')),
                    });
                  }}
                  error={_.get(productCart, 'qty', 0) === null || _.get(productCart, 'qty', 0).toString().length === 0}
                />
                <Button
                  className={classes.CartButton}
                  variant="contained"
                  color="primary"
                  disabled={
                    productInfo === null ||
                    _.get(productCart, 'qty', 0) === null ||
                    _.get(productCart, 'qty', 0).toString().length === 0
                  }
                  onClick={() => {
                    updateProductCartAction(productCart);
                    if (getAddOnPossible()) {
                      setCurProductCart(productCart);
                      setShowAddonView(true);
                    }
                    hideModal();
                  }}
                >
                  Add to cart
                </Button>
              </Box>
            </Box>

            <Typography
              variant="h3"
              className={classes.ShowMobile}
              style={{ marginTop: '31px', flexDirection: 'column' }}
            >
              {ReactHtmlParser(_.get(productInfo, 'description', ''))}
            </Typography>
          </Box>
        </Box>
        {_.get(productInfo, 'allergies', []).length > 0 && (
          <AllergyBox allergyData={_.get(productInfo, 'allergies', [])} wrapperClass={classes.AllergyWrapper} />
        )}
        {_.get(productInfo, 'ingredients', []).length > 0 && (
          <IngredientsBox
            ingredientData={_.get(productInfo, 'ingredients', [])}
            wrapperClass={classes.IngredientsWrapper}
          />
        )}
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiDialog-paper': {
        padding: '50px',
        width: '100%',
        maxWidth: '1024px',
        borderRadius: '10px',
        boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
        border: 'solid 1px rgba(186, 195, 201, 0.5)',
        backgroundColor: '#ffffff',
        position: 'relative',
        maxHeight: '80vh',
        '@media screen and (max-width: 768px)': {
          paddingLeft: '15px',
          paddingRight: '15px',
          paddingTop: '20px',
        },
        '@media screen and (max-width: 480px)': {
          marginLeft: '15px',
          marginRight: '15px',
        },
      },
    },
    CloseButtonWrapper: {
      position: 'absolute',
      top: '15px',
      right: '15px',
    },
    TopSection: {
      display: 'flex',
      boxSizing: 'border-box',
      '@media screen and (max-width: 768px)': {
        flexDirection: 'column',
      },
    },
    ProductImg: {
      flex: '0 0 344px',
      width: '344px',
      height: '335px',
      display: 'flex',
      flexDirection: 'column',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      '@media screen and (max-width: 1023px)': {
        flex: '0 0 200px',
        width: '200px',
        height: '210px',
      },
      '@media screen and (max-width: 768px)': {
        width: '100%',
        flex: '1 1 auto',
        height: '226px',
        margin: '30px 0 40px 0',
      },
    },
    ProductLabel: {
      marginTop: 'auto',
      width: '100%',
      height: '52px',
      backgroundColor: 'rgba(1, 86, 184, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '20px',
    },
    ProductInfoDiv: {
      boxSizing: 'border-box',
      padding: '0 19px 0 30px',
      flex: '1 1 100%',
      display: 'flex',
      flexDirection: 'column',
      '@media screen and (max-width: 768px)': {
        padding: 0,
      },
    },
    CartBox: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginTop: 'auto',
      '@media screen and (max-width: 768px)': {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    ProductTitle: {
      '@media screen and (max-width: 768px)': {
        marginRight: '60px',
      },
    },
    Price: {
      fontWeight: 500,
      minWidth: '65px',
      display: 'flex',
      justifyContent: 'flex-end',
      flexWrap: 'nowrap',
      whiteSpace: 'nowrap',
      flex: '1 1 100%',
      '@media screen and (max-width: 768px)': {
        textAlign: 'left',
        paddingLeft: '10px',
        minWidth: 'auto',
      },
    },
    StockValue: {
      minWidth: '65px',
      textAlign: 'right',
      '@media screen and (max-width: 768px)': {
        textAlign: 'left',
        paddingLeft: '10px',
        minWidth: 'auto',
      },
    },
    CartControlField: {
      display: 'flex',
      marginTop: '31px',
      boxSizing: 'border-box',
      '@media screen and (max-width: 768px)': {
        marginTop: 0,
      },
    },
    AllergyWrapper: {
      margin: '82px 0 0 0',
      '@media screen and (max-width: 768px)': {
        marginTop: '40px',
      },
    },
    IngredientsWrapper: {
      margin: '50px 0 0 0',
      '@media screen and (max-width: 768px)': {
        marginTop: '25px',
      },
    },
    CartInput: {
      width: '100px',
      marginLeft: '15px',
      '@media screen and (max-width: 410px)': {
        width: '60px',
      },
    },
    CartButton: {
      width: '120px',
      height: '50px',
      marginLeft: '15px',
      paddingLeft: '13px',
      paddingRight: '13px',
    },
    ShowDesktop: {
      display: 'flex',
      '@media screen and (max-width: 768px)': {
        display: 'none',
      },
    },
    ShowMobile: {
      display: 'none',
      '@media screen and (max-width: 768px)': {
        display: 'flex',
      },
    },
  })
);
export default connect(null, { updateProductCartAction })(ProductView);
