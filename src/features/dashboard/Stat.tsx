import React from "react";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color?: string;
}

function Stat({ icon, title, value, color }: StatProps): React.JSX.Element {
  return (
    <div data-stat="true">
      <div data-stat-icon="true" data-color={color}>{icon}</div>
      <h5 data-stat-title="true">{title}</h5>
      <p data-stat-value="true">{value}</p>
    </div>
  );
}

export default Stat;