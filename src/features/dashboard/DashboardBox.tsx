import React from "react";

interface DashboardBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DashboardBox({ children, ...props }: DashboardBoxProps): React.JSX.Element {
  return (
    <div data-dashboard-box="true" {...props}>
      {children}
    </div>
  );
}

export default DashboardBox;