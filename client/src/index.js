//1. Create a new React app.
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext"

ReactDOM.render(<AuthProvider><BrowserRouter><App /></BrowserRouter></AuthProvider>, document.getElementById("root"));

