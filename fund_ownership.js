const graphql = require('graphql');
const fetch = require('node-fetch');

const { type: fundOwnershipType } = require('./investor_ownership.js');

const getFundOwnership = (symbol, limit) => {
  return fetch(`https://finnhub.io/api/v1/stock/fund-ownership?symbol=${symbol}&limit=${limit}&token=bqf4ig7rh5rashj94d9g`)
  .then(response => response.json()).then(json => json["ownership"]);
}

const fundOwnershipResolver = (parent, args) => {
  const symbol = args["symbol"] || parent["symbol"];
  const limit = args["limit"]

  return getFundOwnership(symbol, limit);
}

const endpoint = {
  type: new graphql.GraphQLList(fundOwnershipType),
  resolve: fundOwnershipResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    limit: { type: graphql.GraphQLInt },
  }
}

module.exports = { endpoint, type: new graphql.GraphQLList(fundOwnershipType), resolver: fundOwnershipResolver };