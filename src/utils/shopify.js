import axios from 'axios';

// Reusable function to fetch data from Storefront API
export async function storeFrontRequest({ query, variables }) {
  const { data } = await axios({
    url: `https://innowave-dev.myshopify.com/api/2022-07/graphql.json`,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': '0210307c4e2933c9f24d49e7d20d90c8',
    },
    data: {
      query: query,
      variables: variables,
    },
  });

  return data;
}
