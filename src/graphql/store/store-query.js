import gql from 'graphql-tag';

export const GET_STORE_DATA = gql`
  query getStore($id: String) {
    store(id: $id) {
      id
      order_types {
        id
        name
      }
      merchant {
        tname
      }
      localisation {
        currency_symbol
        currency_decimal
        currency_position
      }
    }
  }
`;

export const GET_STORES = gql`
  query getStores {
    stores {
      id
      name
      merchant {
        id
        tname
      }
      region {
        id
        region_name
      }
    }
  }
`;

export const GET_CURRENT_STORE = gql`
  {
    currentStore @client {
      id
      name
    }
  }
`;
