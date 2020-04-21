const graphql = require('graphql');
const fetch = require('node-fetch');

const { type: companyType, resolver: companyResolver } = require('./company.js');

const companiesResolver = (_, { symbols }) => {
  return symbols.map(symbol => {
    return { symbol };
  });
}

const endpoint = {
  type: graphql.GraphQLList(companyType),
  resolve: companiesResolver,
  args: {
    symbols: { type: graphql.GraphQLNonNull(graphql.GraphQLList(graphql.GraphQLString)) },
  }
}

module.exports = { endpoint, type: graphql.GraphQLList(companyType) };