import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import ReactHtmlParser from 'react-html-parser';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import { Typography, TextField, Button } from '@material-ui/core';

import CloseIconButton from '../../../../SharedComponents/CloseIconButton';
import AllergyBox from './Components/AllergyBox';
import IngredientsBox from './Components/IngredientsBox';
import AddOnView from '../AddOnView';
import ProductViewSkeleton from './ProductView.skeleton';
import { getAddOnCartPrice, getProductPriceInfo, getProductTotalAmount } from '../../../../utils/product';
import { formatPrice } from '../../../../utils/string';
import { getCurrency } from '../../../../utils/store';

import { GET_PRODUCT_BY_ID } from '../../../../graphql/products/product-query';
import { updateProductCartAction } from '../../../../actions/cartAction';

import PlaceHolderImg from '../../../../assets/img/product-card-placeholder.png';

const ProductView = ({
  open,
  hideModal,
  productId,
  currencyData,
  net_price,
  updateProductCartAction,
  addOnPossible,
}) => {
  const classes = useStyles();

  const [qtyCount, setQtyCount] = useState(1);
  const [showAddOnView, setShowAddOnView] = useState(addOnPossible);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const { loading, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: productId },
  });

  const { orderType, cartList } = useSelector((state) => ({
    orderType: state.storeReducer.orderType,
    cartList: state.cartReducer.cartList,
  }));

  useEffect(
    () => {
      if (cartList.length === 0) setQtyCount(1);
      const findOne = cartList.find(
        (item) => item.productId === productId && _.get(orderType, 'id', '') === item.orderType.id
      );
      if (findOne) {
        setQtyCount(findOne.qty);
      } else setQtyCount(1);

      const addOns = getAddOns(data);
      setAddOnCartList(addOns);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartList, orderType, productId, data]
  );

  const getProduct = () => {
    if (!data) return null;
    if (data.products.length > 0) return data.products[0];
  };

  const getAddOns = () => {
    const product = getProduct();
    if (!product) return [];
    return _.get(product, 'addons', []);
  };

  const getProductImage = () => {
    const product = getProduct();
    const imgArr = _.get(product, 'images', []);
    if (imgArr.length === 0) return PlaceHolderImg;
    else if (imgArr[0].url === '' || imgArr[0].url === null) return PlaceHolderImg;
    else return imgArr[0].url;
  };

  const getProductLabel = () => {
    const product = getProduct();
    if (product) {
      if (product.measure_amount === null || product.measure_type === null) return '';
      return `${product.measure_amount} ${product.measure_type}`;
    }
    return '';
  };

  const getStock = () => {
    const stocks = _.get(getProduct(), 'stocks', []);
    if (stocks.length === 0) return 0;
    return stocks[0].current_stock;
  };

  const setAddOnCartList = (addOns) => {
    const productCart = cartList.find((item) => item.productId === productId);
    if (productCart) {
      setSelectedAddOns([..._.get(productCart, 'addons', [])]);
    } else {
      const formatedAddOns = [];
      addOns.forEach((item) => {
        if (item.default_all) {
          formatedAddOns.push({
            ...item,
            options: [
              ...item.options.map((itemOption) => {
                return {
                  ...itemOption,
                  qty: 1,
                };
              }),
            ],
          });
        } else {
          const tempAddOnItem = { ...item, options: [] };
          item.options.forEach((itemOption) => {
            if (itemOption.default) {
              tempAddOnItem.options.push({ ...itemOption, qty: 1 });
            }
          });
          if (tempAddOnItem.options.length > 0) formatedAddOns.push(tempAddOnItem);
        }
      });

      setSelectedAddOns([...formatedAddOns]);
    }
  };

  const renderPriceInfo = () => {
    const priceInfo = getProductPriceInfo(getProduct(), orderType, net_price);
    if (!priceInfo) return <div className={classes.Price}></div>;

    const addOnPrice = getAddOnCartPrice(selectedAddOns, orderType, net_price);

    if (net_price) {
      const netPriceNames = priceInfo.taxes.map((taxItem) => taxItem.name);
      const netPriceStr = netPriceNames.join(', ');

      return (
        <div className={classes.Price}>
          {getCurrency(currencyData)} {formatPrice(priceInfo.price + addOnPrice, currencyData)}
          {netPriceNames.length > 0 && <span>+{netPriceStr}</span>}
        </div>
      );
    } else {
      let priceValue = priceInfo.price;
      let rateValue = 0;
      priceInfo.taxes.forEach((item) => {
        rateValue += item.rate;
      });
      priceValue = priceValue + priceValue * (rateValue / 100) + addOnPrice;
      return (
        <div className={classes.Price}>
          {getCurrency(currencyData)} {formatPrice(priceValue, currencyData)}
        </div>
      );
    }
  };

  if (showAddOnView)
    return (
      <AddOnView
        open={showAddOnView}
        hideModal={() => setShowAddOnView(false)}
        productId={productId}
        addOnData={getAddOns()}
        selectedAddOns={selectedAddOns}
        currencyData={currencyData}
        setSelectedAddOns={(updatedAddOns) => {
          setSelectedAddOns([...updatedAddOns]);
        }}
        loading={loading}
      />
    );
  else {
    return (
      <Dialog open={open} onClose={hideModal} fullWidth={true} maxWidth="md" className={classes.root}>
        {loading ? (
          <ProductViewSkeleton hideModal={hideModal} />
        ) : (
          <>
            <CloseIconButton onClick={hideModal} wrapperClass={classes.CloseButtonWrapper} />
            <Box className={classes.TopSection}>
              <Box className={classes.ShowMobile} style={{ flexDirection: 'column' }}>
                <Typography className={classes.ProductTitle} variant="h1">
                  {_.get(getProduct(), 'name', '')}
                </Typography>
                {_.get(getProduct(), 'stocked', false) && (
                  <>
                    <Typography variant="h3" style={{ marginTop: '5px' }}>
                      {`Barcode: ${_.get(getProduct(), 'bar_code', '')}`}
                    </Typography>
                    <Typography variant="h3" style={{ marginTop: '5px' }}>
                      {`SKU: ${_.get(getProduct(), 'SKU', '')}`}
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
                    {_.get(getProduct(), 'name', '')}
                  </Typography>
                  {_.get(getProduct(), 'stocked', false) && (
                    <>
                      <Typography variant="h3" style={{ marginTop: '5px' }}>
                        {`Barcode: ${_.get(getProduct(), 'bar_code', '')}`}
                      </Typography>
                      <Typography variant="h3" style={{ marginTop: '5px' }}>
                        {`SKU: ${_.get(getProduct(), 'SKU', '')}`}
                      </Typography>
                    </>
                  )}

                  <Typography variant="h3" style={{ marginTop: '19px', flexDirection: 'column' }}>
                    {ReactHtmlParser(_.get(getProduct(), 'description', ''))}
                  </Typography>
                </Box>
                <Box className={classes.CartBox}>
                  <Box style={{ boxSizing: 'border-box', flex: '1 1 auto' }}>
                    <Typography variant="h2" style={{ display: 'flex' }}>
                      Stock: <div className={classes.StockValue}>{getStock()}</div>
                    </Typography>
                    <Typography variant="h2" style={{ marginTop: '5px', display: 'flex' }}>
                      {`Price:`} {renderPriceInfo()}
                    </Typography>
                  </Box>
                  <Box className={classes.CartControlField}>
                    <TextField
                      className={classes.CartInput}
                      id="cart-input"
                      label="Qty"
                      value={qtyCount}
                      onChange={(e) => {
                        setQtyCount(e.target.value.replace(/\D/, ''));
                      }}
                      error={qtyCount === null || qtyCount.toString().length === 0}
                    />
                    <Button
                      className={classes.CartButton}
                      variant="contained"
                      color="primary"
                      disabled={getProduct() === null || qtyCount === null || qtyCount.toString().length === 0}
                      onClick={() =>
                        updateProductCartAction({
                          productId,
                          name: getProduct().name,
                          qty: parseInt(qtyCount),
                          price: getProductTotalAmount(getProduct(), orderType, net_price),
                          orderType: orderType,
                          addons: [...selectedAddOns],
                        })
                      }
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
                  {ReactHtmlParser(_.get(getProduct(), 'description', ''))}
                </Typography>
              </Box>
            </Box>
            {_.get(getProduct(), 'allergies', []).length > 0 && (
              <AllergyBox allergyData={_.get(getProduct(), 'allergies', [])} wrapperClass={classes.AllergyWrapper} />
            )}
            {_.get(getProduct(), 'ingredients', []).length > 0 && (
              <IngredientsBox
                ingredientData={_.get(getProduct(), 'ingredients', [])}
                wrapperClass={classes.IngredientsWrapper}
              />
            )}
          </>
        )}
      </Dialog>
    );
  }
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
      textAlign: 'right',
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
