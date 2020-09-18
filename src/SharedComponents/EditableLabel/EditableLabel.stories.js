import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import EditableLabel from './EditableLabel';

export default {
  title: 'SharedComponents/EditableLabel',
  decorators: [withKnobs],
};

const EditableLabelExample = () => {
  const [value, setValue] = useState('Test Value');
  return (
    <EditableLabel
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    />
  );
};

export const normal = () => {
  return <EditableLabelExample />;
};
