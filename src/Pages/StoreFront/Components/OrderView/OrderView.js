import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Dialog,
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  CircularProgress,
  TextareaAutosize,
} from '@material-ui/core';

import CloseIconButton from '../../../../SharedComponents/CloseIconButton';
import OrderTypeSelector from './Components/OrderTypeSelector';
import OrderDatePicker from './Components/OrderDatePicker';
import OrderItem from './Components/OrderItem';
import OrderAddressSelector from './Components/OrderAddressSelector';
import CleanCartConfirmDlg from './Components/ClearnCartConfirmDlg';
import AddOrderSuccessDlg from './Components/AddOrderSuccessDlg';
import { GET_STORE_PAYMENTS, GET_ORDERTYPE_STATUS } from '../../../../graphql/store/store-query';
import { ADD_ORDER } from '../../../../graphql/products/product-mutation';
import { clearProductCartAction } from '../../../../actions/cartAction';
import { getAddOnCartPrice } from '../../../../utils/product';
import { formatPrice } from '../../../../utils/string';
import { getCurrency } from '../../../../utils/store';
import { checkUserIsLogin } from '../../../../utils/auth';

const OrderView = ({ hideModal, orderTypesList, clearProductCartAction }) => {
  const classes = useStyles();

  const { storeInfo, storeOrderType, cartList, netPrice, userInfo } = useSelector((state) => ({
    storeInfo: state.storeReducer.storeInfo,
    storeOrderType: state.storeReducer.orderType,
    cartList: state.cartReducer.cartList,
    netPrice: state.merchantReducer.netPrice,
    userInfo: state.authReducer.userInfo,
  }));

  const { data: paymentData, loading: paymentLoading, error: paymentError } = useQuery(GET_STORE_PAYMENTS);
  const { data: orderTypesStatus, loading: orderTypesStatusLoading, error: orderTypesStatusError } = useQuery(
    GET_ORDERTYPE_STATUS
  );
  const [addOrderMutation, { data: addedOrderData, loading: addOrderLoading, error: addOrderError }] = useMutation(
    ADD_ORDER
  );
  // temp function
  const setFirstOrderType = () => {
    const findDelivery = orderTypesList.find((item) => item.name.toLowerCase() === 'delivery');
    if (findDelivery) if (storeOrderType.name === findDelivery.name) return { ...storeOrderType };

    const findCollect = orderTypesList.find((item) => item.name.toLowerCase() === 'collection');
    if (findCollect) if (storeOrderType.name === findCollect.name) return { ...storeOrderType };

    return findDelivery;
  };

  // status variables
  const [loading, setLoading] = useState(false);
  const [showSuccessDlg, setShowSuccessDlg] = useState(false);
  const [orderType, setOrderType] = useState({ ...setFirstOrderType() });
  const [showCleanCartDlg, setShowCleanCartDlg] = useState(false);

  const [orderSettingInfo, setOrderSettingInfo] = useState({
    delivery: {
      addressInfo: {
        type: '',
        address: {},
      },
      transferTime: {
        start: moment(new Date()).add(10, 'minutes'),
        end: moment(new Date()).add(70, 'minutes'),
      },
      paymentOption: '',
      notes: {
        show: false,
        value: '',
      },
    },
    collection: {
      transferTime: {
        start: moment(new Date()).add(10, 'minutes'),
        end: moment(new Date()).add(70, 'minutes'),
      },
      paymentOption: '',
      notes: {
        show: false,
        value: '',
      },
    },
  });

  const handleChangePaymentOptions = (event) => {
    const tempData = { ...orderSettingInfo };
    tempData[orderType.name.toLowerCase()].paymentOption = event.target.value;
    setOrderSettingInfo({
      ...tempData,
    });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    const filteredCartList = cartList.filter((item) => item.orderType.id === orderType.id);
    if (filteredCartList.length === 0) {
      return 0;
    }

    filteredCartList.forEach((item) => {
      const { priceInfo } = item;
      const addonprice = getAddOnCartPrice(item.addons);
      if (netPrice) totalPrice += priceInfo.price * item.qty;
      else {
        let rateValue = 0;
        priceInfo.taxes.forEach((item) => {
          if (item.rate > 0) rateValue += item.rate;
        });
        totalPrice += (priceInfo.price + priceInfo.price * (rateValue / 100) + addonprice) * item.qty;
      }
    });
    return totalPrice;
  };

  const reduceTaxes = () => {
    const taxKind = [];
    const filteredCartList = cartList.filter((item) => item.orderType.id === orderType.id);
    filteredCartList.forEach((item) => {
      const { priceInfo } = item;
      priceInfo.taxes.forEach((itemTax) => {
        if (itemTax.rate > 0) {
          const indexOf = taxKind.find((itemFind) => itemFind.id === itemTax.id);
          if (indexOf <= 0)
            taxKind.push({
              id: itemTax.id,
              name: itemTax.name,
            });
        }
      });
    });

    const getTotalTaxValue = (taxId) => {
      let totalValue = 0;
      filteredCartList.forEach((item) => {
        const { priceInfo } = item;
        const filterTax = priceInfo.taxes.find((itemTax) => itemTax.id === taxId);
        if (filterTax && filterTax.rate > 0) {
          totalValue += (priceInfo.price * filterTax.rate) / 100;
        }
      });
      return totalValue;
    };

    return taxKind.map((item) => {
      return {
        ...item,
        amount: getTotalTaxValue(item.id),
      };
    });
  };

  const renderTaxes = () => {
    const returnArr = [];
    const taxKind = reduceTaxes();

    taxKind.forEach((item) => {
      returnArr.push(
        <Typography variant="h2" className={classes.TotalPriceItem}>
          {`${item.toUpperCase()} ${netPrice ? ' (Include)' : ''}`}
          <span>{formatPrice(calculateTotalPrice(item.amount, storeInfo))}</span>
        </Typography>
      );
    });
    return returnArr;
  };

  const getOrderTypesStatus = () => {
    if (!orderTypesStatus) return null;
    const findOne = orderTypesStatus.orderTypes.find(
      (item) => item.name.toLowerCase() === orderType.name.toLowerCase()
    );
    return {
      id: findOne.workflow.stages[0].id,
      order: findOne.workflow.stages[0].order,
      name: findOne.workflow.stages[0].name,
    };
  };

  const handleClickSubmitOrder = () => {
    const order_id = uuidv4();
    const selectedInfo = orderSettingInfo[orderType.name.toLowerCase()];
    const getProductAddons = (product) => {
      const addons = [];
      product.addons.forEach((item) => {
        item.addons.forEach((itemOne) => {
          addons.push({
            addon_id: itemOne.id,
            name: itemOne.name,
            group: item.group,
            price: {
              amount: itemOne.price,
              quantity: itemOne.qty,
              measure: itemOne.measure_amount,
              measure_type: itemOne.measure_type,
              taxes: [],
            },
          });
        });
      });
      return addons;
    };
    const items = cartList.map((item) => {
      return {
        is_manual: false,
        bar_code: item.bar_code,
        notes: [],
        category: {
          id: item.category.id,
          name: item.category.name,
        },
        product_id: item.productId,
        name: item.name,
        price: {
          amount: item.priceInfo.price,
          quantity: item.qty,
          measure: item.measure_amount,
          measure_type: item.measure_type,
          taxes: item.priceInfo.taxes.map((itemOne) => {
            return {
              id: itemOne.id,
              name: itemOne.name,
              rate: itemOne.rate,
            };
          }),
        },
        addons: getProductAddons(item),
      };
    });
    // get payment types
    const paymentType = getPaymentTypes().find((item) => item.id === selectedInfo.paymentOption);
    const inputJson = {
      id: order_id,
      order_id: order_id,
      order_no: '',
      notes: [
        {
          content: selectedInfo.notes.value,
        },
      ],
      delivery: {
        address: {
          line1: selectedInfo.addressInfo.address.line1,
          line2: selectedInfo.addressInfo.address.line2,
          city_town: selectedInfo.addressInfo.address.city_town,
          country: selectedInfo.addressInfo.address.country,
          postcode: selectedInfo.addressInfo.address.postcode,
        },
        name: `${userInfo.first_name} ${userInfo.last_name}`,
        mobile: '',
      },
      shopper: {
        id: userInfo.id,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
      },
      statuses: {
        ...getOrderTypesStatus(),
      },
      device: {
        device_id: '',
        device_name: '',
      },
      order_type: {
        id: orderType.id,
        type: orderType.pricing_type,
        name: orderType.name,
      },
      items: [...items],
      total_price: {
        amount: calculateTotalPrice(),
        taxes: reduceTaxes(),
      },
      payments: [
        {
          payment_type: {
            id: paymentType.id,
            name: paymentType.name,
            type: paymentType.type,
          },
          change_due: 0,
          amount: calculateTotalPrice(),
          status: 'pre-auth',
          reference: 'resource',
        },
      ],
    };
    try {
      addOrderMutation({
        variables: {
          input: inputJson,
        },
      })
        .then((res) => {
          setShowSuccessDlg(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickClearCart = () => {
    setShowCleanCartDlg(true);
  };

  const clearnCart = () => {
    clearProductCartAction(orderType);
    setShowCleanCartDlg(false);
  };

  const checkClearCartBtnStatus = () => {
    const filteredCartList = cartList.filter((item) => item.orderType.id === orderType.id);
    if (filteredCartList.length === 0) return false;
    return true;
  };

  const checkSubmitBtnStatus = () => {
    const filteredCartList = cartList.filter((item) => item.orderType.id === orderType.id);
    if (filteredCartList.length === 0) return false;
    if (!checkUserIsLogin(userInfo)) return false;
    return true;
  };

  const getSettingStyle = () => {
    if (orderType.name.toLowerCase() === 'collection') return { justifyContent: 'center' };
    return {};
  };

  const handleClickNotes = () => {
    const temp = { ...orderSettingInfo };
    temp[orderType.name.toLowerCase()].notes.show = true;
    setOrderSettingInfo({ ...temp });
  };

  const handleChangeNotes = (e) => {
    const temp = { ...orderSettingInfo };
    temp[orderType.name.toLowerCase()].notes.value = e.target.value;
    setOrderSettingInfo({ ...temp });
  };

  const getPaymentTypes = () => {
    const store = _.get(paymentData, 'store', null);
    if (!store) return null;

    const paymentTypes = _.get(store, 'payment_types', []);
    if (!paymentTypes || paymentTypes.length === 0) return null;
    return paymentTypes;
  };

  const renderPayments = () => {
    const paymentTypes = getPaymentTypes();
    if (!paymentTypes || paymentTypes.length === 0) return null;

    return (
      <Box className={classes.PaymentOptions}>
        <Typography variant="h3">Payment Options</Typography>
        <FormControl component="fieldset" className={classes.PaymentOptionsRadioGroup}>
          <RadioGroup
            aria-label="payment-options"
            name="payment-options"
            value={orderSettingInfo[orderType.name.toLowerCase()].paymentOption}
            onChange={handleChangePaymentOptions}
          >
            {paymentTypes.map((item, nIndex) => {
              return (
                <FormControlLabel
                  key={nIndex}
                  value={item.id}
                  control={<Radio className={classes.PaymentOptionRadio} />}
                  label={item.name}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  return (
    <Dialog className={classes.root} onClose={hideModal} open={true}>
      <CloseIconButton onClick={hideModal} wrapperClass={classes.CloseButtonWrapper} />
      <Box className={classes.TopSection}>
        <Typography variant="h4" align="center">
          Order Number
        </Typography>
        <Typography variant="h3" align="center">
          110620-01
        </Typography>
      </Box>
      {addOrderLoading ? (
        <Box className={classes.SpinnerContainer}>
          <CircularProgress className={classes.LoadingSpinner} />
          <Typography className={classes.LoadingTxt} variant="h1">
            Connecting you to storename store
          </Typography>
        </Box>
      ) : (
        <>
          <Grid className={classes.SettingSection} container spacing={2} style={getSettingStyle()}>
            <Grid item className={classes.SettingItem}>
              <OrderTypeSelector
                orderType={orderType}
                orderTypesList={orderTypesList}
                onChange={(value) => {
                  setOrderType(value);
                }}
              />
            </Grid>
            {orderType.name.toLowerCase() === 'delivery' && (
              <>
                <Grid item className={classes.SettingItem}>
                  <OrderDatePicker
                    title="Delivery Slot"
                    date={orderSettingInfo.delivery.transferTime}
                    onChange={(value) => {
                      setOrderSettingInfo({
                        ...orderSettingInfo,
                        delivery: {
                          ...orderSettingInfo.delivery,
                          transferTime: {
                            ...value,
                          },
                        },
                      });
                    }}
                  />
                </Grid>
                <Grid item className={classes.SettingItem}>
                  <OrderAddressSelector
                    addressInfo={orderSettingInfo.delivery.addressInfo}
                    onChange={(value) => {
                      setOrderSettingInfo({
                        ...orderSettingInfo,
                        delivery: {
                          ...orderSettingInfo.delivery,
                          addressInfo: { ...value },
                        },
                      });
                    }}
                    isUserLogin={checkUserIsLogin(userInfo)}
                    hideModal={hideModal}
                  />
                </Grid>
              </>
            )}
            {orderType.name.toLowerCase() === 'collection' && (
              <>
                <Grid item className={classes.SettingItem}>
                  <OrderDatePicker
                    title="Collection Time"
                    date={orderSettingInfo.collection.transferTime}
                    onChange={(value) => {
                      setOrderSettingInfo({
                        ...orderSettingInfo,
                        collection: {
                          ...orderSettingInfo.collection,
                          transferTime: { ...value },
                        },
                      });
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
          {orderSettingInfo[orderType.name.toLowerCase()].notes.show ? (
            <>
              <Typography className={classes.NotesLabel} variant="h4">
                Notes
              </Typography>
              <TextareaAutosize
                className={classes.Notes}
                aria-label="minimum height"
                rowsMin={3}
                rowsMax={3}
                placeholder=""
                value={orderSettingInfo[orderType.name.toLowerCase()].notes.value}
                onChange={handleChangeNotes}
              />
            </>
          ) : (
            <Typography className={classes.NotesBtn} variant="h3" onClick={handleClickNotes}>
              Add Notes
            </Typography>
          )}
          {cartList.filter((item) => item.orderType.id === orderType.id).length > 0 && (
            <Box className={classes.OrderContainer}>
              {cartList
                .filter((item) => item.orderType.id === orderType.id)
                .map((item) => {
                  return <OrderItem key={item.id} orderInfo={item} net_price={netPrice} />;
                })}
              <Typography variant="h2" className={classes.TotalPriceItem} style={{ fontWeight: 500 }}>
                TotalDue
                <span
                  style={{ marginRight: '5px' }}
                  dangerouslySetInnerHTML={{ __html: getCurrency(storeInfo) }}
                ></span>
                {formatPrice(calculateTotalPrice(), storeInfo)}
              </Typography>
              {renderTaxes()}
            </Box>
          )}
          {renderPayments()}
          <Box className={classes.Footer}>
            <Button
              variant="contained"
              onClick={handleClickClearCart}
              className={classes.ClearButton}
              disabled={!checkClearCartBtnStatus()}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.SubmitButton}
              onClick={handleClickSubmitOrder}
              disabled={!checkSubmitBtnStatus()}
            >
              Submit Order
            </Button>
          </Box>
        </>
      )}
      {showCleanCartDlg && <CleanCartConfirmDlg hideModal={() => setShowCleanCartDlg(false)} confirm={clearnCart} />}
      {showSuccessDlg && (
        <AddOrderSuccessDlg
          hideModal={() => {
            clearnCart();
            hideModal();
          }}
        />
      )}
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiDialog-paper': {
        position: 'absolute',
        right: 0,
        top: '80px',
        width: '100%',
        maxWidth: '700px',
        borderRadius: '10px',
        boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
        border: 'solid 1px rgba(186, 195, 201, 0.5)',
        backgroundColor: '#fff',
        padding: '25px 30px 60px',
        margin: 0,
        minHeight: '556px',
      },
      '& .MuiBackdrop-root': {
        backgroundColor: 'transparent',
      },
      '& h1': {
        color: theme.palette.primary.text,
      },
      '& h4': {
        color: 'rgba(32, 39, 41, 0.5)',
        marginBottom: '6px',
      },
      '& h3': {
        color: theme.palette.primary.text,
      },
      '@media screen and (max-width: 768px)': {
        marginLeft: '10px',
        marginRight: '10px',
        width: 'calc(100% - 20px)',
      },
    },
    CloseButtonWrapper: {
      top: '15px',
      right: '15px',
    },
    TopSection: {},
    SettingSection: {
      margin: '5px 0 0 0',
    },
    SettingItem: {
      width: '33.33%',
      '@media screen and (max-width: 600px)': {
        width: '50%',
      },
    },
    NotesBtn: {
      cursor: 'pointer',
      margin: '30px 0 0 0',
    },
    NotesLabel: {
      opacity: 0.5,
      margin: '30px 0 6px',
    },
    Notes: {
      resize: 'none',
      margin: '0',
      color: theme.palette.primary.text,
      fontSize: '14px',
      '&:focus': {
        border: `1px solid ${theme.palette.primary.main}`,
        outlineColor: theme.palette.primary.main,
        outlineOffset: 0,
        outlineStyle: 'auto',
        outlineWidth: '1.11111px',
        overflowWrap: 'break-word',
      },
      '&:active': {
        border: `1px solid ${theme.palette.primary.main}`,
        outlineColor: theme.palette.primary.main,
        outlineOffset: 0,
        outlineStyle: 'auto',
        outlineWidth: '1.11111px',
        overflowWrap: 'break-word',
      },
    },
    OrderContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: '30px 0 0 0',
    },
    PaymentOptions: {
      display: 'flex',
      flexDirection: 'column',
      margin: '56px 0 28px 0',
      '& h3': {
        fontWeight: 'normal',
        color: theme.palette.primary.text,
        marginBottom: '17px',
      },
    },
    PaymentOptionsRadioGroup: {
      '& .MuiFormGroup-root': {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
    PaymentOptionRadio: {
      '&.Mui-checked': {
        color: theme.palette.primary.yellow,
      },
    },
    Footer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
    },
    SubmitButton: {
      width: '50%',
      height: '50px',
      maxWidth: '223px',
      '@media screen and (max-width: 550px)': {
        width: '45%',
        minWidth: '150px',
      },
    },
    ClearButton: {
      width: '50%',
      height: '50px',
      maxWidth: '223px',
      '@media screen and (max-width: 550px)': {
        width: '40%',
      },
    },
    TotalPriceItem: {
      margin: '10px 0 0 0',
      paddingLeft: '154px',
      display: 'flex',
      whiteSpace: 'nowrap',
      flexWrap: 'nowrap',
      '& span': {
        marginLeft: 'auto',
      },
      '@media screen and (max-width: 550px)': {
        paddingLeft: '87px',
      },
    },
    SpinnerContainer: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
    LoadingSpinner: {
      width: '70px !important',
      height: '70px !important',
      '@media screen and (max-width: 550px)': {
        width: '40px !important',
        height: '40px !important',
      },
    },
    LoadingTxt: {
      fontWeight: 'normal',
      margin: '37px 0 0 0',
      color: `${theme.palette.primary.main} !important`,
      '@media screen and (max-width: 550px)': {
        margin: '17px 0 0 0',
        fontSize: '16px',
      },
    },
  })
);
export default connect(null, { clearProductCartAction })(OrderView);
