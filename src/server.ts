import express, { Application } from "express";
//import connectDB from "./config/db";
import dotenv from "dotenv";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./graphql/schema/schema";
import resolvers from "./graphql/resolver/resolver";
import connectDB from "./db/config";
import getUser from "./auth";
import http from "http";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import path from "path";

connectDB();
dotenv.config();

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  app.use(cors());
  app.use(
    express.static(path.join(__dirname, "../client/ibriz-blog-client", "build"))
  );
  // Handles any requests that don't match the ones above
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../client/ibriz-blog-client/build", "index.html")
    );
  });
  app.use(express.static("../client/ibriz-blog-client/public"));
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }) => {
      const user = await getUser(req.headers.authorization || "");
      return {
        user,
      };
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql/",
  });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({ req }) => {
//     const user = await getUser(req.headers.authorization || "");
//     return {
//       user,
//     };
//   },
//   cors: {
//     origin: "*", // <- allow request from all domains
//     credentials: true,
//   },
// });

// // The `listen` method launches a web server.
// const PORT = process.env.PORT || 4000;
// server
//   .listen({ port: PORT })
//   .then(({ url }) => {
//     console.log(`🚀  Server ready at ${JSON.stringify(url)}`);
//   })
//   .catch((error) => console.error(error));
