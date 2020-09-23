import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import CloseIconButton from '../../../../SharedComponents/CloseIconButton';

const ProductViewSkeleton = ({ hideModal }) => {
  const classes = useStyles();

  return (
    <>
      <CloseIconButton onClick={hideModal} wrapperClass={classes.CloseButtonWrapper} />
      <Box className={classes.TopSection}>
        <Box className={classes.ShowMobile} style={{ flexDirection: 'column' }}>
          <Skeleton style={{ width: '50%' }} />
          <Skeleton style={{ width: '30%' }} />
          <Skeleton style={{ width: '30%' }} />
        </Box>
        <Skeleton varaiant="rect" className={classes.SkeletonProductImg} />
        <Box className={classes.ProductInfoDiv}>
          <Box className={classes.ShowDesktop} style={{ flexDirection: 'column' }}>
            <Skeleton style={{ width: '50%' }} />
            <Skeleton style={{ width: '30%' }} />
            <Skeleton style={{ width: '30%' }} />
            <Skeleton style={{ width: '70%', height: '40px' }} />
          </Box>
          <Box className={classes.CartBox}>
            <Box style={{ boxSizing: 'border-box', flex: '1 1 auto' }}>
              <Skeleton className={classes.SkeltonItem1} />
              <Skeleton className={classes.SkeltonItem1} />
            </Box>
            <Box className={classes.CartControlField}>
              <Skeleton style={{ height: '80px', width: '100px', marginLeft: '15px' }} />
              <Skeleton style={{ height: '80px', width: '120px', marginLeft: '15px' }} />
            </Box>
          </Box>

          <Skeleton className={classes.ShowMobile} style={{ marginTop: '31px', height: '40px' }} />
        </Box>
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    SkeltonItem1: {
      minWidth: '100px',
    },
    SkeletonProductImg: {
      flex: '0 0 344px',
      width: '344px',
      height: '335px',
      transform: 'scale(1, 1)',
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
    CartControlField: {
      display: 'flex',
      marginTop: '31px',
      boxSizing: 'border-box',
      '@media screen and (max-width: 768px)': {
        marginTop: 0,
      },
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
export default ProductViewSkeleton;
