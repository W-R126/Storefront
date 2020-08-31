import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';
import SearchInput from './SearchInput';

export default {
  title: 'SharedComponents/SearchInput',
  decorators: [withKnobs],
};

export const normal = () => {
  const categoryMenuList = object('CategoryList', [
    { id: -1, label: 'all' },
    { id: 0, label: 'Category 1' },
    { id: 1, label: 'Category 2' },
    { id: 2, label: 'Category 3' },
    { id: 3, label: 'Category 4' },
    { id: 4, label: 'Category 5' },
  ]);
  return <SearchInput categoryMenuList={categoryMenuList} />;
};
