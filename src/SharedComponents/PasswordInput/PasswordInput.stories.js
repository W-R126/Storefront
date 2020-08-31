import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import PasswordInput from './PasswordInput';

export default {
  title: 'SharedComponents/PasswordInput',
  decorators: [withKnobs],
};

const PasswordInputExample = () => {
  const [value, setValue] = useState({
    value: '',
    validate: true,
    errorMsg: '',
    showPassword: true,
  });

  return <PasswordInput inputData={value} onChange={(newValue) => setValue({ ...newValue })} />;
};

export const normal = () => {
  return <PasswordInputExample />;
};
