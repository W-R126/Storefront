import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const FORGOT_ENTER_ADDRESS_VIEW = 0;
const FORGOT_LOGIN_VIEW = 1;

const ForgotPasswordPanel = ({ gotoLogin }) => {
  const classes = useStyles();
  const [curStatus, setCurStatus] = useState(FORGOT_ENTER_ADDRESS_VIEW);
  const [email, setEmail] = useState({
    value: '',
    validate: true,
    errorMsg: '',
  });

  const handleChangeEmail = (e) => {
    setEmail({
      value: e.target.value,
      validate: e.target.value.length > 0 ? true : false,
      errorMsg: e.target.value.length > 0 ? '' : 'This field is required',
    });
  };

  const handleClickAction = () => {
    if (curStatus === FORGOT_ENTER_ADDRESS_VIEW) {
      setCurStatus(FORGOT_LOGIN_VIEW);
    } else if (curStatus === FORGOT_LOGIN_VIEW) {
      gotoLogin();
    }
  };

  const handleClickFooter = () => {
    if (curStatus === FORGOT_ENTER_ADDRESS_VIEW) {
      gotoLogin();
    } else if (curStatus === FORGOT_LOGIN_VIEW) {
      console.log('Click Resend Email');
    }
  };

  return (
    <div className={classes.root}>
      <h3 className={classes.Title}>Forgot Password</h3>
      <p
        className={classes.Description}
        style={{ textAlign: curStatus === FORGOT_ENTER_ADDRESS_VIEW ? 'center' : 'left' }}
      >
        {curStatus === FORGOT_ENTER_ADDRESS_VIEW && 'Enter your email address to mobile to continue.'}
        {curStatus === FORGOT_LOGIN_VIEW && (
          <span style={{ textAlign: 'left' }}>
            We have sent an email to your address <strong>{email.value}</strong> with steps to reset your passsrod.
            Check your email to reset your password.
          </span>
        )}
      </p>
      {curStatus === FORGOT_ENTER_ADDRESS_VIEW && (
        <Box className={classes.EmailWrapper}>
          <TextField
            className={classes.LoginInput}
            id="login-email"
            label="Email Or Phone"
            fullWidth
            value={email.value}
            onChange={(e) => handleChangeEmail(e)}
            error={!email.validate}
            helperText={email.errorMsg}
          />
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.ContinueButton}
        disabled={!email.validate || email.value.length === 0}
        onClick={handleClickAction}
      >
        {curStatus === FORGOT_ENTER_ADDRESS_VIEW && 'Continue'}
        {curStatus === FORGOT_LOGIN_VIEW && 'Login'}
      </Button>

      <Button
        className={classes.SignUpButton}
        onClick={handleClickFooter}
        style={{ marginTop: curStatus === FORGOT_ENTER_ADDRESS_VIEW ? '33px' : '40px' }}
      >
        {curStatus === FORGOT_ENTER_ADDRESS_VIEW && 'Login'}
        {curStatus === FORGOT_LOGIN_VIEW && 'Click here to resend email if you did not receive the mail.'}
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '10px',
      paddingRight: '10px',
      alignItems: 'center',
      marginTop: '-25px',
      flex: '1 1 100%',
    },
    Title: {
      fontSize: '22px',
      lineHeight: 1.36,
      letterSpacing: '0.41px',
      color: theme.palette.primary.text,
      textAlign: 'center',
      margin: 0,
    },
    Description: {
      fontSize: '18px',
      fontWeight: 300,
      lineHeight: 1.22,
      color: theme.palette.primary.text,
      margin: '40px 0 0 0',
      textAlign: 'center',
    },
    EmailWrapper: {
      width: '100%',
      height: '60px',
      marginTop: '40px',
    },
    ContinueButton: {
      marginTop: '30px',
      height: '50px',
    },
    SignUpButton: {
      fontSize: '16px',
      color: theme.palette.primary.text,
      lineHeight: '19px',
      fontWeight: 300,
    },
  })
);

export default ForgotPasswordPanel;
