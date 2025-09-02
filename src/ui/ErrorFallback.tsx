import React from "react";
import type { ErrorFallbackProps } from "../types";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps): React.JSX.Element {
  return (
    <main className="h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Something went wrong!
            </h1>
            <p className="text-slate-600 mb-6">
              {error?.message || "An unexpected error occurred"}
            </p>
          </div>
          <button 
            onClick={resetErrorBoundary}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}

export default ErrorFallback;
