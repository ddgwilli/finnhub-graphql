const graphql = require('graphql');
const fetch = require('node-fetch');

const getExchanges = () => {
  return fetch('https://finnhub.io/api/v1/stock/exchange?token=bqf4ig7rh5rashj94d9g')
  .then(response => {return response.json()});
}

const exchangesResolver = () => {
  return getExchanges();
}

const exchangeType = new graphql.GraphQLObjectType({
  name: 'Exchange',
  fields: {
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLString },
    currency: { type: graphql.GraphQLString },
  },
});

const endpoint = {
  type: new graphql.GraphQLList(exchangeType),
  resolve: exchangesResolver,
}

module.exports = { endpoint, type: exchangeType };