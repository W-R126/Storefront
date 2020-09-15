import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation logIn($username: String!, $password: Password!) {
    logIn(input: { username: $username, password: $password }) {
      access_token
      refresh_token
      user {
        id
        first_name
        last_name
        email
        mobile
        config {
          background_colour
          language
        }
        profile {
          name
          id
          thumbnail
          url
        }
        merchants {
          id
          lname
          tname
          mid
          logo {
            id
            url
            thumbnail
          }
          week_start_day
          merchant_settings {
            branding {
              customize {
                primary
                secondary
                third
              }
              colours {
                primary
                secondary
                third
              }
            }
            reports {
              end_time
            }
          }
          phone
          logo_url
          logo {
            id
            url
          }
          business_type
          registrations {
            entities {
              name
              id
            }
          }
          address {
            line1
            line2
            city_town
            postcode
            country
            county
          }
          stores {
            name
            id
            taxes {
              id
              name
              rate
            }
            day_end_time
            modules {
              status
            }
            localisation {
              country
              notes_denominations
              currency_decimal
              format
              currency_symbol
              currency_code
            }
            address {
              id
              line1
              line2
              city_town
              postcode
            }
          }
        }
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation createUser(
    $email: String!
    $mobile: String!
    $password: HashPassword!
    $secondName: String!
    $firstName: String!
  ) {
    createUser(
      input: { email: $email, mobile: $mobile, password: $password, last_name: $secondName, first_name: $firstName }
    ) {
      activations {
        user_id
        email
      }
    }
  }
`;

export const SEND_RESET_CODE = gql`
  mutation sendResetCode($email: String!) {
    sendResetCode(input: { email: $email })
  }
`;

interface PasswordResetInput {
  code: String;
  password: String;
}

export const PASSWORD_RESET = gql`
  mutation passwordReset($input: PasswordResetInput!) {
    passwordReset(input: $input)
  }
`;
