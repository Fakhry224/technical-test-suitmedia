"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import Navbar from "../(components)/Navbar";
import SelectButton from "../(components)/SelectButton";
import IdeasCard from "../(components)/IdeasCard";
import Pagination from "../(components)/Pagination";
import Image from "next/image";

const IdeasPage = () => {
  const [showPage, setShowPage] = useState(10);
  const [sortItem, setSortItem] = useState("Newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemPerPage = ["10", "20", "50"];
  const sortBy = ["Newest", "Oldest"];

  const data = [
    { id: 1, title: "Idea 1", date: "2025-01-01" },
    { id: 2, title: "Idea 2", date: "2025-01-05" },
    { id: 3, title: "Idea 3", date: "2025-01-10" },
  ];

  const filteredData = data
    .sort((a, b) => {
      if (sortItem === "Newest") return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    })
    .slice(0, showPage);

  return (
    <div className="flex flex-col h-screen w-full bg-white text-black">
      {/* <Navbar /> */}
      <div className="flex flex-col">
        <HeroSection />
        <div className="flex items-center justify-between mx-20 my-16">
          <p>
            Showing 1 - {filteredData.length} of {data.length}
          </p>
          <div className="flex gap-10">
            <div className="flex items-center gap-5">
              Show per page:
              <SelectButton
                options={itemPerPage}
                handler={(value) => setShowPage(Number(value))}
              />
            </div>
            <div className="flex items-center gap-5">
              Sort by:
              <SelectButton
                options={sortBy}
                handler={(value) => setSortItem(value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-5">
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
          </div>
        </div>
        <div className="flex justify-center my-10">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default IdeasPage;
