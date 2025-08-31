import { useSearchParams } from "react-router-dom";

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value) => {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-between gap-2">
      {options.map((option) => (
        <button key={option.value} onClick={() => handleClick(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
