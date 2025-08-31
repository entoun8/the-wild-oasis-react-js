import React from "react";

interface DataItemProps {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function DataItem({ icon, label, children }: DataItemProps): React.JSX.Element {
  return (
    <div data-data-item="true">
      <span data-data-label="true">
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;