const graphql = require('graphql');
const fetch = require('node-fetch');

const getIpoCalendar = (from, to) => {
  return fetch(`https://finnhub.io/api/v1/calendar/ipo?from=${from}&to=${to}&token=bqe9apvrh5rashj8u070`)
  .then(response => response.json()).then(json => json["ipoCalendar"]);
}

const ipoCalendarResolver = (_, { from, to }) => {
  return getIpoCalendar(from, to);
}

const ipoType = new graphql.GraphQLObjectType({
  name: 'IPO',
  fields: {
    date: { type: graphql.GraphQLString },
    exchange: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    numberOfShares: { type: graphql.GraphQLInt },
    price: { type: graphql.GraphQLString },
    status: { type: graphql.GraphQLString },
    totalSharesValue: { type: graphql.GraphQLFloat },
  },
});

const endpoint = {
  type: new graphql.GraphQLList(ipoType),
  resolve: ipoCalendarResolver,
  args: {
    from: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    to: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
  }
}

module.exports = { endpoint, type: new graphql.GraphQLList(ipoType) };