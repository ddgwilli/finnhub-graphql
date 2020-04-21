const graphql = require('graphql');
const fetch = require('node-fetch');

const getNews = (category, minId = 0) => {
  return fetch(`https://finnhub.io/api/v1/news?category=${category}&minId=${minId}&token=bqf4ig7rh5rashj94d9g`)
  .then(response => {return response.json()});
}

const newsResolver = (_, { category, minId }) => {
  return getNews(category, minId);
}

const newsCategoryType = new graphql.GraphQLEnumType({
  name: 'NewsCategory',
  values: {
    general: { value: 'general'},
    forex: { value: 'forex'},
    crypto: { value: 'crypto'},
    merger: { value: 'merger'},
  }
});

const newsType = new graphql.GraphQLObjectType({
  name: 'News',
  fields: {
    category: { type: graphql.GraphQLString },
    datetime: { type: graphql.GraphQLInt },
    id: { type: graphql.GraphQLInt },
    headline: { type: graphql.GraphQLString },
    image: { type: graphql.GraphQLString },
    related: { type: graphql.GraphQLInt },
    source: { type: graphql.GraphQLInt },
    summary: { type: graphql.GraphQLInt },
    url: { type: graphql.GraphQLInt },
  },
});

const endpoint = {
  type: new graphql.GraphQLList(newsType),
  resolve: newsResolver,
  args: {
    category: { type: graphql.GraphQLNonNull(newsCategoryType) },
    minId: { type: graphql.GraphQLInt },
  }
}

module.exports = { endpoint, type: new graphql.GraphQLList(newsType) };