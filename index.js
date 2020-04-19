const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const express = require('express');
const fetch = require('node-fetch');

const getExchanges = () => {
  return fetch('https://finnhub.io/api/v1/stock/exchange?token=bqe9apvrh5rashj8u070')
  .then(response => {return response.json()});
}

const exchangesResolver = () => {
  return getExchanges();
}

const getSymbols = () => {
  return fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bqe9apvrh5rashj8u070')
  .then(response => {return response.json()});
}

const symbolsResolver = () => {
  return getSymbols();
}

const getExecutives = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/stock/executive?symbol=${symbol}&token=bqe9apvrh5rashj8u070`)
  .then(response => response.json()).then(json => json["executive"]);
}

const executivesResolver = (_, { symbol }) => {
  return getExecutives(symbol);
}

const getNews = (category, minId = 0) => {
  return fetch(`https://finnhub.io/api/v1/news?category=${category}&minId=${minId}&token=bqe9apvrh5rashj8u070`)
  .then(response => {return response.json()});
}

const newsResolver = (_, { category, minId }) => {
  return getNews(category, minId);
}

const getCompanyNews = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/news/${symbol}?token=bqe9apvrh5rashj8u070`)
  .then(response => {return response.json()});
}

const companyNewsResolver = (_, { symbol }) => {
  return getCompanyNews(symbol);
}

const getMajorDevelopments = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/major-development?symbol=${symbol}&token=bqe9apvrh5rashj8u070`)
  .then(response => response.json()).then(json => json["majorDevelopment"]);
}

const majorDevelopmentsResolver = (_, { symbol }) => {
  return getMajorDevelopments(symbol);
}

const getNewsSentiment = (symbol) => {
  return fetch(`https://finnhub.io/api/v1/news-sentiment?symbol=${symbol}&token=bqe9apvrh5rashj8u070`)
  .then(response => {return response.json()});
}

const newsSentimentResolver = (_, { symbol }) => {
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

const majorDevelopmentType = new graphql.GraphQLObjectType({
  name: 'MajorDevelopment',
  fields: {
    symbol: { type: graphql.GraphQLString },
    date: { type: graphql.GraphQLString },
    headline: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
  }
});

const newsCategoryType = new graphql.GraphQLEnumType({
  name: 'NewsCategory',
  values: {
    general: { value: 'general'},
    forex: { value: 'forex'},
    crypto: { value: 'crypto'},
    merger: { value: 'merger'},
  }
})

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

const exchangeType = new graphql.GraphQLObjectType({
  name: 'Exchange',
  fields: {
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLString },
    currency: { type: graphql.GraphQLString },
  },
});

const symbolType = new graphql.GraphQLObjectType({
  name: 'Symbol',
  fields: {
    description: { type: graphql.GraphQLString },
    symbol: { type: graphql.GraphQLString },
    displaySymbol: { type: graphql.GraphQLString },
  },
});

const query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    exchange: {
      type: new graphql.GraphQLList(exchangeType),
      resolve: exchangesResolver,
    },
    symbol: {
      type: new graphql.GraphQLList(symbolType),
      resolve: symbolsResolver,
    },
    executive: {
      type: new graphql.GraphQLList(executiveType),
      resolve: executivesResolver,
      args: {
        symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      }
    },
    news: {
      type: new graphql.GraphQLList(newsType),
      resolve: newsResolver,
      args: {
        category: { type: graphql.GraphQLNonNull(newsCategoryType) },
        minId: { type: graphql.GraphQLInt },
      }
    },
    companyNews: {
      type: new graphql.GraphQLList(newsType),
      resolve: companyNewsResolver,
      args: {
        symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      }
    },
    majorDevelopments: {
      type: new graphql.GraphQLList(majorDevelopmentType),
      resolve: majorDevelopmentsResolver,
      args: {
        symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      }
    },
    newsSentiment: {
      type: newsSentimentType,
      resolve: newsSentimentResolver,
      args: {
        symbol: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      }
    }
  },
});

const schema = new graphql.GraphQLSchema({ query })

const app = express();
app.use('/', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(3000);

console.log('Running GraphiQL server at https://localhost:3000/graphql');