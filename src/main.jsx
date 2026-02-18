import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/App.css";
import "./styles/Gradient.css";

console.log("main.jsx loaded");

const root = document.getElementById("root");
console.log("Root element:", root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);