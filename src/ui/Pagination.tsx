import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const handleNext = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };

  const handlePrev = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
      <p className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-medium">{(currentPage - 1) * PAGE_SIZE + 1}</span>{" "}
        to <span className="font-medium">{currentPage * PAGE_SIZE}</span> of{" "}
        <span className="font-medium">{count}</span> results
      </p>
      <div className="flex items-center space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={handlePrev}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          disabled={currentPage === pageCount}
          onClick={handleNext}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
