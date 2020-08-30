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
        <PasswordInput label="Enter Password" inputData={password} onChange={(newValue) => onChange({ ...newValue })} />
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
      paddingLeft: '10px',
      paddingRight: '10px',
      alignItems: 'center',
      marginTop: '-5px',
    },
    Title: {
      fontSize: '22px',
      lineHeight: 1.36,
      letterSpacing: '0.41px',
      color: theme.palette.primary.dark,
      textAlign: 'center',
      margin: 0,
    },
    EmailDiv: {
      fontSize: '16px',
      fontWeight: 600,
      color: theme.palette.primary.dark,
      margin: '35px 0 0 0',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
    },
    BackButton: {
      padding: 0,
    },
    PasswordInputWrapper: {
      marginTop: '35px',
      position: 'relative',
      width: '100%',
    },
    LoginButton: {
      marginTop: '35px',
      height: '50px',
    },
    Footer: {
      marginTop: '35px',
      fontSize: '16px',
      color: theme.palette.primary.dark,
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
