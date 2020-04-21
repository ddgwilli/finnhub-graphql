const graphql = require('graphql');
const fetch = require('node-fetch');

const { type: companyNewsType } = require('./news.js');

const getCompanyNews = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/news/${symbol}?token=bqf4ig7rh5rashj94d9g`)
  .then(response => {return response.json()});
}

const companyNewsResolver = (parent, args) => {
  const symbol = args["symbol"] || parent["symbol"];

  return getCompanyNews(symbol);
}

const endpoint = {
  type: new graphql.GraphQLList(companyNewsType),
  resolve: companyNewsResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  }
}

module.exports = { endpoint, type: companyNewsType, resolver: companyNewsResolver };