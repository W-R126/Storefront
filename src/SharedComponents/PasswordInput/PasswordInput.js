import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { getPasswordValidationSchema } from '../../validators/login-validation';

const PasswordInput = ({ id = 'password', label = 'Password', inputData, onChange }) => {
  const classes = useStyles();
  const schema = getPasswordValidationSchema();

  const handleChangePassword = (e) => {
    schema
      .validate({ password: e.target.value })
      .then((res) => {
        onChange({
          ...inputData,
          value: res.password,
          validate: true,
          errorMsg: '',
        });
      })
      .catch((err) => {
        onChange({
          ...inputData,
          value: err.value.password,
          validate: false,
          errorMsg: err.errors[0],
        });
      });
  };

  return (
    <>
      <TextField
        id={id}
        label={label}
        type={inputData.showPassword ? 'text' : 'password'}
        size="medium"
        fullWidth
        value={inputData.value}
        onChange={handleChangePassword}
        error={!inputData.validate}
        helperText={inputData.errorMsg}
        className={classes.PasswordInput}
      />
      <IconButton
        className={classes.showpasswordbtn}
        aria-label="toggle password visibility"
        onClick={(e): void => {
          onChange({
            ...inputData,
            showPassword: !inputData.showPassword,
          });
        }}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        {inputData.showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    PasswordInput: {
      '& .MuiInputBase-input': {
        height: '40px',
        boxSizing: 'border-box',
      },
    },
    showpasswordbtn: {
      position: 'absolute',
      padding: '2px',
      right: '5px',
      top: '22px',
      backgroundColor: '#fff',
      zIndex: 999,
    },
  })
);

export default PasswordInput;
