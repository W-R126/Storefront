import React from 'react';
import _ from 'lodash';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import { getStoreOpenStatus, getStorePos } from '../../../../utils/store';
import StoreMap from '../StoreMap';
import OrderTypesDiv from '../OrderTypesDiv';
import LogoPlaceHolderImg from '../../../../assets/img/product-card-placeholder.png';

const StoreInfo = ({ loading, error, store, showOpeningHours }) => {
  const classes = useStyles();

  const getFullAddress = () => {
    let address = '';
    const addressKeys = ['line1', 'line2', 'city_town', 'postcode'];
    const addresses = _.get(store, 'address', {});

    addressKeys.forEach((item, nIndex) => {
      const strValue = _.get(addresses, item, '');
      if (strValue && strValue.length > 0) {
        address += strValue;
        if (nIndex < addressKeys.length - 1) address += ', ';
      }
    });
    return address;
  };

  const renderHoursStatus = () => {
    const storeOpenStatus = getStoreOpenStatus(store.store_openings);

    return (
      <>
        <span
          className={`${classes.StoreStatus} ${storeOpenStatus.closed ? '' : classes.StoreStatusOpen}`}
          onClick={showOpeningHours}
          role="button"
        >
          {storeOpenStatus.closed ? 'Close' : 'Open'}
        </span>
        <span style={{ cursor: 'pointer' }} onClick={showOpeningHours} role="button">
          {storeOpenStatus.nextStatus}
        </span>
      </>
    );
  };

  const getLogoImg = () => {
    if (loading) return LogoPlaceHolderImg;
    if (!store || !store.merchant) return LogoPlaceHolderImg;
    const url = _.get(store.merchant.logo, 'url', null);
    if (url === null || url.length === 0) return LogoPlaceHolderImg;
    return url;
  };

  if (loading) {
    return (
      <Grid container className={classes.root}>
        <Grid item md={6} xs={12} className={classes.MainInfo}>
          <Grid container>
            <Grid item xs={12} className={classes.StoreLogoInfo}>
              <Skeleton className={classes.SkeletonStoreLogo} variant="rect" />

              <div className={classes.TitleContent}>
                <Skeleton variant="rect" width={140} height={20} />
                <Skeleton width={140} height={18} />
              </div>
            </Grid>

            <Grid item xs={12} className={classes.Description}>
              <Skeleton variant="rect" width="100%" height={24} />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.DetailInfoItem}>
                <div className={classes.LableName}>
                  <Skeleton style={{ marginRight: '10px' }} />
                </div>
                <div className={classes.LabelValue}>
                  <Skeleton width="80%" />
                </div>
              </div>
              <div className={classes.DetailInfoItem}>
                <div className={classes.LableName}>
                  <Skeleton style={{ marginRight: '10px' }} />
                </div>
                <div className={classes.LabelValue}>
                  <Skeleton width="80%" />
                </div>
              </div>
              <div className={classes.DetailInfoItem}>
                <div className={classes.LableName}>
                  <Skeleton style={{ marginRight: '10px' }} />
                </div>
                <div className={classes.LabelValue}>
                  <Skeleton width="80%" />
                </div>
              </div>
              <div className={classes.DetailInfoItem}>
                <div className={classes.LableName}>
                  <Skeleton style={{ marginRight: '10px' }} />
                </div>
                <div className={classes.LabelValue}>
                  <Skeleton width="80%" />
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12} className={classes.MapGrid}>
          <Box className={classes.MapOverlay}></Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className={classes.root}>
      <Grid item md={6} xs={12} className={classes.MainInfo}>
        <Grid container>
          <Grid item xs={12} className={classes.StoreLogoInfo}>
            <Avatar className={classes.StoreLogo} src={getLogoImg()} alt="store logo" />
            <div className={classes.TitleContent}>
              <h4>{store.name}</h4>
              <p>{_.get(_.get(store, 'merchant', {}), 'business_type', '')}</p>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.Description}>
            {store.about_story}
          </Grid>
          <Grid item xs={12}>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>Address:</div>
              <div className={classes.LabelValue}>{getFullAddress()}</div>
            </div>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>Hours:</div>
              <div className={classes.LabelValue}>{renderHoursStatus()}</div>
            </div>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>Phone:</div>
              <div className={classes.LabelValue}>{store.phone}</div>
            </div>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>Orders:</div>
              <OrderTypesDiv warpperClassname={classes.LabelValue} orderTypes={_.get(store, 'order_types', [])} />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12} className={classes.MapGrid}>
        {getStorePos(store) !== null && <StoreMap mapCenter={getStorePos(store)} />}
        <Box className={classes.MapOverlay}></Box>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.text,
      backgroundColor: '#fff',
    },
    MainInfo: {
      paddingLeft: '40px',
      '@media screen and (max-width: 959px)': {
        paddingRight: '40px',
      },
      '@media screen and (max-width: 767px)': {
        paddingLeft: '15px',
        paddingRight: '20px',
      },
    },
    StoreLogoInfo: {
      display: 'flex',
      marginTop: '-25px',
      '@media screen and (max-width: 767px)': {
        marginTop: '-5px',
      },
    },
    StoreLogo: {
      width: '105px',
      height: '105px',
      borderRadius: '55px',
      boxShadow: '0 2px 4px 0 #f3f5f7',
      border: 'solid 4px rgba(186, 195, 201, 0.5)',
      boxSizing: 'border-box',
      '@media screen and (max-width: 767px)': {
        width: '70px',
        height: '70px',
        borderRadius: '35px',
        border: 'solid 2px rgba(186, 195, 201, 0.5)',
      },
    },
    SkeletonStoreLogo: {
      border: 'none',
      width: '105px',
      height: '105px',
      borderRadius: '55px',
      '@media screen and (max-width: 767px)': {
        width: '70px',
        height: '70px',
        borderRadius: '35px',
      },
    },
    TitleContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '10px 0 0 13px',
      '@media screen and (max-width: 767px)': {
        marginTop: '5px',
      },
      '& h4': {
        fontSize: '18px',
        color: theme.palette.primary.title,
        fontWeight: 500,
        margin: 0,
        padding: 0,
      },
      '& p': {
        fontSize: '14px',
        lineHeight: '1.29',
        margin: '4px 0 0 0',
        padding: 0,
        fontWeight: 300,
        '@media screen and (max-width: 767px)': {
          marginTop: '1px',
        },
      },
    },
    Description: {
      color: theme.palette.primary.text,
      fontSize: '16px',
      margin: '3px 0 11px',
      lineHeight: 1.5,
      fontWeight: 300,
      '@media screen and (max-width: 767px)': {
        fontSize: '14px',
      },
    },
    DetailInfoItem: {
      display: 'flex',
      width: '100%',
      margin: '0 0 19px 0',
      fontSize: '16px',
      overflow: 'hidden',
      '&:last-child': {
        marginBottom: '6px',
      },
    },
    LableName: {
      color: theme.palette.primary.text,
      flex: '0 0 100px',
      fontWeight: 'normal',
    },
    LabelValue: {
      display: 'flex',
      color: theme.palette.primary.text,
      fontWeight: 300,
      flex: ' 1 1 100%',
      overflow: 'hidden',
      flexWrap: 'wrap',
    },
    StoreStatus: {
      marginRight: '20px',
      fontWeight: 'normal',
      cursor: 'pointer',
    },
    StoreStatusOpen: {
      color: '#55cc66',
    },
    MapGrid: {
      position: 'relative',
      '@media screen and (max-width: 959px)': {
        height: '317px',
      },
    },
    MapOverlay: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0.1) 60%);',
      '@media screen and (max-width: 959px)': {
        display: 'none',
      },
    },
  })
);

export default StoreInfo;
