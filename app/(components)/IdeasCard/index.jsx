import Image from "next/image";
import React from "react";

const IdeasCard = () => {
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-[300px]">
      <div className="relative h-56 overflow-hidden text-white rounded-md object-cover">
        <Image src="/images/dummy-photo-1.jpg" alt="card-image" fill />
      </div>
      <div className="p-4">
        <h6 className="mb-2 text-slate-400 text-md font-semibold">
          12 January 2025
        </h6>
        <h1 className="text-slate-800 text-xl font-bold leading-normal line-clamp-3">
          Petualangan Tak Terlupakan di Negeri Sakura: Panduan Lengkap
          Mengunjungi Tempat-Tempat Ikonik di Jepang
        </h1>
      </div>
    </div>
  );
};

export default IdeasCard;
