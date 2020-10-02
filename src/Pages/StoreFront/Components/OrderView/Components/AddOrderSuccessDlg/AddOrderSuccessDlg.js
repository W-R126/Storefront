import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Box, Button, Typography } from '@material-ui/core';

const AddOrderSuccessDlg = (hideModal) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Paper className={classes.MainModal} aria-labelledby="simple-dialog-title" open={true}>
        <Typography variant="h1" className={classes.Title} style={{ fontWeight: 'bold' }}>
          Great!
        </Typography>
        <Typography variant="h1" className={classes.Title} style={{ marginTop: '15px' }}>
          Your order is submitted successfully. You will be notified when the store accepts your order.
        </Typography>
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
          <Button variant="contained" onClick={hideModal} color="primary" className={classes.Confirmbutton}>
            Ok
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(186, 195, 201, 0.5)',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    MainModal: {
      position: 'absolute',
      width: '100%',
      maxWidth: '570px',
      height: 'auto',
      borderRadius: '10px',
      boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      backgroundColor: '#fff',
      padding: '40px 30px',
      display: 'flex',
      justifyContent: 'center',
      margin: 0,
      flexDirection: 'column',

      '@media screen and (max-width: 550px)': {
        left: '10px',
        width: 'calc(100% - 20px)',
      },
    },
    Title: {
      textAlign: 'center',
      fontSize: '20px',
      color: theme.palette.primary.text,
    },
    Confirmbutton: {
      width: '223px',
      height: '50px',
      margin: '25px 0 0 0',
      '@media screen and (max-width: 550px)': {
        width: '120px',
      },
    },
  })
);

export default AddOrderSuccessDlg;
