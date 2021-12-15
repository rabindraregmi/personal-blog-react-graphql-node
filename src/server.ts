import express, { Application } from "express";
//import connectDB from "./config/db";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./graphql/schema/schema";
import resolvers from "./graphql/resolver/resolver";
import connectDB from "./db/config";

const app: Application = express();

connectDB();
dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// The `listen` method launches a web server.
const PORT = process.env.PORT || 4000;
server
  .listen({ port: PORT })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${JSON.stringify(url)}`);
  })
  .catch((error) => console.error(error));

// const corsOptions = {
// 	origin: "*",
// 	methods: ["GET", "POST"],

// 	allowedHeaders: ["Content-Type"],
// };

// app.use(cors(corsOptions));
// app.use(express.static("uploads"));
// app.listen(PORT, ()=>console.log(`Server started running on ${PORT}`))
