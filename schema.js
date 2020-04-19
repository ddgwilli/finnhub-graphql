const graphql = require('graphql');
const query = require('./query.js');

const schema = new graphql.GraphQLSchema({ query })

module.exports = schema;