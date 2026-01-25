"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PagePagination({ currentPage, totalPages, onPageChange }) {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition
          ${canPrev ? "bg-white text-gray-900 border-gray-200 hover:bg-gray-50" : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"}
        `}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} /> Prev
      </button>

      <span className="text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition
          ${canNext ? "bg-white text-gray-900 border-gray-200 hover:bg-gray-50" : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"}
        `}
        aria-label="Next page"
      >
        Next <ChevronRight size={18} />
      </button>
    </div>
  );
}
