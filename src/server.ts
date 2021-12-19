import express, { Application } from "express";
//import connectDB from "./config/db";
import dotenv from "dotenv";
import { ApolloServer, AuthenticationError } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./graphql/schema/schema";
import resolvers from "./graphql/resolver/resolver";
import connectDB from "./db/config";
import getUser from "./auth";

const app: Application = express();

connectDB();
dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await getUser(req.headers.authorization || "");
    console.log(":This is user", user);
    return {
      user,
    };
  },
  cors: {
    origin: "*", // <- allow request from all domains
    credentials: true,
  },
});

// The `listen` method launches a web server.
const PORT = process.env.PORT || 4000;
server
  .listen({ port: PORT })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${JSON.stringify(url)}`);
  })
  .catch((error) => console.error(error));
