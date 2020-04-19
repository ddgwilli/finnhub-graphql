const graphql = require('graphql');
const fetch = require('node-fetch');

const getSymbols = () => {
  return fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bqe9apvrh5rashj8u070')
  .then(response => {return response.json()});
}

const symbolsResolver = () => {
  return getSymbols();
}

const symbolType = new graphql.GraphQLObjectType({
  name: 'Symbol',
  fields: {
    description: { type: graphql.GraphQLString },
    symbol: { type: graphql.GraphQLString },
    displaySymbol: { type: graphql.GraphQLString },
  },
});

const endpoint = {
  type: new graphql.GraphQLList(symbolType),
  resolve: symbolsResolver,
}

module.exports = { endpoint, type: symbolType };