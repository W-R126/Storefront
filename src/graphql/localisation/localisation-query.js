import gql from 'graphql-tag';

export const GET_CURRENCY = gql`
  query getCurrency {
    store {
      localisation {
        currency_symbol
        currency_decimal
        digit_separator
      }
    }
  }
`;

export const GET_LANGUAGE = gql`
  query getLanguage {
    user {
      config {
        background_colour
        language
        communication {
          product_update
          marketing
        }
      }
    }
  }
`;
