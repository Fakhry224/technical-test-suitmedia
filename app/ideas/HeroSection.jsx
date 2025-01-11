import Image from "next/image";
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[40rem] mt-10 flex items-center justify-center bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offsetY * 0.5}px)`,
        }}
      >
        <Image
          src="/images/hero-section-cover.png"
          alt="Image Herosection"
          loading="lazy"
          fill
          className="object-cover bg-blend-overlay"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-[250px] bg-white"
        style={{
          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
      ></div>

      <div
        className="relative z-10 text-center text-white"
        style={{
          transform: `translateY(${offsetY * 0.2}px)`,
        }}
      >
        <h1 className="text-5xl font-bold">Ideas</h1>
        <p className="text-xl">Where all our great things begin</p>
      </div>
    </section>
  );
};

export default HeroSection;
