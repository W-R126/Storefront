import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dialog, Box, Button, Typography } from '@material-ui/core';

import AddOnGroup from '../../../../SharedComponents/AddOnGroup';
import CloseIconButton from '../../../../SharedComponents/CloseIconButton';

const AddOnView = ({ open, hideModal, productId, addOnData, selectedAddOns, setSelectedAddOns }) => {
  const classes = useStyles();
  const [errorMsgs, setErrorMsgs] = useState([]);

  useEffect(() => {
    setErrorMsgs([
      ...addOnData.map((item) => {
        return { id: item.id, errorMsg: '' };
      }),
    ]);
  }, [addOnData]);

  const changeAddOns = (groupAddOns) => {
    const findOne = selectedAddOns.find((item) => item.id === groupAddOns.id);
    if (findOne)
      setSelectedAddOns([
        ...selectedAddOns.map((item) => {
          if (item.id === groupAddOns.id)
            return {
              ...groupAddOns,
            };
          else return item;
        }),
      ]);
    else setSelectedAddOns([...selectedAddOns, groupAddOns]);
  };

  const getAddOnOptions = (groupId) => {
    const findOne = selectedAddOns.find((item) => item.id === groupId);
    return findOne;
  };

  const handleClickAddCart = () => {
    const errorMsgTemp = [];
    addOnData.forEach((item) => {
      const groupCart = selectedAddOns.find((itemCart) => itemCart.id === item.id);
      const options = _.get(item, 'options', []);
      const selectedOptions = _.get(groupCart, 'options', []);
      if (options && options.length > 0) {
        if (item.mandatory) {
          if (!selectedOptions || selectedOptions.length === 0)
            errorMsgTemp.push({ id: item.id, errorMsg: `Select an option from ${item.group}` });
        }
        if (!item.multi_selection) {
          if (selectedOptions && selectedOptions.length > 1)
            errorMsgTemp.push({ id: item.id, errorMsg: `Select one option ${item.group}` });
        }
      }
    });
    setErrorMsgs([...errorMsgTemp]);
    if (errorMsgTemp.length > 0) return;
  };

  return (
    <Dialog open={open} onClose={hideModal} fullWidth={true} maxWidth="md" className={classes.root}>
      <CloseIconButton onClick={hideModal} wrapperClass={classes.CloseButtonWrapper} />
      <Typography variant="h1" className={classes.Title}>
        Select Options
      </Typography>
      {addOnData.map((item) => {
        if (item.options.length === 0) return null;
        return (
          <AddOnGroup
            groupInfo={item}
            groupAddOns={getAddOnOptions(item.id)}
            setGroupAddOns={(groupAddOns) => {
              changeAddOns(groupAddOns);
            }}
            errorMsg={errorMsgs.find((itemMsg) => itemMsg.id === item.id)}
          />
        );
      })}
      <Box className={classes.Footer}>
        <Typography variant="h1" className={classes.FooterPriceLabel}>
          Price:
        </Typography>
        <Typography variant="h1" className={classes.FooterPrice}>
          £19.50
        </Typography>
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
      top: '15px',
      right: '15px',
    },
    Title: {
      fontWeight: 500,
    },
    Footer: {
      display: 'flex',
      boxSizing: 'border-box',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '47px 0 0 0',
    },
    FooterPriceLabel: {
      fontWeight: 300,
      color: theme.palette.primary.text,
    },
    FooterPrice: {
      color: theme.palette.primary.text,
      margin: '0 0 0 10px',
    },
    AddCartButton: {
      width: '166px',
      height: '50px',
      margin: '0 0 0 40px',
    },
  })
);
export default AddOnView;
