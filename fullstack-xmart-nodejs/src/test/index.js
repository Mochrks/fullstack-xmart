const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const path = require("path");

const typeDefs = loadSchemaSync(path.join(__dirname, "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

module.exports = makeExecutableSchema({ typeDefs });
