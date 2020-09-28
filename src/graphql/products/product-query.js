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
      pack_qty
      pack_item {
        measure_amount
        measure_type
      }
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
      addons {
        id
        group
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
        thumbnail
      }
      description
      measure_amount
      measure_type
      pack_qty
      pack_item {
        measure_amount
        measure_type
      }
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
        id
        group
        description
        parent
        allow_free
        mandatory
        multi_selection
        default_all
        options {
          inventory_id
          #product_id
          id
          name
          force_charge
          default
          mandatory
          position
          extra
          override_price
          price {
            fixed_price
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_IMAGE = gql`
  query getProductImage($id: String) {
    products(id: $id) {
      images {
        id
        url
        thumbnail
      }
    }
  }
`;

export const GET_PRODUCT_ADDONS = gql`
  query getProductAddons($id: String) {
    products(id: $id) {
      addons {
        id
        group
        description
        parent
        allow_free
        mandatory
        multi_selection
        default_all
        options {
          inventory_id
          #product_id
          id
          name
          force_charge
          default
          position
          extra
          override_price
          price {
            fixed_price
          }
        }
      }
    }
  }
`;

export const GET_ADDON_GROUPS = gql`
  query getAddOnGroups($id: String) {
    addonGroups(id: $id) {
      id
      group
      description
      parent
      allow_free
      mandatory
      multi_selection
      default_all
      addons {
        id
        name
        inventory_id
        default
        force_charge
        extra
        override_price
        fixed_price
        productCount
        measure_id
        measure_amount
        measure_type
      }
    }
  }
`;
