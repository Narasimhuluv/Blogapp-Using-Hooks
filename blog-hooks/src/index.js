import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./stylesheets/style.css";
import "./stylesheets/custom.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
