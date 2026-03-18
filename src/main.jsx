import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/App.css";
import "./styles/Gradient.css";
import posthog from 'posthog-js';
import * as Sentry from "@sentry/react"; 

console.log("main.jsx loaded");

Sentry.init({
  dsn: "https://ebf61b2665133a825cdcf7a9ba8d59ca@o4511027985776640.ingest.de.sentry.io/4511027990364240",
  sendDefaultPii: true, 
  environment: "development", 
});

const root = document.getElementById("root");
console.log("Root element:", root);

posthog.init('phc_5VCESRqRh3NNFwWvPNxXY1eKCvlPkHDzrKjzsEAe2Pk', {
    api_host: 'https://eu.i.posthog.com',
    loaded: () => console.log("PostHog initialized"),
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

window.addEventListener("error", (event) => {
  Sentry.captureException(event.error, {
    extra: { info: "Global error caught" }
  });
});
window.addEventListener("unhandledrejection", (event) => {
  Sentry.captureException(event.reason, {
    extra: { info: "Unhandled rejection caught" }
  });
});

export const captureFormSubmit = (formName, data) => {
  Sentry.captureMessage(`${formName} submitted`, {
    level: "info",
    extra: { ...data },
  });
  posthog.capture(`${formName}_submitted`, { ...data });
};
