import gql from 'graphql-tag';

interface Filter {
  page: Number;
  limit: Number;
  count?: Boolean;
  name?: String;
}

export const GET_PRODUCTS = gql`
  query getProducts($filter: Filter, $category_id: String, $touchpoint_type: String) {
    products(filter: $filter, category_id: $category_id, touchpoint_type: $touchpoint_type) {
      id
      name
      images {
        id
        url
        thumbnail
      }
      bar_code
      stocked
      short_description
      measure_amount
      measure_type
      category {
        id
        name
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
      stocked
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
      addons {
        group
        description
        parent
        allow_free
        mandatory
        mandatory
        multi_selection
        default_all
        options {
          inventory_id
          id
          name
          force_charge
          default
          mandatory
          position
          extra
          override_price
          price {
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
        }
      }
    }
  }
`;
