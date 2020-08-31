import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import OpeningHoursModal from './OpeningHoursModal';

export default {
  title: 'SharedComponents/OpeningHoursModal',
  decorators: [withKnobs],
};

export const normal = () => {
  const openingHours = object('Order Types', defaultOpeningHours);
  return <OpeningHoursModal open={true} store_openings={openingHours} />;
};

const defaultOpeningHours = [
  {
    day: 'Monday',
    closed: false,
    opening_times: [
      {
        open: '11:00',
        close: '15:00',
      },
      {
        open: '17:00',
        close: '23:00',
      },
    ],
  },
  {
    day: 'Tuesday',
    closed: false,
    opening_times: [
      {
        open: '08:30',
        close: '20:30',
      },
    ],
  },
  {
    day: 'Wednesday',
    closed: false,
    opening_times: [
      {
        open: '11:00',
        close: '15:00',
      },
      {
        open: '17:00',
        close: '23:00',
      },
    ],
  },
  {
    day: 'Thursday',
    closed: false,
    opening_times: [
      {
        open: '08:30',
        close: '20:30',
      },
    ],
  },
  {
    day: 'Friday',
    closed: false,
    opening_times: [
      {
        open: '08:30',
        close: '20:30',
      },
    ],
  },
  {
    day: 'Saturday',
    closed: true,
    opening_times: [],
  },
  {
    day: 'Sunday',
    closed: true,
    opening_times: [],
  },
  {
    day: null,
    closed: true,
    opening_times: [],
  },
  {
    day: null,
    closed: true,
    opening_times: [],
  },
];
