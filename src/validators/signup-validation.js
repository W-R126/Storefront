import * as Yup from 'yup';

export const getSignUpContactValidateionSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().required('Required field'),
    lastName: Yup.string().required('Required field'),
    email: Yup.string().email('Invalid email field').required('Required field'),
  });

export const getSignUpValidationSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().required('Required field'),
    lastName: Yup.string().required('Required field'),
    password: Yup.string().matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
      'Must One Uppercase, One Lowercase, One Number and one special case Character'
    ),
    email: Yup.string().email('Invalid email field').required('Required field'),
  });

export const getPasswordValidationSchema = () =>
  Yup.object().shape({
    password: Yup.string().matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
      'Must One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  });
