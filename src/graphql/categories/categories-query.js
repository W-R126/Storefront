import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;
