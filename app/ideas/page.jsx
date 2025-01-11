"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import Navbar from "../(components)/Navbar";
import SelectButton from "../(components)/SelectButton";
import IdeasCard from "../(components)/IdeasCard";
import Pagination from "../(components)/Pagination";
import { imageParser, publishedDateConverter } from "../lib/lib";

const IdeasPage = () => {
  const BASE_URL_IDEAS = `${process.env.NEXT_PUBLIC_BASE_URL}/ideas`;
  const API_URL_IDEAS = `${process.env.NEXT_PUBLIC_API_URL}/ideas`;

  const [ideasData, setIdeasData] = useState(null);
  const [showPage, setShowPage] = useState(10);
  const [sortItem, setSortItem] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemPerPage = ["10", "20", "50"];
  const sortBy = ["Newest", "Oldest"];

  const buildQueryParams = () => {
    const sortValue = sortItem === "Newest" ? "-published_at" : "published_at";
    return `?page[number]=${currentPage}&page[size]=${showPage}&append[]=small_image&append[]=medium_image&sort=${sortValue}`;
  };

  useEffect(() => {
    if (!API_URL_IDEAS) {
      setError("API URL is not defined");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL_IDEAS}${buildQueryParams()}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          console.log("Error fetching data");
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setIdeasData(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL_IDEAS]);

  const filteredData = data
    .sort((a, b) => {
      if (sortItem === "Newest") return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    })
    .slice(0, showPage);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col h-screen w-full bg-white text-black">
      {/* <Navbar /> */}
      <div className="flex flex-col">
        <HeroSection />
        <div className="flex items-center justify-between mx-24 my-16">
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
            {ideasData &&
              ideasData.map((data) => (
                <IdeasCard
                  key={data.id}
                  title={data.title}
                  publishedDate={publishedDateConverter(data.published_at)}
                  url={`${BASE_URL_IDEAS}/${data.slug}`}
                  imageSrc={imageParser(data.content)}
                />
              ))}
          </div>
        </div>
        <div className="flex justify-center my-10">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(ideasData.length / showPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default IdeasPage;
