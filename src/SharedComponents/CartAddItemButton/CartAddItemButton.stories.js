import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

import CartAddItemButton from './CartAddItemButton';

export default {
  title: 'SharedComponents/CartAddItemButton',
  decorators: [withKnobs],
};

export const normal = () => {
  const disabled = boolean('disabled', false);
  const type = select('type', ['Minus', 'Plus'], 'Plus');
  return <CartAddItemButton disabled={disabled} type={type} />;
};
