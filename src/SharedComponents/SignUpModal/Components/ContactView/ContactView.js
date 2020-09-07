import React from 'react';

import { useFormik } from 'formik';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, TextField } from '@material-ui/core';

import { getSignUpContactValidateionSchema } from '../../../../validators/signup-validation';

const ContactView = ({ onChange, gotoNext }) => {
  const classes = useStyles();

  const contactFormSubmitProps = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: getSignUpContactValidateionSchema(),
    onSubmit: async ({ firstName, lastName, email }) => {
      onChange({
        firstName,
        lastName,
        email,
      });
      gotoNext();
    },
  });

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.Title}>
        Create Your Myda Account
      </Typography>
      <form style={{ width: '100%' }} onSubmit={contactFormSubmitProps.handleSubmit}>
        <Box className={classes.InputWrapper}>
          <TextField
            id="firstName"
            label="First Name"
            value={contactFormSubmitProps.values.firstName}
            onChange={contactFormSubmitProps.handleChange}
            fullWidth
            error={contactFormSubmitProps.errors.firstName}
            helperText={contactFormSubmitProps.errors.firstName}
          />
        </Box>
        <Box className={classes.InputWrapper}>
          <TextField
            id="lastName"
            label="Last Name"
            value={contactFormSubmitProps.values.lastName}
            onChange={contactFormSubmitProps.handleChange}
            fullWidth
            error={contactFormSubmitProps.errors.lastName}
            helperText={contactFormSubmitProps.errors.lastName}
          />
        </Box>
        <Box className={classes.InputWrapper}>
          <TextField
            id="email"
            label="Email"
            value={contactFormSubmitProps.values.email}
            fullWidth
            onChange={contactFormSubmitProps.handleChange}
            error={contactFormSubmitProps.errors.email}
            helperText={contactFormSubmitProps.errors.email}
          />
        </Box>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          className={classes.ContinueButton}
          type="submit"
          onClick={() => {
            contactFormSubmitProps.validateForm();
          }}
        >
          Continue
        </Button>
      </form>
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
      margin: '0 0 30px 0',
    },
    InputWrapper: {
      boxSizing: 'border-box',
      height: '70px',
      margin: '0 0 10px 0',
    },
    ContinueButton: {
      margin: '0',
      height: '50px',
      marginTop: '10px',
    },
  })
);

export default ContactView;
