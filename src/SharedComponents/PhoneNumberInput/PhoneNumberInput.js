import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import CountryDropDown from '../CountryDropDown';

import { countries } from '../../constants';

const PhoneNumberInput = ({ value, onChange, wrapperClass }) => {
  const classes = useStyles();

  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);

  const getCountryValue = () => {
    const findOne = countries.find((item) => item.dial_code === value.code);
    return findOne;
  };

  const handleChange = (changedValue) => {
    if (changedValue.number.length === 0) {
      onChange({
        ...changedValue,
        validate: false,
        errorMsg: 'Required field',
      });
    } else {
      onChange({
        ...changedValue,
        validate: true,
        errorMsg: '',
      });
    }
  };

  return (
    <Box className={rootClasses.join(' ')}>
      <TextField
        label="Phone Number"
        value={value.number}
        className={classes.NumberInput}
        onChange={(e) => {
          handleChange({
            code: value.code,
            number: e.target.value.replace(/\D/, ''),
          });
        }}
        onBlur={(e) => {
          handleChange({
            code: value.code,
            number: e.target.value.replace(/\D/, ''),
          });
        }}
        error={!value.validate}
        helperText={value.errorMsg}
        type="tel"
        InputProps={{
          startAdornment: (
            <CountryDropDown
              value={getCountryValue()}
              onChange={(country) => {
                handleChange({
                  code: country.dial_code,
                  number: value.number,
                });
              }}
              isPhoneNumber={true}
              dropDownPosition={{
                left: 0,
                top: 'calc(100% + 6px)',
              }}
              countries={countries}
              wrapperClass={classes.CountryDropDownWrapper}
              buttonStyles={{
                color: '#20272f',
                fontSize: '16px',
                paddingLeft: '0',
                borderRight: 'solid 1px #bac3c9',
                height: '20px',
                zIndex: 1,
              }}
            />
          ),
        }}
      />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      boxSizing: 'border-box',
      height: '70px',
    },
    CountryDropDownWrapper: {
      marginRight: '10px',
    },
    NumberInput: {},
  })
);

export default PhoneNumberInput;
