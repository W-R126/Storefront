import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductCardSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton className={classes.SkelotonProductImg} />
      <div className={classes.ProductContent}>
        <div className={classes.TopSection}>
          <div className={classes.LeftInfo}>
            <Skeleton className={classes.SkeletonTitle} animation="pulse" />
            <Skeleton className={classes.SkeltonStatus} />
          </div>
          <div className={classes.Value}>
            <Skeleton className={classes.SkeltonStatus} />
          </div>
        </div>
        <Skeleton variant="rect" height={40} />
        <div className={classes.Bottom}>
          <Skeleton width={60} style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    SkelotonProductImg: {
      flex: '0 0 95px',
      height: '116px',
      transform: 'scale(1, 1)',
    },
    ProductContent: {
      flex: '1 1 100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '5px 17px 11px 10px',
    },
    TopSection: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    LeftInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    Value: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginLeft: '15px',
      lineHeight: '18px',
      fontSize: '12px',
    },
    Bottom: {
      display: 'flex',
      marginTop: 'auto',
    },
    SkeletonTitle: {
      width: '100px',
    },
    SkeltonStatus: {
      width: '60px',
    },
  })
);

export default ProductCardSkeleton;
