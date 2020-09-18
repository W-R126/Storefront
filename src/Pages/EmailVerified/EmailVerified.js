import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import _ from 'lodash';
import { useMutation } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper, Typography, Button } from '@material-ui/core';

import Spinner from '../../SharedComponents/Spinner';
import { VERIFY_USER } from '../../graphql/auth/auth-mutation';

import LogoSvg from '../../assets/img/logo.svg';

const EmailVerified = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user_id, code } = useParams();

  const handleClickLogin = () => {
    history.push('/');
  };

  const [verifyUserMutation, { data: verifyUserData, loading: verifyUserLoading, error }] = useMutation(VERIFY_USER);

  useEffect(() => {
    try {
      verifyUserMutation({
        variables: {
          code: code,
          type: 'email',
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [code]);

  const getErrorMessage = () => {
    const graphQLErrors = _.get(error, 'graphQLErrors', null);
    if (!graphQLErrors || graphQLErrors.length === 0) return 'Email verification failed.';
    const message = _.get(graphQLErrors[0], 'message', null);
    if (!message) return 'Email verification failed.';
    const messageJSON = JSON.parse(message);
    return _.get(messageJSON, 'userError', 'Email verification failed.');
  };

  return (
    <Box className={classes.root}>
      <Paper className={classes.MainContent}>
        {verifyUserLoading && <Spinner />}
        {verifyUserData && (
          <>
            <img className={classes.LogoImg} src={LogoSvg} alt="Logo" />
            <Typography className={classes.SubTitle} variant="h3">
              Perfect!
            </Typography>
            <Typography className={classes.Description} variant="h3">
              Your email is successfully verified. Return to the page or click below to login.
            </Typography>
            <Button
              className={classes.LoginButton}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClickLogin}
            >
              Login
            </Button>
          </>
        )}
        {error && (
          <>
            <img className={classes.LogoImg} src={LogoSvg} alt="Logo" />
            <Typography className={classes.SubTitle} variant="h3">
              Email Verification Failed
            </Typography>
            <Typography className={classes.Description} variant="h3" style={{ marginTop: '50px' }}>
              {getErrorMessage()}
            </Typography>
          </>
        )}
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
      padding: '10px 15px',
    },
    MainContent: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 50px 50px',
      width: '100%',
      height: '354px',
      maxWidth: '424px',
      borderRadius: '6px',
      border: 'solid 1px #bac3c9',
      boxShadow: 'none',
      position: 'relative',
      boxSizing: 'border-box',
    },
    LogoImg: {
      width: '90px',
      height: '36px',
    },
    SubTitle: {
      fontWeight: 'normal',
      color: theme.palette.primary.text,
      margin: '40px 0 0 0',
    },
    Description: {
      color: theme.palette.primary.text,
      margin: '20px 0 0 0',
      textAlign: 'center',
    },
    LoginButton: {
      height: '50px',
      margin: '40px 0 0 0',
    },
  })
);
export default EmailVerified;
