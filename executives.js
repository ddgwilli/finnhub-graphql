const graphql = require('graphql');
const fetch = require('node-fetch');

const getExecutives = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/stock/executive?symbol=${symbol}&token=bqf4ig7rh5rashj94d9g`)
  .then(response => response.json()).then(json => json["executive"]);
}

const executivesResolver = (parent, args) => {
  const symbol = args["symbol"] || parent["symbol"];

  return getExecutives(symbol);
}

const executiveType = new graphql.GraphQLObjectType({
  name: 'Executive',
  fields: {
    age: { type: graphql.GraphQLInt },
    compensation: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    position: { type: graphql.GraphQLString },
    sex: { type: graphql.GraphQLString },
    since: { type: graphql.GraphQLString },
  },
});

const endpoint = {
  type: new graphql.GraphQLList(executiveType),
  resolve: executivesResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  }
}

module.exports = { endpoint, type: new graphql.GraphQLList(executiveType), resolver: executivesResolver };