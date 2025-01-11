"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) params.delete("page");
    else params.set("page", page);

    router.push(`?${params.toString()}`);
    if (onPageChange) onPageChange(page);
  };

  const generatePageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="row flex items-center gap-2 text-black">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`rounded-full p-2 text-sm ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "hover:text-orange-500"
        }`}
      >
        &lt;&lt;
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-full p-2 text-sm ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "hover:text-orange-500"
        }`}
      >
        &lt;
      </button>

      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`rounded-full py-2 px-4 text-sm ${
            currentPage === page
              ? "bg-orange-500 text-white font-bold"
              : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-full p-2 text-sm ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "hover:text-orange-500"
        }`}
      >
        &gt;
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`rounded-full p-2 text-sm ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "hover:text-orange-500"
        }`}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
