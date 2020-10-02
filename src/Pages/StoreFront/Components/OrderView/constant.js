export const dump_data = {
  id: '3c5a76ca-a0cc-425f-b3fa-f431569f1f9a',
  order_id: '3c5a76ca-a0cc-425f-b3fa-f431569f1f9a',
  order_no: '',
  notes: [
    {
      content: '',
    },
  ],
  delivery: {
    address: {
      line1: 'England',
      line2: 'Milton Keynes',
      city_town: '',
      country: 'United Kingdom',
      postcode: 'MK9',
    },
    name: 'sen Sampanthar',
    mobile: '',
  },
  shopper: {
    id: 'f218f0a6-334e-41a7-80ef-50c2359c06fe',
    first_name: 'sen',
    last_name: 'Sampanthar',
  },
  statuses: {
    id: '8',
    order: 1,
    name: 'Draft',
  },
  device: null,
  order_type: {
    id: '4',
    type: 'delivery',
    name: 'Delivery',
  },
  items: [
    {
      is_manual: false,
      bar_code: '212',
      notes: [],
      category: {
        id: 'e229b28a-75e0-11e7-8b34-68f728862a08',
        name: 'Kids Meal ',
      },
      product_id: '6eb8fb46-fb65-4ca3-ba38-00b29018ee21',
      name: 'Mini Chikn Strip Burger meal',
      price: {
        quantity: 1,
        measure: null,
        measure_type: null,
        taxes: [
          {
            id: '4',
            name: 'VAT',
            rate: -1,
          },
        ],
      },
      addons: [],
    },
  ],
  total_price: {
    amount: 3.5,
    taxes: [],
  },
  payments: [
    {
      payment_type: {
        id: '1',
        name: 'Cash',
      },
      change_due: 0,
      amount: 3.5,
      status: 'pre-auth',
      reference: 'resource',
    },
  ],
};
