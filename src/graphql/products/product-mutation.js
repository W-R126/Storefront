import gql from 'graphql-tag';

export interface Note {
  content: string;
}

export interface Address {
  line1: string;
  line2: string;
  city_town: string;
  country: string;
  postcode: string;
}
export interface Delivery {
  address: Address;
  name: string;
  mobile?: string;
}
export interface Shopper {
  id: string;
  first_name: string;
  last_name: string;
}

export interface Statuses {
  id: string;
  name: string;
  order: number;
}

export interface OrderType {
  id: string;
  type: string;
  name: string;
}
export interface Category {
  id: string;
  name: string;
}

export interface Tax {
  id: string;
  name: string;
  amount: number;
  rate: number;
}
export interface Price {
  amount: number;
  quantity: number;
  measure: number;
  measure_type: string;
  taxes: Tax[];
}
export interface Addon {
  addon_id: string;
  name: string;
  group: string;
  price: Price;
}
export interface Item {
  is_manual: boolean;
  bar_code: string;
  notes: Note[];
  category: Category;
  product_id: string;
  name: string;
  price: Price;
  addons: Addon[];
}

export interface TotalPrice {
  amount: number;
  taxes: Tax[];
}

export interface PaymentType {
  id: string;
  name: string;
  type: string;
}

export interface Payment {
  payment_type: PaymentType;
  change_due: number;
  amount: number;
  status: string;
  reference: string;
}

export interface Device {
  device_id?: String;
  device_name?: String;
}

interface OrderInput {
  id: string;
  order_id: string;
  order_no: string;
  notes: Note[];
  delivery: Delivery;
  shopper: Shopper;
  statuses: Statuses;
  device?: Device;
  order_type: OrderType;
  items: Item[];
  total_price: TotalPrice;
  payments: Payment[];
}

export const ADD_ORDER = gql`
  mutation addOrders($input: [OrderInput]!) {
    addOrders(input: $input) {
      id
    }
  }
`;
