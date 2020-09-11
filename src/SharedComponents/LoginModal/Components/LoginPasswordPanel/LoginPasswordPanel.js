import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PasswordInput from '../../../PasswordInput';

const LoginPasswordPanel = ({ email, password, onChange, gotoLogin, gotoForgotPassword, onLogin }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3 className={classes.Title}>Sign in</h3>
      <Box className={classes.EmailDiv}>
        <IconButton className={classes.BackButton} onClick={gotoLogin}>
          <ArrowBackIosIcon color="primary" />
        </IconButton>
        {email.value}
        <span></span>
      </Box>
      <Box className={classes.PasswordInputWrapper}>
        <PasswordInput
          label="Enter Password"
          inputData={password}
          onChange={(e) =>
            onChange({
              ...password,
              value: e.target.value,
            })
          }
          onBlur={(e) => {
            if (e.target.value.length === 0) {
              onChange({
                value: e.target.value,
                validate: false,
                errorMsg: 'Required field',
              });
            } else {
              onChange({
                value: e.target.value,
                validate: true,
                errorMsg: '',
              });
            }
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.LoginButton}
        disabled={!password.validate || password.value.length === 0}
        onClick={() => onLogin()}
      >
        Login
      </Button>
      <Box className={classes.Footer}>
        Forgot Password?
        <span onClick={gotoForgotPassword} className={classes.ForgotPasswordButton} role="button">
          Click here
        </span>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    Title: {
      fontSize: '22px',
      lineHeight: 1.36,
      letterSpacing: '0.41px',
      color: theme.palette.primary.text,
      textAlign: 'center',
      margin: '15px 0 0 0',
    },
    EmailDiv: {
      fontSize: '16px',
      fontWeight: 600,
      color: theme.palette.primary.text,
      margin: '30px 0 0 0',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
    },
    BackButton: {
      padding: 0,
      width: '40px',
      height: '40px',
      background: theme.palette.secondary.greyBack,
      borderRadius: '20px',
      paddingLeft: '8px',
    },
    PasswordInputWrapper: {
      marginTop: '35px',
      position: 'relative',
      width: '100%',
      height: '75px',
      minHeight: '75px',
    },
    LoginButton: {
      marginTop: '20px',
      height: '50px',
    },
    Footer: {
      marginTop: '35px',
      fontSize: '16px',
      color: theme.palette.primary.text,
      lineHeight: '19px',
      fontWeight: 300,
    },
    ForgotPasswordButton: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
      marginLeft: '10px',
    },
  })
);

export default LoginPasswordPanel;
