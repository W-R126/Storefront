import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';

const CheckEmailView = ({ formData, gotoLogin, gotoBack }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.Title}>
        Forgot Password
      </Typography>
      <Typography variant="h6" className={classes.SubTitle}>
        {`We have sent an email  to your address ${formData.email.value} with steps to reset your passsrod. Check your email to reset your password.`}
      </Typography>
      <Button variant="contained" color="primary" fullWidth className={classes.LoginButton} onClick={gotoLogin}>
        Login
      </Button>
      <Button className={classes.ResendButton} onClick={gotoBack}>
        Click here to resend email if you did not receive the mail.
      </Button>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    Title: {
      lineHeight: '22px',
      fontSize: '18px',
      fontWeight: 500,
      color: theme.palette.primary.title,
      textAlign: 'center',
      margin: '0',
    },
    SubTitle: {
      lineHeight: '19px',
      fontSize: '16px',
      fontWeight: 300,
      color: theme.palette.primary.text,
      margin: '40px 0 0 0',
      textAlign: 'left',
    },
    LoginButton: {
      marginTop: '40px',
      height: '50px',
    },
    ResendButton: {
      margin: '38px auto 0',
      fontSize: '16px',
      color: theme.palette.primary.text,
      lineHeight: '19px',
      fontWeight: 300,
    },
  })
);

export default CheckEmailView;
