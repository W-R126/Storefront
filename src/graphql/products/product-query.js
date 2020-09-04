import gql from 'graphql-tag';

interface Filter {
  page: Number;
  limit: Number;
  count?: Boolean;
}

export const GET_PRODUCTS = gql`
  query getProducts($filter: Filter) {
    products(filter: $filter) {
      id
      name
      images {
        id
        url
      }
      bar_code
      short_description
      measure_amount
      measure_type
      prices {
        price_infos {
          price_type {
            id
            name
          }
          price
          taxes {
            id
            name
            rate
          }
        }
      }
      stocks {
        current_stock
      }
    }
  }
`;
