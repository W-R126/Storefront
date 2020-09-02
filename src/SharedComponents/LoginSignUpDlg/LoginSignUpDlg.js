import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Spinner from '../../SharedComponents/Spinner';
import LoginEmailPanel from './Components/LoginEmailPanel';
import LoginPasswordPanel from './Components/LoginPasswordPanel';
import ForgotPasswordPanel from './Components/ForgotPasswordPanel';

import { LOGIN } from '../../graphql/auth/auth-mutation';

import * as types from '../../actions/actionTypes';

const LOGIN_EMAIL_PANEL = 0;
const LOGIN_PASSWORD_PANEL = 1;
const FORGOT_PASSWORD_PANEL = 2;

const LoginSignUpDlg = ({ hideLogin }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [curView, setCurView] = useState(LOGIN_EMAIL_PANEL);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: {
      value: '',
      validate: true,
      errorMsg: '',
    },
    password: {
      value: '',
      validate: true,
      errorMsg: '',
      showPassword: false,
    },
  });

  const [loginMutation] = useMutation(LOGIN);

  const loginAction = () => {
    setLoginLoading(true);
    loginMutation({
      variables: {
        username: loginData.email.value,
        password: loginData.password.value,
      },
    })
      .then((res) => {
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: res.data.logIn,
        });
        setLoginLoading(false);
        hideLogin();
      })
      .catch((err) => {
        setLoginLoading(false);
        console.log('Login Failed.');
      });
  };

  return (
    <Paper className={classes.root}>
      <IconButton onClick={hideLogin} className={classes.CloseButton}>
        <CloseIcon />
      </IconButton>
      {(curView === LOGIN_EMAIL_PANEL || curView === LOGIN_PASSWORD_PANEL) && (
        <SwipeableViews index={curView} enableMouseEvents={false}>
          <Box id={LOGIN_EMAIL_PANEL} hidden={curView !== LOGIN_EMAIL_PANEL}>
            <LoginEmailPanel
              gotoPassword={() => {
                setCurView(LOGIN_PASSWORD_PANEL);
              }}
              email={loginData.email}
              onChange={(email) => {
                setLoginData({
                  ...loginData,
                  email: {
                    ...email,
                  },
                });
              }}
            />
          </Box>
          <Box id={LOGIN_PASSWORD_PANEL} hidden={curView !== LOGIN_PASSWORD_PANEL}>
            <LoginPasswordPanel
              gotoLogin={() => {
                setCurView(LOGIN_EMAIL_PANEL);
              }}
              gotoForgotPassword={() => {
                setCurView(FORGOT_PASSWORD_PANEL);
              }}
              email={loginData.email}
              password={loginData.password}
              onChange={(password) => {
                setLoginData({
                  ...loginData,
                  password: {
                    ...password,
                  },
                });
              }}
              onLogin={loginAction}
            />
          </Box>
        </SwipeableViews>
      )}
      {curView === FORGOT_PASSWORD_PANEL && <ForgotPasswordPanel gotoLogin={() => setCurView(LOGIN_EMAIL_PANEL)} />}
      {loginLoading && <Spinner />}
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '80px',
      right: '24px',
      width: '100%',
      maxWidth: '383px',
      height: '411px',
      boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      backgroundColor: '#fff',
      padding: '15px',
      boxSizing: 'border-box',
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
      '@media screen and (max-width: 767px)': {
        right: 'calc(50% - 191.5px)',
      },
    },
    CloseButton: {
      width: '30px',
      height: '30px',
      padding: 0,
      marginLeft: 'auto',
    },
  })
);

export default LoginSignUpDlg;
