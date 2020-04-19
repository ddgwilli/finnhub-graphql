const graphql = require('graphql');
const fetch = require('node-fetch');

const { type: fundOwnershipType } = require('./investor_ownership.js');

const getFundOwnership = (symbol, limit) => {
  return fetch(`https://finnhub.io/api/v1/stock/fund-ownership?symbol=${symbol}&limit=${limit}&token=bqe9apvrh5rashj8u070`)
  .then(response => response.json()).then(json => json["ownership"]);
}

const fundOwnershipResolver = (_, { symbol, limit }) => {
  return getFundOwnership(symbol);
}

const endpoint = {
  type: new graphql.GraphQLList(fundOwnershipType),
  resolve: fundOwnershipResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    limit: { type: graphql.GraphQLInt },
  }
}

module.exports = { endpoint, type: fundOwnershipType };