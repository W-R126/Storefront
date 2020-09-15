import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper, Typography, Button } from '@material-ui/core';
import PasswordInput from '../../SharedComponents/PasswordInput';
import Spinner from '../../SharedComponents/Spinner';
import { getPasswordValidationSchema } from '../../validators/signup-validation';
import { PASSWORD_RESET } from '../../graphql/auth/auth-mutation';

import LogoSvg from '../../assets/img/logo.svg';

const PASSWORD_VIEW = 0;
const RESULT_VIEW = 1;

const ResetPasswordPage = ({ gotoLogin }) => {
  const classes = useStyles();
  const { code } = useParams();

  const schema = getPasswordValidationSchema();

  const [curPage, setCurPage] = useState(PASSWORD_VIEW);
  // const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    value: '',
    validate: true,
    errorMsg: '',
  });

  const [resetPasswordMutation, { loading: resetMutationLoading }] = useMutation(PASSWORD_RESET);

  const validatePassword = (value) => {
    schema
      .validate({
        password: value,
      })
      .then((res) => {
        setPasswordData({
          value: value,
          validate: true,
          errorMsg: '',
        });
      })
      .catch((err) => {
        console.log(err);
        setPasswordData({
          value: value,
          validate: false,
          errorMsg: err.errors[0],
        });
      });
  };

  const handleClickCreate = () => {
    resetPasswordMutation({
      variables: {
        input: {
          code: code,
          password: passwordData.value,
        },
      },
      onCompleted(d) {
        setCurPage(RESULT_VIEW);
      },
    });
  };

  return (
    <Box className={classes.root}>
      <Paper className={classes.MainContent}>
        <img className={classes.LogoImg} src={LogoSvg} alt="Logo" />

        {curPage === PASSWORD_VIEW && (
          <>
            <Typography className={classes.EnterNewPassword}>Enter your new password.</Typography>
            <Typography className={classes.SubTitle} variant="h6">
              Create new password
            </Typography>
            <Box className={classes.PasswordWrapper}>
              <PasswordInput
                id="reset-password-input"
                label="Password"
                inputData={passwordData}
                onChange={(e) => {
                  setPasswordData({
                    ...passwordData,
                    value: e.target.value,
                  });
                }}
                onBlur={(e) => {
                  validatePassword(e.target.value);
                }}
              />
            </Box>
            <Button
              className={classes.CreateButton}
              variant="contained"
              color="primary"
              onClick={handleClickCreate}
              disabled={!passwordData.validate || passwordData.value.length === 0}
            >
              Create
            </Button>
          </>
        )}
        {curPage === RESULT_VIEW && (
          <>
            <Typography className={classes.SubTitle} variant="h6">
              Your password is changed.
            </Typography>
            <Typography className={classes.ResultDescription}>
              Your password for {'emailaddress'}Your password for ss****ss@gmail.com is successfully changed. Return to
              the application or click below to login.
            </Typography>
            <Button className={classes.LoginButton} variant="contained" color="primary" onClick={gotoLogin}>
              Login
            </Button>
          </>
        )}
        {resetMutationLoading && <Spinner />}
      </Paper>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100vh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
    },
    MainContent: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: '18px 25px',
      width: '438px',
      height: '438px',
      borderRadius: '6px',
      border: 'solid 1px #bac3c9',
      boxShadow: 'none',
      position: 'relative',
    },
    LogoImg: {
      width: '90px',
      height: '36px',
    },
    SubTitle: {
      margin: '20px 0 0 0',
      fontSize: '9px',
      fontWeight: 500,
      lineHeight: '11px',
    },
    EnterNewPassword: {},
    ResultDescription: {
      margin: '29px 0 0 0',
    },
    PasswordWrapper: {
      width: '100%',
      boxSizing: 'border-box',
      height: '97px',
    },
    CreateButton: {
      margin: '20px 0 0 0',
      width: '100%',
      height: '50px',
    },
    LoginButton: {
      width: '100%',
      height: '50px',
      margin: '35px 0 0 0',
    },
  })
);
export default ResetPasswordPage;
