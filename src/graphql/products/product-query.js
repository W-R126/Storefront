import gql from 'graphql-tag';

type Filter = {
  page: Number,
  limit: Number,
  count?: Boolean,
};

export const GET_PRODUCTS = gql`
  query getProducts($filter: Filter) {
    products(filter: $filter) {
      id
      name
      images {
        id
        url
        thumbnail
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

export const GET_PRODUCT_BY_ID = gql`
  query getProduct($id: String) {
    products(id: $id) {
      name
      bar_code
      product_code
      # SKU
      images {
        id
        url
      }
      description
      measure_type
      measure_amount
      stocks {
        current_stock
      }
      prices {
        price_infos {
          price_type {
            id
            name
          }
          price
          taxes {
            id
            rate
            name
          }
        }
      }
      allergies {
        id
        name
        image {
          id
          url
        }
      }
      ingredients {
        name
        measure {
          id
          amount
          measure_type
        }
      }
    }
  }
`;
