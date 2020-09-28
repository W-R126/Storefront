import gql from 'graphql-tag';

export const GET_STORE_DATA = gql`
  query getStore($id: String) {
    store(id: $id) {
      merchant {
        logo {
          id
          url
        }
        tname
        business_type
      }
      name
      phone
      about_story
      address {
        line1
        line2
        city_town
        postcode
        lat
        lng
      }
      store_openings {
        day
        closed
        opening_times {
          open
          close
        }
      }
      order_types {
        id
        name
        pricing_type
      }
      settings {
        touchpoint_settings {
          digital_front {
            url
            banner {
              id
              url
            }
            order_types
            product_view {
              by_category
              sort_by_name
              show_selected
              categories {
                id
                position
              }
              products {
                id
                position
              }
            }
          }
        }
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

export const GET_STORE_SETTING_PRODUCT = gql`
  query getStoreSettingForProduct {
    store {
      settings {
        touchpoint_settings {
          digital_front {
            product_view {
              by_category
              sort_by_name
              show_selected
              categories {
                id
                position
              }
              products {
                id
                position
              }
            }
            order_types
          }
        }
      }
    }
  }
`;
