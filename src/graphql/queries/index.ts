import gql from 'graphql-tag'

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      currency
      continent {
        code
        name
      }
    }
  }
`

const FILTER_COUNTRY_BY_CODE = gql`
  query CountryFilterInput($code: String!) {
    countries(filter: { code: { eq: $code } }) {
      name
      code
      capital
      currency
      continent {
        code
        name
      }
    }
  }
`

const FILTER_COUNTRY_BY_NAME = gql`
  query CountryFilterInput($name: String!) {
    countries(filter: { name: { in: [$name] } }) {
      name
      code
      capital
      currency
      continent {
        code
        name
      }
    }
  }
`
const GET_CONTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      emoji
      currency
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`

export { LIST_COUNTRIES, GET_CONTRY, FILTER_COUNTRY_BY_CODE, FILTER_COUNTRY_BY_NAME }
