"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import SelectButton from "../(components)/SelectButton";
import IdeasCard from "../(components)/IdeasCard";
import Pagination from "../(components)/Pagination";
import { imageParser, publishedDateConverter } from "../lib/lib";

const IdeasPage = () => {
  const BASE_URL_IDEAS = `${process.env.NEXT_PUBLIC_BASE_URL}/ideas`;
  const API_URL_IDEAS = `${process.env.NEXT_PUBLIC_API_URL}/ideas`;

  const [ideasData, setIdeasData] = useState([]);
  const [showPage, setShowPage] = useState(10);
  const [sortItem, setSortItem] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [itemPerPage, setItemPerPage] = useState(["10", "20", "50"]);
  const [sortBy, setSortBy] = useState(["Newest", "Oldest"]);

  useEffect(() => {
    setItemPerPage((prev) => {
      const updated = [
        String(showPage),
        ...prev.filter((item) => item !== String(showPage)),
      ];
      return updated;
    });
  }, [showPage]);

  useEffect(() => {
    setSortBy((prev) => {
      const updated = [sortItem, ...prev.filter((item) => item !== sortItem)];
      return updated;
    });
  }, [sortItem]);

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
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL_IDEAS}${buildQueryParams()}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
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
  }, [API_URL_IDEAS, currentPage, showPage, sortItem]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col h-screen w-full bg-white text-black">
      <div className="flex flex-col">
        <HeroSection />
        <div className="flex flex-col md:flex-row items-center justify-between mx-12 md:mx-24 my-16">
          <p className="my-10 md:my-0">
            Showing 1 - {ideasData.length} of {ideasData.length}
          </p>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex items-center justify-between gap-5 md:justify-normal ">
              Show per page:
              <SelectButton
                options={itemPerPage}
                handler={(value) => setShowPage(Number(value))}
              />
            </div>
            <div className="flex items-center justify-between gap-5 md:justify-normal">
              Sort by:
              <SelectButton
                options={sortBy}
                handler={(value) => setSortItem(value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {ideasData.map((data) => (
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
