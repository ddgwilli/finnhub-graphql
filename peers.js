const graphql = require('graphql');
const fetch = require('node-fetch');

const getPeers = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=bqf4ig7rh5rashj94d9g`)
  .then(response => {return response.json()});
}

const peersResolver = (parent, args) => {
  const symbol = args["symbol"] || parent["symbol"];

  return getPeers(symbol);
}

const endpoint = {
  type: new graphql.GraphQLList(graphql.GraphQLString),
  resolve: peersResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  }
}

module.exports = { endpoint, type: new graphql.GraphQLList(graphql.GraphQLString), resolver: peersResolver };