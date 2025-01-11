import Image from "next/image";
import Link from "next/link";
import React from "react";

const IdeasCard = ({ title, publishedDate, url, imageSrc }) => {
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-[300px]">
      <Link href={url}>
        <div className="relative h-56 overflow-hidden text-white rounded-md object-cover">
          <Image src={imageSrc} alt="card-image" loading="lazy" fill />
        </div>
        <div className="p-4">
          <h6 className="mb-2 text-slate-400 text-md font-semibold">
            {publishedDate}
          </h6>
          <h1 className="text-slate-800 text-xl font-bold leading-normal line-clamp-3">
            {title}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default IdeasCard;
