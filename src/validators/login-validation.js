import * as Yup from 'yup';

export const getLoginValidationSchema = () =>
  Yup.object().shape({
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required field'),
    username: Yup.string().email('Invalid email field').required('Required field'),
  });

export const getEmailValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string().email('Invalid email field').required('Required field'),
  });

export const getPasswordValidationSchema = () =>
  Yup.object().shape({
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  });
