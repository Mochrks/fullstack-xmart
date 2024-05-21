const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectMongoDB = require("./config/mongo");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const { schema } = require("./schema");
const root = require("./resolvers");
const app = express();

connectMongoDB();

app.use(express.json());
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
const server = new ApolloServer({
  schema,
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

module.exports = app;
