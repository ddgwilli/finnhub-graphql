const graphql = require('graphql');

const exchanges = require('./exchanges.js');
const symbols = require('./symbols.js');
const executives = require('./executives.js');
const { endpoint: news } = require('./news.js');
const companyNews = require('./company_news.js');
const majorDevelopments = require('./major_developments.js');
const newsSentiment = require('./news_sentiment.js');
const peers = require('./peers.js');
const metrics = require('./metrics.js');
const investorOwnership = require('./investor_ownership.js');

const query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    exchanges,
    symbols,
    executives,
    news,
    companyNews,
    majorDevelopments,
    newsSentiment,
    peers,
    metrics,
    investorOwnership,
  },
});

module.exports = query;