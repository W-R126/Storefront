import React, { useState } from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import CountryDropDown from './CountryDropDown';
import { countries } from '../../constants';
export default {
  title: 'SharedComponents/CountryDropDown',
  decorators: [withKnobs],
};

const CountryDropDownExample = () => {
  const [selected, setSelected] = useState(countries[0]);

  const menuList: Array = object('Options', countries);

  return (
    <div
      style={{ width: '100%', height: '100%', backgroundColor: '#505c69', paddingLeft: '100px', paddingTop: '400px' }}
    >
      <CountryDropDown value={selected} countries={menuList} onChange={(country) => setSelected({ ...country })} />
    </div>
  );
};

export const normal = () => {
  return <CountryDropDownExample />;
};
