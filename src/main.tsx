import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import App from "./App.tsx";
import ErrorFallback from "./ui/ErrorFallback.tsx";

function resetToRoot() {
  window.location.assign("/");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetToRoot}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
