import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import SearchInput from './SearchInput';

export default {
  title: 'SharedComponents/SearchInput',
  decorators: [withKnobs],
};

export const normal = () => {
  return <SearchInput />;
};
