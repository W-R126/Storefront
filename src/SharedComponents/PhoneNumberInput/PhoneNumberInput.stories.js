import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import PhoneNumberInput from './PhoneNumberInput';

export default {
  title: 'SharedComponents/PhoneNumberInput',
  decorators: [withKnobs],
};

const PhoneNumberInputExample = () => {
  const [value, setValue] = useState({
    code: 'GB',
    dial_code: '+44',
    number: '',
    validate: true,
    errorMsg: '',
  });

  const handleChangeValue = (values) => {
    if (values.number.length === 0) {
      setValue({
        ...values,
        validate: false,
        errorMsg: 'Required field',
      });
    } else {
      setValue({
        ...values,
        validate: true,
        errorMsg: '',
      });
    }
  };

  return (
    <PhoneNumberInput
      value={value}
      onChange={(values) => {
        handleChangeValue(values);
      }}
    />
  );
};

export const normal = () => {
  return <PhoneNumberInputExample />;
};
