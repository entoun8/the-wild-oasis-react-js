import React from "react";
import type { ConfirmDeleteProps } from "../types";

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ resourceName, onConfirm, disabled, onCloseModal }) => {
  return (
    <div className="max-w-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Delete {resourceName}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end space-x-3">
        <button 
          disabled={disabled} 
          onClick={onCloseModal}
          className="px-4 py-2 text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button 
          disabled={disabled} 
          onClick={onConfirm}
          className="px-4 py-2 text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
