import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dialog, Box, Button, Typography } from '@material-ui/core';
import AddOnGroup from '../../../../SharedComponents/AddOnGroup';
import CloseIconButton from '../../../../SharedComponents/CloseIconButton';
import { formatPrice } from '../../../../utils/string';
import { getCurrency } from '../../../../utils/store';
import { getAddOnCartPrice } from '../../../../utils/product';
import { updateProductCartAction } from '../../../../actions/cartAction';

const AddOnView = ({ open, hideModal, productInfo, curProductCart, productPrice, updateProductCartAction, isNew }) => {
  const classes = useStyles();
  const [addonCarts, setAddonCarts] = useState([]);
  const { storeInfo } = useSelector((state) => ({
    storeInfo: state.storeReducer.storeInfo,
  }));
  const groupRefs = useRef([]);

  useEffect(() => {
    if (!isNew) setAddonCarts([...curProductCart.addons]);
  }, [curProductCart.addons, isNew]);

  const getProductAddons = () => {
    return _.get(productInfo, 'addons', []);
  };

  useEffect(() => {
    groupRefs.current = new Array(getProductAddons().length);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInfo.addons]);

  const changeAddOns = (groupAddOns) => {
    const findOne = addonCarts.find((item) => item.id === groupAddOns.id);
    if (findOne) {
      const addons = _.get(groupAddOns, 'addons', []);
      if (addons.length === 0) {
        setAddonCarts([...addonCarts.filter((item) => item.id !== groupAddOns.id)]);
      } else {
        setAddonCarts([
          ...addonCarts.map((item) => {
            if (item.id === groupAddOns.id)
              return {
                ...groupAddOns,
              };
            else return item;
          }),
        ]);
      }
    } else setAddonCarts([...addonCarts, groupAddOns]);
  };

  const getAddOnOptions = (groupId) => {
    const findOne = addonCarts.find((item) => item.id === groupId);
    return findOne;
  };

  const checkAddonChanges = () => {
    const prevAddons = curProductCart.addons.sort((a, b) => a.id - b.id);
    const curAddons = addonCarts.sort((a, b) => a.id - b.id);

    if (prevAddons.length !== curAddons.length) return true;

    for (let i = 0; i < prevAddons.length; i++) {
      if (prevAddons[i].id !== curAddons[i].id) return true;
      const prevGroupAddons = prevAddons[i].addons.sort((a, b) => a.id - b.id);
      const curGroupAddons = curAddons[i].addons.sort((a, b) => a.id - b.id);
      if (prevGroupAddons.length !== curGroupAddons.length) return true;
      for (let j = 0; j < prevGroupAddons.length; j++) {
        if (prevGroupAddons[j].id !== curGroupAddons[j].id || prevGroupAddons[j].qty !== curGroupAddons[j].qty)
          return true;
      }
    }
    return false;
  };

  const handleClickAddCart = () => {
    let validate = true;
    groupRefs.current.forEach((item) => {
      const groupValidate = item.checkValidate();
      if (!groupValidate) validate = groupValidate;
    });
    if (!validate) return;

    if (isNew || checkAddonChanges()) {
      updateProductCartAction({
        ...curProductCart,
        id: uuidv4(),
        qty: 1,
        addons: [...addonCarts],
      });
    } else {
      updateProductCartAction({
        ...curProductCart,
        qty: curProductCart.qty + 1,
        addons: [...addonCarts],
      });
    }
    hideModal();
  };

  const getAddOnPrice = () => {
    const totalPrice = getAddOnCartPrice(addonCarts, null, null) + productPrice;
    return `${getCurrency(storeInfo)} ${formatPrice(totalPrice, storeInfo)}`;
  };

  return (
    <Dialog open={open} onClose={hideModal} fullWidth={true} maxWidth="md" className={classes.root}>
      <CloseIconButton onClick={hideModal} wrapperClass={classes.CloseButtonWrapper} />
      <Typography variant="h1" className={classes.Title}>
        Select Options
      </Typography>
      <Box className={classes.MainBody}>
        {getProductAddons().map((item, nIndex) => {
          return (
            <AddOnGroup
              key={item.id}
              productId={productInfo.id}
              groupId={item.id}
              productGroupAddonInfo={item}
              groupAddOns={getAddOnOptions(item.id)}
              setGroupAddOns={(groupAddOns) => {
                changeAddOns(groupAddOns);
              }}
              isNew={isNew}
              ref={(el) => (groupRefs.current[nIndex] = el)}
            />
          );
        })}
      </Box>
      <Box className={classes.Footer}>
        <Typography variant="h1" className={classes.FooterPriceLabel}>
          Price:
        </Typography>
        <Typography
          variant="h1"
          className={classes.FooterPrice}
          dangerouslySetInnerHTML={{ __html: getAddOnPrice() }}
        ></Typography>
        <Button variant="contained" color="primary" className={classes.AddCartButton} onClick={handleClickAddCart}>
          Add to cart
        </Button>
      </Box>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiDialog-paper': {
        padding: '50px',
        width: '100%',
        maxWidth: '1240px',
        borderRadius: '10px',
        boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
        border: 'solid 1px rgba(186, 195, 201, 0.5)',
        backgroundColor: '#ffffff',
        position: 'relative',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        '@media screen and (max-width: 768px)': {
          paddingLeft: '15px',
          paddingRight: '15px',
        },
        '@media screen and (max-width: 480px)': {
          padding: '35px 20px 25px',
          marginLeft: '7px',
          marginRight: '7px',
        },
      },
    },
    CloseButtonWrapper: {
      top: '15px',
      right: '15px',
    },
    Title: {
      fontWeight: 500,
    },
    MainBody: {
      flex: '1 1 100%',
      display: 'flex',
      overflowX: 'hidden',
      overflowY: 'auto',
      flexDirection: 'column',
      margin: '30px 0 0 0',
    },
    Footer: {
      display: 'flex',
      boxSizing: 'border-box',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '47px 0 0 0',
      '@media screen and (max-width: 480px)': {
        justifyContent: 'center',
      },
    },
    FooterPriceLabel: {
      fontWeight: 300,
      color: theme.palette.primary.text,
    },
    FooterPrice: {
      color: theme.palette.primary.text,
      margin: '0 0 0 10px',
      display: 'flex',
      flexWrap: 'nowrap',
      whiteSpace: 'nowrap',
    },
    AddCartButton: {
      width: '166px',
      height: '50px',
      margin: '0 0 0 40px',
    },
  })
);
export default connect(null, { updateProductCartAction })(AddOnView);
