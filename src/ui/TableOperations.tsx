import React from "react";

interface TableOperationsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function TableOperations({ children, ...props }: TableOperationsProps): React.JSX.Element {
  return (
    <div data-table-operations="true" {...props}>
      {children}
    </div>
  );
}

export default TableOperations;