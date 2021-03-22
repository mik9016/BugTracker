import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { UtilContextProvider } from "./contexts/UtilitiesContext";

import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  <React.StrictMode>
    <UtilContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </UtilContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
