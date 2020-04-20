const graphql = require('graphql');
const fetch = require('node-fetch');

const getPeers = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=bqe9apvrh5rashj8u070`)
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

module.exports = { endpoint, type: graphql.GraphQLString, resolver: peersResolver };