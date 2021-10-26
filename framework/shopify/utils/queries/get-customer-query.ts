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
      orders(first: 10) {
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
            lineItems(first: 20) {
              edges {
                node {
                  discountedTotalPrice {
                    amount
                    currencyCode
                  }
                  originalTotalPrice {
                    amount
                    currencyCode
                  }
                  quantity
                  title
                  variant {
                    id
                    product {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
export default getCustomerQuery
