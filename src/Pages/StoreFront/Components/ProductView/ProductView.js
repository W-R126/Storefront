import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ProductView = ({ open, hideModal, productInfo, currencyData }) => {
  const classes = useStyles();

  const { orderType } = useSelector((state) => ({
    orderType: state.storeReducer.orderType,
  }));
  return (
    <Dialog open={open} onClose={hideModal} fullWidth={true} maxWidth="lg" className={classes.root}>
      <IconButton onClick={hideModal} className={classes.CloseButton}>
        <CloseIcon color="Primary.title" />
      </IconButton>
      <Box className={classes.TopSection}>
        <div className={classes.ProductImg}></div>
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
        maxWidth: '1180px',
        borderRadius: '10px',
        boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
        border: 'solid 1px rgba(186, 195, 201, 0.5)',
        backgroundColor: '#ffffff',
        position: 'relative',
      },
    },
    CloseButton: {
      width: '40px',
      height: '40px',
      backgroundColor: 'rgba(186, 195, 201, 0.3)',
      position: 'absolute',
      top: '15px',
      right: '15px',
    },
    TopSection: {
      display: 'flex',
      boxSizing: 'border-box',
    },
    ProductImg: {},
  })
);
export default ProductView;
