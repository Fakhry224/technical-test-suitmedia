import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[30rem] flex items-center justify-center bg-black">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-section-cover.png"
          alt="Image Herosection"
          fill
          className="object-cover bg-blend-overlay"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-[150px] bg-white"
        style={{
          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
        }}
      ></div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold">Ideas</h1>
        <p className="text-lg">Where all our great things begin</p>
      </div>
    </section>
  );
};

export default HeroSection;
