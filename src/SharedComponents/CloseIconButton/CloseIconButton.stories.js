import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import CloseIconButton from './CloseIconButton';

export default {
  title: 'SharedComponents/CloseIconButton',
  decorators: [withKnobs],
};

export const normal = () => {
  return <CloseIconButton />;
};
