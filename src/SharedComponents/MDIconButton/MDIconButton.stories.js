import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import MDIconButton from './MDIconButton';

import MenuIcon from '@material-ui/icons/Menu';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default {
  title: 'SharedComponents/MDIconButton',
  decorators: [withKnobs],
};

export const normal = () => {
  const iconSelect = select('Icons', ['Menu', 'KeyBoardBack', 'ShoppingCart'], 'Menu');
  return (
    <MDIconButton>
      {iconSelect === 'Menu' && <MenuIcon />}
      {iconSelect === 'KeyBoardBack' && <KeyboardBackspaceIcon />}
      {iconSelect === 'ShoppingCart' && <ShoppingCartIcon />}
    </MDIconButton>
  );
};
