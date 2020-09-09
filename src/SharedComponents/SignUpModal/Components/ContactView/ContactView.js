import React from 'react';

import { useFormik } from 'formik';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useLazyQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';

import { getSignUpContactValidateionSchema } from '../../../../validators/signup-validation';
import { CHECK_EMAIL_AVAILABILITY } from '../../../../graphql/auth/auth-query';
import CloseIcons from '@material-ui/icons/Close';

const ContactView = ({ formData, onChange, gotoNext }) => {
  const classes = useStyles();

  const contactFormSubmitProps = useFormik({
    initialValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
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

  const [checkEmail, { data: emailData, error: emailError, loading: emailLoading }] = useLazyQuery(
    CHECK_EMAIL_AVAILABILITY
  );

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
            onBlur={(e) => {
              contactFormSubmitProps.handleBlur(e);
            }}
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
            onBlur={(e) => {
              contactFormSubmitProps.handleBlur(e);
            }}
          />
        </Box>
        <Box className={classes.InputWrapper}>
          <TextField
            id="email"
            label="Email"
            value={contactFormSubmitProps.values.email}
            fullWidth
            onChange={contactFormSubmitProps.handleChange}
            error={contactFormSubmitProps.errors.email || emailData}
            helperText={contactFormSubmitProps.errors.email || (emailData && 'This email already exsit.')}
            onBlur={(e) => {
              contactFormSubmitProps.handleBlur(e);
              checkEmail({
                variables: {
                  email: e.target.value,
                },
              });
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {emailLoading && <CircularProgress size={20} />}
                  {(emailData || !!contactFormSubmitProps.errors.email) && <CloseIcons color="error" />}
                </InputAdornment>
              ),
            }}
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
          disabled={Object.keys(contactFormSubmitProps.errors).length > 0 || emailData || emailLoading}
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
