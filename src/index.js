import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";

import App from "./App";
import StorePLP from "./store/storePLP";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={StorePLP}>
    <App />
  </ApolloProvider>
);
