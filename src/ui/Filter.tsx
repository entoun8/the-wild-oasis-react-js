import React from "react";
import { useSearchParams } from "react-router-dom";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  filterField: string;
  options: FilterOption[];
}

const Filter: React.FC<FilterProps> = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0]?.value;

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`px-3 py-2 text-sm rounded-md ${
            currentFilter === option.value
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 border border-slate-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
