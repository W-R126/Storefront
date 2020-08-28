import React from 'react';
import { addons } from '@storybook/addons';
import { addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import THEME from '../src/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

addDecorator(muiTheme(THEME));
