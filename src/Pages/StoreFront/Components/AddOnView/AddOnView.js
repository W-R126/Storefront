import React from 'react';

import _, { set } from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dialog, Box, Button, Typography, Grid } from '@material-ui/core';

import AddOnItem from '../../../../SharedComponents/AddOnItem';
import CloseIconButton from '../../../../SharedComponents/CloseIconButton';

const AddOnView = ({ open, hideModal, productId, addOnData, selectedAddOns, setSelectedAddOns }) => {
  const classes = useStyles();

  const getAddOnItemInfo = (optionItemId) => {
    const findOne = selectedAddOns.find((item) => item.id === optionItemId);
    return findOne;
  };

  const changeAddOnData = (newData) => {
    if (newData.qty === 0) setSelectedAddOns([...selectedAddOns.filter((item) => item.id !== newData.id)]);
    else {
      const findOne = selectedAddOns.find((item) => item.id === newData.id);
      if (findOne)
        setSelectedAddOns([
          ...selectedAddOns.map((item) => {
            if (item.id === newData.id) return newData;
            return item;
          }),
        ]);
      else setSelectedAddOns([...selectedAddOns, newData]);
    }
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
          <Box className={classes.Panel}>
            <Typography variant="h2" className="title">
              {item.group}
            </Typography>
            <Grid container spacing={3}>
              {item.options.map((itemOption) => {
                return (
                  <Grid item md={4} sm={12} xs={12}>
                    <AddOnItem
                      itemData={itemOption}
                      selectedInfo={getAddOnItemInfo(itemOption.id)}
                      setSelectedAddOns={(newData) => {
                        changeAddOnData(newData);
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}
      <Box className={classes.Footer}>
        <Typography variant="h1" className={classes.FooterPriceLabel}>
          Price:
        </Typography>
        <Typography variant="h1" className={classes.FooterPrice}>
          £19.50
        </Typography>
        <Button variant="contained" color="primary" className={classes.AddCartButton}>
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
    Panel: {
      display: 'flex',
      flexDirection: 'column',
      margin: '30px 0 0 0',
      '& .title': {
        fontWeight: 500,
        margin: '0 0 20px 0',
      },
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
