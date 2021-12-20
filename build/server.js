"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import connectDB from "./config/db";
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./graphql/schema/schema"));
const resolver_1 = __importDefault(require("./graphql/resolver/resolver"));
const config_1 = __importDefault(require("./db/config"));
const auth_1 = __importDefault(require("./auth"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_core_1 = require("apollo-server-core");
const path_1 = __importDefault(require("path"));
(0, config_1.default)();
dotenv_1.default.config();
async function startApolloServer(typeDefs, resolvers) {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.static(path_1.default.join(__dirname, "../client/ibriz-blog-client", "build")));
    // Handles any requests that don't match the ones above
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../client/ibriz-blog-client/build", "index.html"));
    });
    app.use(express_1.default.static("../client/ibriz-blog-client/public"));
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        context: async ({ req }) => {
            const user = await (0, auth_1.default)(req.headers.authorization || "");
            return {
                user,
            };
        },
        introspection: true,
    });
    await server.start();
    server.applyMiddleware({
        app,
        path: "/graphql/",
    });
    await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}}${server.graphqlPath}`);
}
startApolloServer(schema_1.default, resolver_1.default);
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
