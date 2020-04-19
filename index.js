const graphqlHTTP = require('express-graphql');
const express = require('express');

const schema = require('./schema.js');

const app = express();
app.use('/', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(3000);

console.log('Running GraphiQL server at https://localhost:3000/graphql');