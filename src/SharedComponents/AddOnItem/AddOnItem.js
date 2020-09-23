import React from 'react';
import { useSelector } from 'react-redux';

import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import CartAddItemButton from '../CartAddItemButton';
import { getAddOnOptionPriceInfo } from '../../utils/product';
import { formatPrice } from '../../utils/string';
import { getNetPriceStatus } from '../../utils/merchant';
import { getCurrency } from '../../utils/store';

import PlaceHolderSvg from '../../assets/img/addon-item-placeholder.png';
import { GET_MERCHANT_NET_PRICE } from '../../graphql/merchant/merchant-query';
import { GET_CURRENCY } from '../../graphql/localisation/localisation-query';

const AddOnItem = ({ wrapperClass, itemData, optionCartInfo, setOptionCartInfo }) => {
  const { data: merchantNetPrice } = useQuery(GET_MERCHANT_NET_PRICE);
  const { data: currencyData } = useQuery(GET_CURRENCY);

  const classes = useStyles();
  const { orderType } = useSelector((state) => ({
    orderType: state.storeReducer.orderType,
  }));

  const getItemImage = () => {
    const itemImg = _.get(itemData, 'backImg', '');
    if (itemImg.length > 0) return itemImg;
    else return PlaceHolderSvg;
  };

  const getBackImgStyle = () => {
    const itemImg = _.get(itemData, 'backImg', '');
    if (itemImg.length > 0) return null;
    else return { backgroundColor: '#e1eaf1' };
  };

  const handleClickItem = () => {
    if (optionCartInfo) return null;
    else {
      setOptionCartInfo({
        ...itemData,
        qty: 1,
      });
    }
  };

  const getCurrentQty = () => {
    return _.get(optionCartInfo, 'qty', 0);
  };

  const getMinusButtonStatus = () => {
    const mandatory = _.get(itemData, 'mandatory', false);
    const qty = _.get(optionCartInfo, 'qty', 0);
    if (mandatory && qty <= 1) return false;
    return true;
  };

  const getPlusButtonStatus = () => {
    const qty = _.get(optionCartInfo, 'qty', 0);
    const extra = _.get(itemData, 'extra', -1);
    if (extra >= 0 && qty >= extra + 1) {
      return false;
    }
    return true;
  };

  const renderPriceInfo = () => {
    const priceInfo = getAddOnOptionPriceInfo(itemData, orderType);
    if (!priceInfo) return '';

    const netPrice = getNetPriceStatus(merchantNetPrice);
    if (netPrice) {
      const netPriceNames = priceInfo.taxes.map((taxItem) => taxItem.name);
      const netPriceStr = netPriceNames.join(', ');

      return (
        <Typography variant="h3" className={classes.Price}>
          {getCurrency(currencyData)} {formatPrice(priceInfo.price, currencyData)}
          {netPriceNames.length > 0 && <span>+{netPriceStr}</span>}
        </Typography>
      );
    } else {
      let priceValue = priceInfo.price;
      let rateValue = 0;
      priceInfo.taxes.forEach((item) => {
        rateValue += item.rate;
      });
      priceValue += priceValue * (rateValue / 100);
      return (
        <Typography variant="h3" className={classes.Price}>
          {getCurrency(currencyData)} {formatPrice(priceValue, currencyData)}
        </Typography>
      );
    }
  };

  const renderCartControl = () => {
    if (optionCartInfo) {
      return (
        <Box className={classes.ControlPanel}>
          <CartAddItemButton
            onClick={() => {
              setOptionCartInfo({
                ...itemData,
                qty: optionCartInfo.qty - 1,
              });
            }}
            type="minus"
            disabled={!getMinusButtonStatus()}
          />
          <Typography variant="h2" className={classes.Count}>
            {getCurrentQty()}
          </Typography>
          <CartAddItemButton
            onClick={() => {
              setOptionCartInfo({
                ...itemData,
                qty: optionCartInfo.qty + 1,
              });
            }}
            type="plus"
            disabled={!getPlusButtonStatus()}
          />
        </Box>
      );
    } else {
      return null;
    }
  };

  const rootClass = [classes.root];
  if (getCurrentQty() > 0) rootClass.push(classes.NoSelect);

  return (
    <Box className={rootClass.join(' ')} role="button" onClick={handleClickItem}>
      <Box className={classes.ImgBox} style={{ backgroundImage: `url(${getItemImage()})`, ...getBackImgStyle() }}></Box>
      {renderCartControl()}
      <Typography variant="h3" className={classes.ProductName}>
        {itemData.name}
      </Typography>
      {renderPriceInfo()}
    </Box>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      height: '60px',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      position: 'relative',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(186, 195, 201, 0.2)',
      },
    },
    NoSelect: {
      cursor: 'auto',
      backgroundColor: '#fff !important',
    },
    ImgBox: {
      boxSizing: 'border-box',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      flex: '0 0 69px',
      margin: '0 17px 0 0',
      height: '100%',
    },
    ControlPanel: {
      boxSizing: 'border-box',
      display: 'flex',
      flex: '0 0 70px',
      margin: '0 9px 0 0',
    },
    Count: {
      fontSize: '20px',
      color: '#55cc66',
      fontWeight: 'normal',
      minWidth: '30px',
      textAlign: 'center',
    },
    ProductName: {
      margin: '0 7px',
      flex: '1 1 auto',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    Price: {
      margin: '0 13px 0 auto',
      flex: '0 0 50px',
    },
  })
);

export default AddOnItem;
