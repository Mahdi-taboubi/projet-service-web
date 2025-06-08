const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const resolvers = require("./resolvers");

const typeDefs = gql(
  fs.readFileSync("./schema.graphql", { encoding: "utf-8" })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
