import React, { useState } from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import DropDown from './DropDown';

export default {
  title: 'SharedComponents/DropDown',
  decorators: [withKnobs],
};

const defaultMenuList = [
  { label: 'Label1', id: 'value1' },
  { label: 'Label2', id: 'value2' },
  { label: 'Label3', id: 'value3' },
  { label: 'Label4', id: 'value4' },
];

const defaultWrapperClass = { width: '200px', marginLeft: '20px' };
const defaultButtonStyles = { backgroundColor: '#fff' };

const DropDownExample = () => {
  const [selected, setSelected] = useState(defaultMenuList[0]);

  const menuList: Array = object('Options', defaultMenuList);
  const wrapperClass = object('WrapperStyle', defaultWrapperClass);
  const buttonStyles = object('ButtonStyle', defaultButtonStyles);

  return (
    <DropDown
      value={selected}
      menuList={menuList}
      wrapperClass={wrapperClass}
      buttonStyels={buttonStyles}
      onChange={(newValue) => setSelected({ ...newValue })}
    />
  );
};

export const normal = () => {
  return <DropDownExample />;
};
