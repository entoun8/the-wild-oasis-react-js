import React from "react";

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps): React.JSX.Element {
  return (
    <main data-error-fallback="true">
      <div data-error-box="true">
        <h1>Something went wrong!</h1>
        <p>{error?.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </main>
  );
}

export default ErrorFallback;