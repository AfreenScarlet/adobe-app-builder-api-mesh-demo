const SEARCH_TERM = "server";
const NUMBER_OF_RESULTS = 6;

const query = {
  query: `{
    products(search: "${SEARCH_TERM}", pageSize: ${NUMBER_OF_RESULTS}) {
      items {
        name
        sku
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
        image {
          url
        }
        ... on SimpleProduct {
          demoDetails {
            price
            sku
            location
            quantity
          }
        }
      }
    }
  }`
};
export default query;
