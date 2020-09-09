import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import PasswordInput from '../../../PasswordInput';
import { getPasswordValidationSchema } from '../../../../validators/signup-validation';

const CreatePasswordView = ({ password, policyAgree, onChange, signUp }) => {
  const classes = useStyles();
  const schema = getPasswordValidationSchema();

  const checkPasswordValidate = (newPassword) => {
    schema
      .validate({
        password: newPassword.value,
      })
      .then((res) => {
        onChange({
          password: {
            value: newPassword.value,
            validate: true,
            errorMsg: '',
          },
        });
      })
      .catch((err) => {
        onChange({
          password: {
            value: newPassword.value,
            validate: false,
            errorMsg: err.errors[0],
          },
        });
      });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.Title}>
        Create Your Myda Account
      </Typography>
      <Typography variant="h5" className={classes.SubTitle}>
        <span>Create Password.</span> Your Password must be min 8 digits with atleast one upper case, lower case letters
        and a number.
      </Typography>
      <Box class={classes.PasswrInputWrapper}>
        <PasswordInput
          label="Enter Password"
          inputData={password}
          onChange={(password) => {
            checkPasswordValidate(password);
          }}
        />
      </Box>
      <Box className={classes.CheckboxWrapper}>
        <Checkbox
          defaultChecked
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          checked={policyAgree}
          onChange={(e) => {
            onChange({
              policyAgree: e.target.checked,
            });
          }}
        />
        <Typography variant="h5" className="checkbox-label">
          I agree to Myda <a>Terms of use & Privacy Poliicies</a>
        </Typography>
      </Box>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        className={classes.SignUpButton}
        onClick={signUp}
        disabled={!password.validate || password.value.length === 0 || !policyAgree}
      >
        Sign up
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
      margin: 0,
    },
    SubTitle: {
      fontSize: '16px',
      lineHeight: 'normal',
      fontWeight: 300,
      margin: '40px 0 0 0',
      color: theme.palette.primary.text,
      '& span': {
        fontWeight: 500,
      },
    },
    PasswrInputWrapper: {
      margin: '20px 0 0 0',
      height: '70px',
      width: '100%',
      boxSizing: 'border-box',
    },
    CheckboxWrapper: {
      boxSizing: 'border-box',
      display: 'flex',
      margin: '30px 0 0 0',
      '& .MuiCheckbox-colorPrimary': {
        alignItems: 'flex-start',
        padding: 0,
      },
      '& .checkbox-label': {
        marginLeft: '20px',
        '& a': {
          color: theme.palette.primary.main,
          cursor: 'pointer',
        },
      },
    },
    SignUpButton: {
      margin: '40px 0 0 0',
      height: '50px',
    },
  })
);
export default CreatePasswordView;
