import React from 'react';

import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, TextField, Typography, InputAdornment, CircularProgress } from '@material-ui/core';

import { getEmailValidationSchema } from '../../../../validators/login-validation';
import { CHECK_EMAIL_AVAILABILITY } from '../../../../graphql/auth/auth-query';
import { SEND_RESET_CODE } from '../../../../graphql/auth/auth-mutation';
import CloseIcon from '@material-ui/icons/Close';

const InputContactView = ({ formData, onChange, gotoNext, gotoLogin }) => {
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

  const [checkEmail, { data: emailData, error: emailError, loading: emailLoading }] = useLazyQuery(
    CHECK_EMAIL_AVAILABILITY,
    {
      onCompleted(d) {
        if (d) {
          onChange({
            ...formData.email,
            validate: true,
            errorMsg: '',
          });
        } else {
          onChange({
            ...formData.email,
            validate: false,
            errorMsg: 'This email is not exist',
          });
        }
      },
      onError(d) {
        onChange({
          ...formData.email,
          validate: false,
          errorMsg: 'This email is not exist',
        });
      },
    }
  );

  const [
    sendResetCode,
    { data: sendResetCodeData, loading: sendResetCodeLoading, error: sendResetCodeError },
  ] = useMutation(SEND_RESET_CODE, {
    onCompleted(d) {
      gotoNext();
    },
  });

  const handleClickContinue = () => {
    sendResetCode({
      variables: {
        email: formData.email.value,
      },
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.Title}>
        Forgot Password
      </Typography>
      <Typography variant="h6" className={classes.SubTitle}>
        Enter your email address to mobile to continue.
      </Typography>
      <Box className={classes.InputWrapper}>
        <TextField
          className={classes.LoginInput}
          id="login-email"
          label="Email"
          fullWidth
          value={formData.email.value}
          onChange={(e) => handleChangeEmail(e)}
          onBlur={(e) => {
            if (e.target.value.length > 0 && formData.email.validate)
              checkEmail({
                variables: {
                  email: e.target.value,
                },
              });
          }}
          error={!formData.email.validate}
          helperText={formData.email.errorMsg}
          size="medium"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {emailLoading && <CircularProgress size={20} />}
                {!formData.email.validate && <CloseIcon color="error" />}
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.ContinueButton}
        disabled={!formData.email.validate || formData.email.value.length === 0 || emailLoading}
        onClick={handleClickContinue}
      >
        Continue
      </Button>
      <Button className={classes.SignUpButton} onClick={gotoLogin}>
        Login
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
      margin: '38px auto 0',
      fontSize: '16px',
      color: theme.palette.primary.text,
      lineHeight: '19px',
      fontWeight: 300,
      maxWidth: '100px',
      '& .SignupText': {
        marginLeft: '5px',
        cursor: 'pointer',
        color: theme.palette.primary.main,
      },
    },
  })
);

export default InputContactView;
