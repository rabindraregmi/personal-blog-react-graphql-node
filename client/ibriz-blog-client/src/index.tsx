import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { SnackbarProvider } from "./context/SnackbarContext";
import { client } from "./client";
import { ApolloProvider } from "@apollo/client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
