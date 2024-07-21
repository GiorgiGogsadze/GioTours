import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/globalStyles.css";
import "./styles/index.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./components/ErrorFallBack.jsx";

if (navigator.userAgent.indexOf("iPhone") > -1) {
  document
    .querySelector("[name=viewport]")
    .setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1"
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallBack}
      onReset={() => {
        window.location.replace("/");
      }}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
