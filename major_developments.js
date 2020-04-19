const graphql = require('graphql');
const fetch = require('node-fetch');

const getMajorDevelopments = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/major-development?symbol=${symbol}&token=bqe9apvrh5rashj8u070`)
  .then(response => response.json()).then(json => json["majorDevelopment"]);
}

const majorDevelopmentsResolver = (_, { symbol }) => {
  return getMajorDevelopments(symbol);
}

const majorDevelopmentType = new graphql.GraphQLObjectType({
  name: 'MajorDevelopment',
  fields: {
    symbol: { type: graphql.GraphQLString },
    date: { type: graphql.GraphQLString },
    headline: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
  }
});

const endpoint = {
  type: new graphql.GraphQLList(majorDevelopmentType),
  resolve: majorDevelopmentsResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  }
}

module.exports = { endpoint, type: majorDevelopmentType };