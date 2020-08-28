import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { THEME } from '../../theme';
import DropDown from './DropDown';

export default {
  title: 'MyDa/DropDown',
  decorators: [withKnobs],
};

const defaultMenuList = [
  { label: 'Label1', value: 'value1' },
  { label: 'Label2', value: 'value2' },
  { label: 'Label3', value: 'value3' },
  { label: 'Label4', value: 'value4' },
];

const defaultWrapperStyles = { width: '200px', marginLeft: '20px' };
const defaultButtonStyles = { backgroundColor: '#fff' };

export const normal = () => {
  const menuList: Array = object('Options', defaultMenuList);
  const wrapperStyles = object('WrapperStyle', defaultWrapperStyles);
  const buttonStyles = object('ButtonStyle', defaultButtonStyles);

  const value = defaultMenuList[0];
  return (
    <MuiThemeProvider theme={THEME}>
      <DropDown value={value} menuList={menuList} wrapperStyles={wrapperStyles} buttonStyels={buttonStyles} />
    </MuiThemeProvider>
  );
};
