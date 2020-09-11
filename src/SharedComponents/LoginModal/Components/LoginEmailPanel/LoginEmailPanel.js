import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import { getEmailValidationSchema } from '../../../../validators/login-validation';

const LoginEmailPanel = ({ email, onChange, gotoPassword, gotoSignUp }) => {
  const classes = useStyles();
  const schema = getEmailValidationSchema();

  const handleChangeEmail = (e) => {
    schema
      .validate({ email: e.target.value })
      .then((res) => {
        onChange({
          value: res.email,
          validate: true,
          errorMsg: '',
        });
      })
      .catch((err) => {
        onChange({
          value: err.value.email,
          validate: false,
          errorMsg: err.errors[0],
        });
      });
  };

  return (
    <div className={classes.root}>
      <h3 className={classes.Title}>Sign in</h3>
      <p className={classes.Description}>Enter your email address to continue</p>
      <Box className={classes.InputWrapper}>
        <TextField
          className={classes.LoginInput}
          id="login-email"
          label="Email"
          fullWidth
          value={email.value}
          onChange={(e) => handleChangeEmail(e)}
          error={!email.validate}
          helperText={email.errorMsg}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.ContinueButton}
        disabled={!email.validate || email.value.length === 0}
        onClick={gotoPassword}
      >
        Continue
      </Button>
      <Button className={classes.SignUpButton} onClick={gotoSignUp}>
        New to Myda? <span className="SignupText">Signup</span>
      </Button>
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
    Description: {
      fontSize: '18px',
      fontWeight: 300,
      lineHeight: 1.22,
      color: theme.palette.primary.text,
      margin: '40px 0 0 0',
      textAlign: 'center',
    },
    InputWrapper: {
      marginTop: '35px',
      height: '75px',
      minHeight: '75px',
      width: '100%',
    },
    LoginInput: {
      '& .MuiInput-input': {
        height: '37px',
        padding: 0,
      },
    },
    ContinueButton: {
      marginTop: '20px',
      height: '50px',
    },
    SignUpButton: {
      marginTop: '38px',
      fontSize: '16px',
      color: theme.palette.primary.text,
      lineHeight: '19px',
      fontWeight: 300,
      '& .SignupText': {
        marginLeft: '5px',
        cursor: 'pointer',
        color: theme.palette.primary.main,
      },
    },
  })
);

export default LoginEmailPanel;
