import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import IngredientsBox from './IngredientsBox';

export default {
  title: 'SharedComponents/IngredientsBox',
  decorators: [withKnobs],
};

const defaultIngredientData = [
  {
    name: 'Cereal Flours',
    measure: [{ id: 'Wheat', amount: 26, measure_type: '%' }],
  },
  {
    name: 'Chocolate Hazelnut Filling',
    measure: [{ id: 'Sugar', amount: 26, measure_type: '%' }],
  },
  {
    name: 'Chocolate',
    measure: [{ id: 'Sugar', amount: 26, measure_type: '%' }],
  },
];

export const normal = () => {
  const ingredientData: Array = object('Ingredients', defaultIngredientData);
  return <IngredientsBox ingredientData={ingredientData} />;
};
