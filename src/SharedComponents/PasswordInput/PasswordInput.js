import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const PasswordInput = ({ id = 'password', label = 'Password', inputData, onChange, onBlur }) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box className={classes.root}>
      <TextField
        id={id}
        label={label}
        type={showPassword ? 'text' : 'password'}
        size="medium"
        fullWidth
        value={inputData.value}
        onChange={onChange}
        onBlur={onBlur}
        error={!inputData.validate}
        helperText={inputData.errorMsg}
        className={classes.PasswordInput}
        autoComplete="new-password"
      />
      <IconButton
        className={classes.showpasswordbtn}
        aria-label="toggle password visibility"
        onClick={(e): void => {
          setShowPassword(!showPassword);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box',
    },
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
