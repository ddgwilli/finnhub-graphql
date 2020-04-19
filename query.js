const graphql = require('graphql');

const { endpoint: exchanges } = require('./exchanges.js');
const { endpoint: symbols } = require('./symbols.js');
const { endpoint: executives } = require('./executives.js');
const { endpoint: news } = require('./news.js');
const { endpoint: companyNews } = require('./company_news.js');
const { endpoint: majorDevelopments } = require('./major_developments.js');
const { endpoint: newsSentiment } = require('./news_sentiment.js');
const { endpoint: peers } = require('./peers.js');
const { endpoint: metrics } = require('./metrics.js');
const { endpoint: investorOwnership } = require('./investor_ownership.js');
const { endpoint: fundOwnership } = require('./fund_ownership.js');
const { endpoint: ipoCalendar } = require('./ipo_calendar.js');

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
    fundOwnership,
    ipoCalendar,
  },
});

module.exports = query;