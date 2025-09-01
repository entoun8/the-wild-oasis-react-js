import React from "react";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color?: string;
}

function Stat({ icon, title, value, color = "blue" }: StatProps): React.JSX.Element {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 text-blue-600",
    green: "from-green-500 to-green-600 text-green-600", 
    indigo: "from-indigo-500 to-indigo-600 text-indigo-600",
    yellow: "from-yellow-500 to-yellow-600 text-yellow-600",
    red: "from-red-500 to-red-600 text-red-600",
    purple: "from-purple-500 to-purple-600 text-purple-600"
  };

  const selectedColors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${selectedColors.split(' text-')[0]} text-white shadow-sm`}>
          <div className="text-xl">
            {icon}
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-800 mb-1">
            {value}
          </p>
          <h5 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
            {title}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Stat;
