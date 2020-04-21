const graphql = require('graphql');
const fetch = require('node-fetch');

const getNewsSentiment = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/news-sentiment?symbol=${symbol}&token=bqf4ig7rh5rashj94d9g`)
  .then(response => {return response.json()});
}

const newsSentimentResolver = (parent, args) => {
  const symbol = args["symbol"] || parent["symbol"];

  return getNewsSentiment(symbol);
}

const sentimentType = new graphql.GraphQLObjectType({
  name: 'Sentiment',
  fields: {
    bullishPercent: { type: graphql.GraphQLFloat },
    bearishPercent: { type: graphql.GraphQLFloat },
  }
});

const buzzType = new graphql.GraphQLObjectType({
  name: 'Buzz',
  fields: {
    articlesInLastWeek: { type: graphql.GraphQLInt },
    buzz: { type: graphql.GraphQLFloat },
    weeklyAverage: { type: graphql.GraphQLFloat },
  }
});

const newsSentimentType = new graphql.GraphQLObjectType({
  name: 'NewsSentiment',
  fields: {
    symbol: { type: graphql.GraphQLString },
    companyNewsScore: { type: graphql.GraphQLFloat },
    sectorAverageNewsScore: { type: graphql.GraphQLFloat },
    sectorAverageBullishPercent: { type: graphql.GraphQLFloat },
    buzz: { type: buzzType },
    sentiment: { type: sentimentType },
  }
});

const endpoint = {
  type: newsSentimentType,
  resolve: newsSentimentResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  }
}

module.exports = { endpoint, type: newsSentimentType, resolver: newsSentimentResolver };