import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import OrderView from '../../../OrderView';

const CartButton = ({ wrapperClass, orderTypesList }) => {
  const classes = useStyles();

  const [showOrderView, setShowOrderView] = useState(false);

  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);
  return (
    <Box className={rootClasses.join(' ')}>
      <Button
        className={classes.MainButton}
        onClick={() => {
          setShowOrderView(!showOrderView);
        }}
      >
        <ShoppingCartOutlinedIcon className={classes.CartIcon} />
        <Typography className={classes.Price} variant="h2">
          45.00
        </Typography>
      </Button>
      {showOrderView && (
        <OrderView
          orderTypesList={orderTypesList}
          hideModal={() => {
            setShowOrderView(false);
          }}
        />
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      position: 'relative',
    },
    MainButton: {
      backgroundColor: theme.palette.primary.greyBack,
      borderRadius: '4px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '7px',
      paddingRight: '7px',
      minWidth: '40px',
      '& .MuiButton-label': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    CartIcon: {
      width: '26px',
      height: '26px',
      color: theme.palette.primary.title,
    },
    Price: {
      marginLeft: '7px',
      fontSize: '20px',
      fontWeight: 'normal',
    },
  })
);
export default CartButton;
