const graphql = require('graphql');
const fetch = require('node-fetch');

const getSymbols = () => {
  return fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bqf4ig7rh5rashj94d9g')
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

module.exports = { endpoint, type: new graphql.GraphQLList(symbolType) };