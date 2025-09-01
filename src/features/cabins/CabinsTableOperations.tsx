import React from "react";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinsTableOperations: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "discount", label: "With discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A → Z)" },
          { value: "name-desc", label: "Sort by name (Z → A)" },
          { value: "regularPrice-asc", label: "Sort by price (Low first)" },
          { value: "regularPrice-desc", label: "Sort by price (High first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (Low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (High first)" },
        ]}
      />
    </div>
  );
};

export default CabinsTableOperations;
