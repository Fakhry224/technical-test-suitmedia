"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) params.delete("page");
    else params.set("page", page);

    router.push(`?${params.toString()}`);
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

      {[1, 2, 3, 4, 5].map((page) => (
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
        disabled={currentPage === 5}
        className={`rounded-full p-2 text-sm ${
          currentPage === 5
            ? "text-gray-400 cursor-not-allowed"
            : "hover:text-orange-500"
        }`}
      >
        &gt;
      </button>

      <button
        onClick={() => handlePageChange(5)}
        disabled={currentPage === 5}
        className={`rounded-full p-2 text-sm ${
          currentPage === 5
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
