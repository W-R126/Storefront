import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';

import AuthModal from '../AuthModal';
import Spinner from '../../SharedComponents/Spinner';
import LoginEmailPanel from './Components/LoginEmailPanel';
import LoginPasswordPanel from './Components/LoginPasswordPanel';

import { LOGIN } from '../../graphql/auth/auth-mutation';
import { LOGIN_SUCCESS } from '../../actions/actionTypes';

const LOGIN_EMAIL_PANEL = 0;
const LOGIN_PASSWORD_PANEL = 1;

const LoginModal = ({ isShow, hideModal, gotoSignUp, gotoForgotPassword }) => {
  const dispatch = useDispatch();

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
          type: LOGIN_SUCCESS,
          payload: res.data.logIn,
        });
        setLoginLoading(false);
        hideModal();
      })
      .catch((err) => {
        setLoginLoading(false);
        console.log('Login Failed.');
      });
  };

  return (
    <AuthModal isShow={isShow} hideModal={hideModal}>
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
            gotoSignUp={gotoSignUp}
          />
        </Box>
        <Box id={LOGIN_PASSWORD_PANEL} hidden={curView !== LOGIN_PASSWORD_PANEL}>
          <LoginPasswordPanel
            gotoLogin={() => {
              setCurView(LOGIN_EMAIL_PANEL);
            }}
            gotoForgotPassword={() => {
              gotoForgotPassword();
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
      {loginLoading && <Spinner />}
    </AuthModal>
  );
};

export default LoginModal;
