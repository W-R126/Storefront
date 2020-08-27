import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';

import StoreLogoImg from '../../../../assets/img/storelogo.jpg';

const StoreInfo = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item md={6}>
        <Grid container>
          <Grid item md={12} className={classes.StoreLogoInfo}>
            <img src={StoreLogoImg} alt="store logo" />
            <div className={classes.TitleContent}>
              <h4>SPAR Oxford</h4>
              <p>Supermarket</p>
            </div>
          </Grid>
          <Grid item md={12} className={classes.Description}>
            Come and shop in your local supermarket. We have great deals on groceries, tobacco and alcohol. Get Oyster,
            National Lottery, Paypoint, Newspaper, Tobacco, Alcohol, Groceries, Soft Drink, Household, Pet food, Chilled
            food, frozen food, Quality fresh vegetables and Food to Go.
          </Grid>
          <Grid item md={12}>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>
                <strong>Address:</strong>
              </div>
              <div className={classes.LabelValue}>10 Silbury Boulevard, Milton Keynes, MK9 3HU</div>
            </div>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>
                <strong>Hours:</strong>
              </div>
              <div className={classes.LabelValue}>
                <span className={classes.StoreStatus}>Open</span>
                Closing at 11:00 PM
              </div>
            </div>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>
                <strong>Phone:</strong>
              </div>
              <div className={classes.LabelValue}>Call</div>
            </div>
            <div className={classes.DetailInfoItem}>
              <div className={classes.LableName}>
                <strong>Orders:</strong>
              </div>
              <div className={classes.LabelValue}>
                <div className={classes.OrderItem}>
                  <div className={classes.IconCircle}>
                    <CheckIcon />
                  </div>
                  Click & Collect
                </div>
                <div className={classes.OrderItem}>
                  <div className={classes.IconCircle}>
                    <CheckIcon />
                  </div>
                  Delivery
                </div>
              </div>
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
    OrderItem: {
      marginRight: '27px',
      display: 'flex',
      alignItems: 'center',
    },
    IconCircle: {
      width: '24px',
      height: '24px',
      background: 'rgba(186, 195, 201, 0.4)',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '13px',
      '& .MuiSvgIcon-root': {
        width: '20px',
        color: '#20a044',
      },
    },
    StoreStatus: {
      marginRight: '20px',
      color: '#55cc66',
      fontWeight: 600,
    },
  })
);

export default StoreInfo;
