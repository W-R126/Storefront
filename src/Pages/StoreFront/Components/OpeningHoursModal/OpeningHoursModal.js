import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';

import { HHMMtoHHMMA } from '../../../../utils/string';

const OpeningHoursModal = ({ open, hideModal, store_openings }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={hideModal} fullWidth={true} maxWidth="sm" className={classes.root}>
      <h3 className={classes.Title}>Opening hours</h3>
      <Grid container className={classes.Header}>
        <Grid item xs={4}>
          Day
        </Grid>
        <Grid item xs={4}>
          Opening Time
        </Grid>
        <Grid item xs={4}>
          Closing Time
        </Grid>
      </Grid>
      {store_openings
        .filter((item) => !item.closed)
        .map((opening_hour, nIndex) => {
          return (
            <Grid container className={classes.MainContent} key={opening_hour.day}>
              <Grid item xs={4} className={classes.DayName}>
                {opening_hour.day.substr(0, 3)}
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  {opening_hour.opening_times.map((hourItem, nIndex) => {
                    return (
                      <Grid item xs={12} className={classes.TimeValue} key={'open' + opening_hour.day + nIndex}>
                        {HHMMtoHHMMA(hourItem.open)}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  {opening_hour.opening_times.map((hourItem, nIndex) => {
                    return (
                      <Grid item xs={12} className={classes.TimeValue} key={'close' + opening_hour.day + nIndex}>
                        {HHMMtoHHMMA(hourItem.close)}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      {store_openings
        .filter((item) => item.closed)
        .map((opening_hour, nIndex) => {
          if (opening_hour.day === null) return undefined;
          return (
            <Grid container className={classes.MainContent} key={'closed' + nIndex}>
              <Grid item xs={4} className={classes.DayName}>
                {opening_hour.day.substr(0, 3)}
              </Grid>
              <Grid item xs={4}>
                Closed
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          );
        })}
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiDialog-paper': {
        padding: '30px 45px 10px',
        maxWidth: '480px',
      },
    },
    Title: {
      fontSize: '20px',
      lineHeight: '24px',
      textAlign: 'center',
      color: theme.palette.primary.title,
      margin: 0,
    },
    Header: {
      color: theme.palette.primary.title,
      fontSize: '14px',
      lineHeight: '18px',
      marginTop: '24px',
      marginBottom: '10px',
    },
    MainContent: {
      fontSize: '16px',
      lineHeight: '19px',
      color: theme.palette.primary.text,
      marginBottom: '13px',

      '& .MuiGrid-item': {
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
      },
    },
    DayName: {
      fontWeight: 500,
      alignItems: 'flex-start !important',
      paddingTop: '16px',
    },
    TimeValue: {
      marginBottom: '15px',
    },
  })
);

export default OpeningHoursModal;
