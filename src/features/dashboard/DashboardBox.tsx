import React from "react";

interface DashboardBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DashboardBox({ children, ...props }: DashboardBoxProps): React.JSX.Element {
  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
      data-dashboard-box="true" 
      {...props}
    >
      {children}
    </div>
  );
}

export default DashboardBox;