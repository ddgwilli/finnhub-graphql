const graphql = require('graphql');
const fetch = require('node-fetch');

const getPeers = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=bqe9apvrh5rashj8u070`)
  .then(response => {return response.json()});
}

const peersResolver = (_, { symbol }) => {
  return getPeers(symbol);
}

module.exports = {
  type: new graphql.GraphQLList(graphql.GraphQLString),
  resolve: peersResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  }
}