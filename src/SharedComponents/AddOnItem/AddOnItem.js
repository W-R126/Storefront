import React from 'react';
import { useSelector } from 'react-redux';

import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ListItem, Box, Typography } from '@material-ui/core';
import CartAddItemButton from '../CartAddItemButton';
import { formatPrice } from '../../utils/string';
import { getCurrency } from '../../utils/store';
import { checkAddonItemMinsuButtonStatus, checkAddonItemPlusButtonStatus } from '../../utils/product';

const AddOnItem = ({ wrapperClass, itemData, groupInfo, itemCartInfo, setItemCartInfo }) => {
  const { storeInfo } = useSelector((state) => ({
    storeInfo: state.storeReducer.storeInfo,
  }));
  const classes = useStyles();

  const getItemImage = () => {
    const imgArr = _.get(itemData, 'images', []);
    if (imgArr.length === 0) return '';
    else if (imgArr[0].thumbnail === '' || imgArr[0].thumbnail === null) return '';
    else return imgArr[0].thumbnail;
  };

  const getBackImgStyle = () => {
    const imgBack = getItemImage();
    if (imgBack.length > 0) {
      return { backgroundImage: `url(${imgBack})` };
    } else {
      return { backgroundColor: 'rgba(225, 234, 241, 0.5)' };
    }
  };

  const handleClickItem = (e) => {
    if (itemCartInfo) return false;
    else {
      setItemCartInfo({
        ...itemData,
        qty: 1,
      });
    }
  };

  const getCurrentQty = () => {
    return _.get(itemCartInfo, 'qty', 0);
  };

  const renderCartControl = () => {
    const qty = _.get(itemCartInfo, 'qty', 0);
    if (itemCartInfo && qty > 0) {
      return (
        <Box className={classes.ControlPanel}>
          <CartAddItemButton
            onClick={(e) => {
              e.stopPropagation();
              setItemCartInfo({
                ...itemData,
                qty: itemCartInfo.qty - 1,
              });
            }}
            type="minus"
            disabled={!checkAddonItemMinsuButtonStatus(groupInfo, itemCartInfo)}
          />
          <Typography variant="h2" className={classes.Count}>
            {getCurrentQty()}
          </Typography>
          <CartAddItemButton
            onClick={(e) => {
              e.stopPropagation();
              setItemCartInfo({
                ...itemData,
                qty: itemCartInfo.qty + 1,
              });
            }}
            type="plus"
            disabled={!checkAddonItemPlusButtonStatus(groupInfo, itemCartInfo)}
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
    <ListItem
      // button={!(getCurrentQty() > 0)}
      className={rootClass.join(' ')}
      onClick={(e) => {
        handleClickItem(e);
      }}
    >
      <Box className={classes.ImgBox} style={{ ...getBackImgStyle() }}></Box>
      {renderCartControl()}
      <Typography variant="h3" className={classes.ProductName}>
        {itemData.name}
      </Typography>
      <Typography variant="h3" className={classes.Price}>
        <div style={{ marginRight: '5px' }} dangerouslySetInnerHTML={{ __html: getCurrency(storeInfo) }}></div>
        {formatPrice(itemData.fixed_price, storeInfo)}
      </Typography>
    </ListItem>
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
      padding: 0,
      '&:hover': {
        backgroundColor: 'rgba(186, 195, 201, 0.2)',
      },
      '&.MuiListItem-button': {
        transitionDuration: '50ms',
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
      flex: '0 0 60px',
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
      flex: '1 0 auto',
      textAlign: 'right',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'flex',
      flexWrap: 'nowrap',
    },
  })
);

export default AddOnItem;
