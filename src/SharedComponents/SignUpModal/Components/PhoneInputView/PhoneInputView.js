import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import PhoneNumberInput from '../../../PhoneNumberInput';

const PhoneInputView = ({ phoneNumber, onChange, gotoNext, gotoLogin }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.Title}>
        Create Your Myda Account
      </Typography>
      <Typography variant="h6" className={classes.SubTitle}>
        Enter your mobile number
      </Typography>

      <PhoneNumberInput value={phoneNumber} onChange={onChange} wrapperClass={classes.PhoneNumberInputWrapper} />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        className={classes.ContinueButton}
        disabled={!phoneNumber.validate || phoneNumber.number.length === 0}
        onClick={gotoNext}
      >
        Continue
      </Button>
      <Button className={classes.LoginBox} onClick={gotoLogin}>
        Already have a Myda Account?
        <span className="LoginButton">Login</span>
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
    PhoneNumberInputWrapper: {
      margin: '40px 0 0 0',
    },
    ContinueButton: {
      margin: '20px 0 0 0',
      height: '50px',
    },
    LoginBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      fontSize: '16px',
      fontWeight: 300,
      lineHeight: '19px',
      color: theme.palette.primary.text,
      margin: '40px 0 0 0',
      '& .LoginButton': {
        marginLeft: '5px',
        cursor: 'pointer',
        color: theme.palette.primary.main,
      },
    },
  })
);

export default PhoneInputView;
