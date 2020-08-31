import gql from 'graphql-tag';

export const GET_MERCHANT_NET_PRICE = gql`
  query getMerchantNetPrice {
    merchantSettings {
      products {
        net_price
      }
    }
  }
`;
