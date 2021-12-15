import path from "path";

import { loadFilesSync } from "@graphql-tools/load-files";
const { mergeTypeDefs } = require("@graphql-tools/merge");

const typesArray = loadFilesSync(path.join(__dirname, "."), {
  recursive: false,
  extensions: ["graphql"],
});

const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;
