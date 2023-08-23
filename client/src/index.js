import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminContextProvider from "./components/AdminPanel/store/AdminContextProvider";
import SessionContextProvider from "./session-store/SessionContextProvider";

const baseURL = "http://localhost:3080";
localStorage.setItem("baseURL", baseURL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionContextProvider>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </SessionContextProvider>
  </React.StrictMode>
);
