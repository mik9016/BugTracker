import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { UtilContextProvider } from "./contexts/UtilitiesContext";
import { DbContextProvider } from "./contexts/DbContext";
import {TeamContextProvider } from './contexts/TeamContext';

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <UtilContextProvider>
      <AuthContextProvider>
        <DbContextProvider>
          <TeamContextProvider>
          <App />
          </TeamContextProvider>
        </DbContextProvider>
      </AuthContextProvider>
    </UtilContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
