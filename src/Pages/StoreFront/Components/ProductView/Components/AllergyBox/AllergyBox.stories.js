import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import AllergyBox from './AllergyBox';

import AllergyImg1 from '../../../../../../assets/img/flags/ad.svg';
import AllergyImg2 from '../../../../../../assets/img/flags/ae.svg';
import AllergyImg3 from '../../../../../../assets/img/flags/af.svg';
import AllergyImg4 from '../../../../../../assets/img/flags/ag.svg';
import AllergyImg5 from '../../../../../../assets/img/flags/ai.svg';

export default {
  title: 'SharedComponents/AllergyBox',
  decorators: [withKnobs],
};

const defaultAllergyList = [
  {
    id: 1,
    name: 'Allergy1',
    image: { id: 1, url: AllergyImg1 },
  },
  {
    id: 2,
    name: 'Allergy2',
    image: { id: 2, url: AllergyImg2 },
  },
  {
    id: 3,
    name: 'Allergy3',
    image: { id: 3, url: AllergyImg3 },
  },
  {
    id: 4,
    name: 'Allergy4',
    image: { id: 4, url: AllergyImg4 },
  },
  {
    id: 5,
    name: 'Allergy5',
    image: { id: 5, url: AllergyImg5 },
  },
];

export const normal = () => {
  const allergyList: Array = object('AllergyList', defaultAllergyList);
  return <AllergyBox allergyData={allergyList} />;
};
