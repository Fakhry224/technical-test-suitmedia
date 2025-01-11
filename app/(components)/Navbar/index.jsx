"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center relative">
      <div
        className={`flex relative w-full py-3 px-12 justify-between items-center z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-primary-1/70 backdrop-blur-sm shadow-md"
            : "bg-primary-1"
        }`}
      >
        <Image
          src="/images/logo.png"
          alt="Logo Suitmedia"
          width={84}
          height={42}
        ></Image>
        <div className="h-fit text-white font-semibold text-sm">
          <ul className="flex gap-10 items-center">
            <Link href="/work" className="hover:text-slate-700">
              Work
            </Link>
            <Link href="/about" className="hover:text-slate-700">
              About
            </Link>
            <Link href="/services" className="hover:text-slate-700">
              Services
            </Link>
            <Link href="/ideas" className="hover:text-slate-700">
              Ideas
            </Link>
            <Link href="/careers" className="hover:text-slate-700">
              Careers
            </Link>
            <Link href="/contact" className="hover:text-slate-700">
              Contact
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
