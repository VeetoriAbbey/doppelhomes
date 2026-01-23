"use client";

export default function PagePagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-10 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded-md border ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
