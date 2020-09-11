import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import store from '../../../../../../store';

import SearchBar from './SearchBar';

export default {
  title: 'SharedComponents/SearchBar',
  decorators: [withKnobs],
};

export const normal = () => {
  return (
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );
};
