const graphql = require('graphql');
const fetch = require('node-fetch');

const { type: executiveType, resolver: executivesResolver } = require('./executives.js');
const { type: companyNewsType, resolver: companyNewsResolver } = require('./company_news.js');
const { type: fundOwnershipType, resolver: fundOwnershipResolver } = require('./fund_ownership.js');
const { type: investorOwnershipType, resolver: investorOwnershipResolver } = require('./investor_ownership.js');
const { type: majorDevelopmentsType, resolver: majorDevelopmentsResolver } = require('./major_developments.js');
const { type: newsSentimentType, resolver: newsSentimentResolver } = require('./news_sentiment.js');
const { type: metricsType, resolver: metricsResolver, metricCategoryType } = require('./metrics.js');
const { type: peersType, resolver: peersResolver } = require('./peers.js');

const companyResolver = (_, { symbol }) => {
  return { symbol };
}

const companyType = new graphql.GraphQLObjectType({
  name: 'Company',
  fields: {
    executives: { type: new graphql.GraphQLList(executiveType), resolve: executivesResolver },
    news: { type: new graphql.GraphQLList(companyNewsType), resolve: companyNewsResolver },
    fundOwnership: { type: new graphql.GraphQLList(fundOwnershipType), resolve: fundOwnershipResolver },
    investorOwnership: { type: new graphql.GraphQLList(investorOwnershipType), resolve: investorOwnershipResolver },
    majorDevelopments: { type: new graphql.GraphQLList(majorDevelopmentsType), resolve: majorDevelopmentsResolver },
    newsSentiment: { type: newsSentimentType, resolve: newsSentimentResolver },
    metrics: { 
      type: metricsType,
      resolve: metricsResolver,
      args: {
        metric: { type: graphql.GraphQLNonNull(metricCategoryType) },
      }
    },
    peers: { type: new graphql.GraphQLList(peersType), resolve: peersResolver },
  },
});

const endpoint = {
  type: companyType,
  resolve: companyResolver,
  args: {
    symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  }
}

module.exports = { endpoint, type: companyType };