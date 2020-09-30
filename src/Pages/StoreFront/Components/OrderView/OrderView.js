import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';

import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from '@material-ui/core';

import CloseIconButton from '../../../../SharedComponents/CloseIconButton';
import OrderTypeSelector from './Components/OrderTypeSelector';
import OrderDatePicker from './Components/OrderDatePicker';
import OrderItem from './Components/OrderItem';
import OrderAddressSelector from './Components/OrderAddressSelector';
import CleanCartConfirmDlg from './Components/ClearnCartConfirmDlg';
import { getAddOnCartPrice } from '../../../../utils/product';
import { formatPrice } from '../../../../utils/string';
import { getCurrency } from '../../../../utils/store';
import { GET_STORE_PAYMENTS } from '../../../../graphql/store/store-query';
import { clearProductCartAction } from '../../../../actions/cartAction';
const PAYMENT_OPTIONS = {
  CASH: 'CASH',
  VISA: 'Visa ending with 4787',
  NEWCARD: 'New Card',
  SQQR: 'SQ QR',
};

const OrderView = ({ hideModal, orderTypesList, clearProductCartAction }) => {
  const classes = useStyles();

  const { storeInfo, storeOrderType, cartList, netPrice } = useSelector((state) => ({
    storeInfo: state.storeReducer.storeInfo,
    storeOrderType: state.storeReducer.orderType,
    cartList: state.cartReducer.cartList,
    netPrice: state.merchantReducer.netPrice,
  }));

  const { data: paymentData, loading: paymentLoading, error: paymentError } = useQuery(GET_STORE_PAYMENTS);

  const ref = useRef(null);

  // return focus to the button when we transitioned from !open -> open
  // useEffect(() => {
  //   const handleDocumentClick = (event) => {
  //     if (ref.current) {
  //       if (!ReactDOM.findDOMNode(ref.current).contains(event.target)) {
  //         hideModal();
  //       }
  //     }
  //   };

  //   document.addEventListener('click', handleDocumentClick, false);

  //   return () => {
  //     document.removeEventListener('click', handleDocumentClick, false);
  //   };
  // }, [hideModal, ref]);

  // temp function
  const setFirstOrderType = () => {
    const findDelivery = orderTypesList.find((item) => item.name.toLowerCase() === 'delivery');
    if (storeOrderType.name === findDelivery.name) return { ...storeOrderType };

    const findCollect = orderTypesList.find((item) => item.name.toLowerCase() === 'collection');
    if (storeOrderType.name === findCollect.name) return { ...storeOrderType };

    return findDelivery;
  };

  const [orderType, setOrderType] = useState({ ...setFirstOrderType() });
  const [showCleanCartDlg, setShowCleanCartDlg] = useState(false);
  const [orderTimeSlot, setOrderTimeSlot] = useState({
    start: moment(new Date()),
    end: moment(new Date()).add(1, 'hours'),
  });
  const [addressInfo, setAddressInfo] = useState({
    type: 'Home',
    address: {},
  });

  const [paymentOption, setPaymentOption] = useState(PAYMENT_OPTIONS.CASH);

  const handleChangePaymentOptions = (event) => {
    setPaymentOption(event.target.value);
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

  const renderTaxes = () => {
    const returnArr = [];
    const taxKind = [];
    const filteredCartList = cartList.filter((item) => item.orderType.id === orderType.id);
    filteredCartList.forEach((item) => {
      const { priceInfo } = item;
      priceInfo.taxes.forEach((itemTax) => {
        if (itemTax.rate > 0) {
          const indexOf = taxKind.indexOf(itemTax.name);
          if (indexOf <= 0) taxKind.push(itemTax.name.toLowerCase());
        }
      });
    });

    const getTotalTaxValue = (taxName) => {
      let totalValue = 0;
      filteredCartList.forEach((item) => {
        const { priceInfo } = item;
        const filterTax = priceInfo.taxes.find((itemTax) => itemTax.name.toLowerCase() === taxName);
        if (filterTax && filterTax.rate > 0) {
          totalValue += (priceInfo.price * filterTax.rate) / 100;
        }
      });
      return totalValue;
    };

    taxKind.forEach((item) => {
      const taxPrice = getTotalTaxValue(item);
      returnArr.push(
        <Typography variant="h2" className={classes.TotalPriceItem}>
          {`${item.toUpperCase()} ${netPrice ? ' (Include)' : ''}`}
          <span>{formatPrice(calculateTotalPrice(taxPrice, storeInfo))}</span>
        </Typography>
      );
    });
    return returnArr;
  };

  const handleClickSubmitOrder = () => {};

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
    return true;
  };

  return (
    <Paper className={classes.root} ref={ref}>
      <CloseIconButton onClick={hideModal} wrapperClass={classes.CloseButtonWrapper} />

      <Box className={classes.TopSection}>
        <Typography variant="h4" align="center">
          Order Number
        </Typography>
        <Typography variant="h3" align="center">
          110620-01
        </Typography>
      </Box>
      <Grid className={classes.SettingSection} container spacing={2}>
        <Grid item className={classes.SettingItem}>
          <OrderTypeSelector
            orderType={orderType}
            orderTypesList={orderTypesList}
            onChange={(value) => {
              setOrderType(value);
            }}
          />
        </Grid>
        <Grid item className={classes.SettingItem}>
          <OrderDatePicker
            date={orderTimeSlot}
            onChange={(value) => {
              setOrderTimeSlot({
                ...value,
              });
            }}
          />
        </Grid>
        <Grid item className={classes.SettingItem}>
          <OrderAddressSelector addressInfo={addressInfo} onChange={setAddressInfo} />
        </Grid>
      </Grid>
      {cartList.filter((item) => item.orderType.id === orderType.id).length > 0 && (
        <Box className={classes.OrderContainer}>
          {cartList
            .filter((item) => item.orderType.id === orderType.id)
            .map((item) => {
              return <OrderItem key={item.id} orderInfo={item} net_price={netPrice} />;
            })}
          <Typography variant="h2" className={classes.TotalPriceItem} style={{ fontWeight: 500 }}>
            TotalDue
            <span style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: getCurrency(storeInfo) }}></span>
            {formatPrice(calculateTotalPrice(), storeInfo)}
          </Typography>
          {renderTaxes()}
        </Box>
      )}
      <Box className={classes.PaymentOptions}>
        <Typography variant="h3">Payment Options</Typography>
        <FormControl component="fieldset" className={classes.PaymentOptionsRadioGroup}>
          <RadioGroup
            aria-label="payment-options"
            name="payment-options"
            value={paymentOption}
            onChange={handleChangePaymentOptions}
          >
            <FormControlLabel
              value={PAYMENT_OPTIONS.CASH}
              control={<Radio className={classes.PaymentOptionRadio} />}
              label={PAYMENT_OPTIONS.CASH}
            />
            <FormControlLabel
              value={PAYMENT_OPTIONS.VISA}
              control={<Radio className={classes.PaymentOptionRadio} />}
              label={PAYMENT_OPTIONS.VISA}
            />
            <FormControlLabel
              value={PAYMENT_OPTIONS.NEWCARD}
              control={<Radio className={classes.PaymentOptionRadio} />}
              label={PAYMENT_OPTIONS.NEWCARD}
            />
            <FormControlLabel
              value={PAYMENT_OPTIONS.SQQR}
              control={<Radio className={classes.PaymentOptionRadio} />}
              label={PAYMENT_OPTIONS.SQQR}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box className={classes.Footer}>
        <Button
          variant="contained"
          onClick={handleClickClearCart}
          className={classes.SubmitButton}
          disabled={!checkClearCartBtnStatus()}
        >
          Clear Cart
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.ClearButton}
          onClick={handleClickSubmitOrder}
          disabled={!checkSubmitBtnStatus()}
        >
          Submit Order
        </Button>
      </Box>
      {showCleanCartDlg && <CleanCartConfirmDlg hideModal={() => setShowCleanCartDlg(false)} confirm={clearnCart} />}
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      right: 0,
      top: '80px',
      width: '100%',
      maxWidth: '700px',
      borderRadius: '10px',
      boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      backgroundColor: '#fff',
      padding: '25px 30px 60px',
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
    },
    OrderContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: '30px 0 0 0',
    },
    PaymentOptions: {
      display: 'flex',
      flexDirection: 'column',
      margin: '56px 0 58px 0',
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
    },
    SubmitButton: {
      width: '50%',
      height: '50px',
      maxWidth: '223px',
    },
    ClearButton: {
      width: '50%',
      height: '50px',
      maxWidth: '223px',
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
    },
  })
);
export default connect(null, { clearProductCartAction })(OrderView);
