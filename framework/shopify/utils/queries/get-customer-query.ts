export const getCustomerQuery = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      tags
      acceptsMarketing
      createdAt
      orders(first: 5) {
        edges {
          node {
            id
            currencyCode
            financialStatus
            name
            phone
            shippingAddress {
              address1
              address2
              city
              country
            }
            currentTotalPrice {
              amount
              currencyCode
            }
            subtotalPriceV2 {
              amount
              currencyCode
            }
            totalShippingPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`
export default getCustomerQuery
