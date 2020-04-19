const graphql = require('graphql');
const fetch = require('node-fetch');

const { type: newsType } = require('./news.js');

const getCompanyNews = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/news/${symbol}?token=bqe9apvrh5rashj8u070`)
  .then(response => {return response.json()});
}

const companyNewsResolver = (_, { symbol }) => {
  return getCompanyNews(symbol);
}

module.exports = {
  type: new graphql.GraphQLList(newsType),
  resolve: companyNewsResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  }
}