import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import OrderTypesDiv from './OrderTypesDiv';

export default {
  title: 'SharedComponents/OrderTypesDiv',
  decorators: [withKnobs],
};

export const normal = () => {
  const orderTypes = object('Order Types', [
    { id: '1', name: 'pos' },
    { id: '3', name: 'click_collect' },
    { id: '4', name: 'delivery' },
    { id: '70e2a006-30cf-4854-8216-92c71f9e4f9d', name: 'dining_in' },
  ]);
  return <OrderTypesDiv orderTypes={orderTypes} />;
};
