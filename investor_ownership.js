const graphql = require('graphql');
const fetch = require('node-fetch');

const getInvestorOwnership = (symbol, limit) => {
  return fetch(`https://finnhub.io/api/v1/stock/investor-ownership?symbol=${symbol}&limit=${limit}&token=bqe9apvrh5rashj8u070`)
  .then(response => response.json()).then(json => json["ownership"]);
}

const investorOwnershipResolver = (parent, args) => {
  const symbol = args["symbol"] || parent["symbol"];
  const limit = args["limit"]
  
  return getInvestorOwnership(symbol, limit);
}

const investorOwnershipType = new graphql.GraphQLObjectType({
  name: 'InvestorOwnership',
  fields: {
    name: { type: graphql.GraphQLString },
    share: { type: graphql.GraphQLInt },
    turnover: { type: graphql.GraphQLString },
    turnoverPercent: { type: graphql.GraphQLFloat },
    change: { type: graphql.GraphQLInt},
    filingDate: { type: graphql.GraphQLString },
    portfolioPercent: { type: graphql.GraphQLString },
  },
});

const endpoint = {
  type: new graphql.GraphQLList(investorOwnershipType),
  resolve: investorOwnershipResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    limit: { type: graphql.GraphQLInt },
  }
}

module.exports = { endpoint, type: investorOwnershipType, resolver: investorOwnershipResolver };