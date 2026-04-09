import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const serverUrl = import.meta.env.VITE_SERVER_URL;

if (serverUrl) {
  fetch(`${serverUrl}/health`)
    .then(() => console.log("Server waking up..."))
    .catch((err) => console.log("Wakeup failed:", err));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);