import React, { useEffect } from 'react';

import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { SEND_RESET_CODE } from '../../../../graphql/auth/auth-mutation';
import { CHECK_ACTIVATIONS } from '../../../../graphql/auth/auth-query';

const ResultView = ({ userData, gotoChangeEmail, hideModal }) => {
  const classes = useStyles();

  const [checkActivation, data] = useLazyQuery(CHECK_ACTIVATIONS);
  const [sendResetCode, { data: sendResetCodeData }] = useMutation(SEND_RESET_CODE);

  useEffect(() => {
    setTimeout(() => {
      hideModal();
    }, 150000);

    const interval = setInterval(() => {
      checkActivation({
        variables: { userID: userData && userData.createUser.activations[0].user_id },
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [checkActivation, hideModal, userData]);

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.Title}>
        Great news. All set.
      </Typography>
      <Typography variant="h5" className={classes.SubTitle}>
        We just need to confirm you are who you are
        <br />
        <br />
        <br />
        Follow instructions we sent to
        <br />
        <span style={{ fontWeight: 500 }}>{userData && userData.createUser.activations[0].email}</span>
        complete validation.{' '}
        <span className="ChangeEmail" onClick={gotoChangeEmail} role="button">
          Change email.
        </span>
      </Typography>
      <CircularProgress className={classes.Spinner} />

      <Typography variant="h5" className={classes.SubTitle} style={{ marginTop: '14px' }}>
        Awaiting validation...
      </Typography>

      <Typography variant="h5" className={classes.SubTitle}>
        Don't get the email?{' '}
        <span
          className="ChangeEmail"
          onClick={() => {
            sendResetCode({
              variables: {
                email: userData.createUser.activations[0].email,
              },
            });
          }}
          role="button"
        >
          Resend.
        </span>
      </Typography>
      <p className={classes.Footer}>Did you check your junk/spam folder?</p>
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
      margin: 0,
    },
    SubTitle: {
      fontSize: '16px',
      lineHeight: 'normal',
      fontWeight: 300,
      margin: '40px 0 0 0',
      color: theme.palette.primary.text,
      textAlign: 'center',
      '& .ChangeEmail': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
      },
    },
    Spinner: {
      margin: '37px auto 0',
    },
    Footer: {
      margin: '8px 0 35px 0',
      fontSize: '12px',
      fontWeight: 300,
      color: theme.palette.primary.title,
      textAlign: 'center',
    },
  })
);

export default ResultView;
