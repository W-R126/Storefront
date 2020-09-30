import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
    }
  }
`;

export const CHECK_EMAIL_AVAILABILITY = gql`
  query User($email: String) {
    user(email: $email) {
      email
    }
  }
`;

export const CHECK_ACTIVATIONS = gql`
  query checkActivations($userID: String!) {
    checkActivations(user_id: $userID) {
      user_id
      code
      email
      phone
      type
      completed
      expired
      expires_at
      completed_at
    }
  }
`;

export const GET_DELIVERY_ADDRESS = gql`
  {
    currentUser {
      id
      addresses {
        id
        type
        line1
        line2
        city_town
        postcode
        lat
        lng
      }
    }
  }
`;
