import React from "react";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

interface PaginationProps {
  count: number;
}

const Pagination: React.FC<PaginationProps> = ({ count }) => {
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

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60">
      <p className="text-sm text-slate-600">
        Showing{" "}
        <span className="font-semibold text-slate-800">{(currentPage - 1) * PAGE_SIZE + 1}</span>{" "}
        to <span className="font-semibold text-slate-800">{Math.min(currentPage * PAGE_SIZE, count)}</span> of{" "}
        <span className="font-semibold text-slate-800">{count}</span> results
      </p>
      <div className="flex items-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={handlePrev}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white/80 border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
        >
          Previous
        </button>
        <span className="text-sm text-slate-600">
          Page {currentPage} of {pageCount}
        </span>
        <button
          disabled={currentPage === pageCount}
          onClick={handleNext}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white/80 border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
