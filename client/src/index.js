import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminContextProvider from "./store/AdminContextProvider";
const baseURL = "http://localhost:3080";
localStorage.setItem("baseURL", baseURL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </React.StrictMode>
);
