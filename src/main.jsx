import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/App.css";
import "./styles/Gradient.css";
import posthog from 'posthog-js';

console.log("main.jsx loaded");

const root = document.getElementById("root");
console.log("Root element:", root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

posthog.init('phc_5VCESRqRh3NNFwWvPNxXY1eKCvlPkHDzrKjzsEAe2Pk', {
    api_host: 'https://eu.i.posthog.com',
    defaults: '2026-01-30'
})