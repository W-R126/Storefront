import React from 'react';
import _ from 'lodash';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import { getStoreOpenStatus } from '../../../../utils/store';
import OrderTypesDiv from '../OrderTypesDiv';

const StoreInfo = ({ loading, error, store }) => {
  const classes = useStyles();

  const getFullAddress = () => {
    let address = '';
    const addressKeys = ['line1', 'line2', 'city_town', 'postcode'];
    addressKeys.forEach((item, nIndex) => {
      address += `${store.address[item]}`;
      if (nIndex < addressKeys.length - 1) address += ', ';
    });
    return address;
  };

  const renderHoursStatus = () => {
    const storeOpenStatus = getStoreOpenStatus(store.store_openings);

    return (
      <>
        <span className={`${classes.StoreStatus} ${storeOpenStatus.closed ? '' : classes.StoreStatusOpen}`}>
          {storeOpenStatus.closed ? 'Close' : 'Open'}
        </span>
        {storeOpenStatus.nextStatus}
      </>
    );
  };

  return (
    <Grid container className={classes.root}>
      <Grid item md={6}>
        <Grid container>
          <Grid item md={12} className={classes.StoreLogoInfo}>
            <Avatar className={classes.StoreLogo} src={store.merchant.logo.url} alt="store logo" />
            <div className={classes.TitleContent}>
              <h4>{store.name}</h4>
              <p>{store.merchant.business_type}</p>
            </div>
          </Grid>
          <Grid item md={12} className={classes.Description}>
            {store.about_story}
          </Grid>
          <Grid item md={12}>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>
                <strong>Address:</strong>
              </div>
              <div className={classes.LabelValue}>{getFullAddress()}</div>
            </div>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>
                <strong>Hours:</strong>
              </div>
              <div className={classes.LabelValue}>{renderHoursStatus()}</div>
            </div>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>
                <strong>Phone:</strong>
              </div>
              <div className={classes.LabelValue}>{store.phone}</div>
            </div>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>
                <strong>Orders:</strong>
              </div>
              <OrderTypesDiv warpperClassname={classes.LabelValue} orderTypes={_.get(store, 'order_types', [])} />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6}></Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: '40px',
      paddingRight: '40px',
      marginTop: '-25px',
      color: theme.palette.primary.dark,
    },
    StoreLogoInfo: {
      display: 'flex',
    },
    StoreLogo: {
      width: '105px',
      height: '105px',
      borderRadius: '55px',
    },
    TitleContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '10px 0 0 13px',
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
      },
    },
    Description: {
      color: theme.palette.primary.dark,
      fontSize: '16px',
      margin: '3px 0 11px',
      lineHeight: 1.5,
    },
    DetailInfoItem: {
      display: 'flex',
      width: '100%',
      margin: '0 0 19px 0',
      fontSize: '16px',
    },
    LableName: {
      color: theme.palette.primary.dark,
      flex: '0 0 100px',
    },
    LabelValue: {
      display: 'flex',
      color: theme.palette.primary.dark,
      fontWeight: 300,
      flex: ' 1 1 100%',
    },
    StoreStatus: {
      marginRight: '20px',
      fontWeight: 600,
    },
    StoreStatusOpen: {
      color: '#55cc66',
    },
  })
);

export default StoreInfo;
