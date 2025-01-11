"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY === 0);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed w-full py-3 px-24 z-50 transition-transform duration-300 ${
        isScrollingUp ? "translate-y-0" : "-translate-y-full"
      } ${
        isAtTop ? "bg-primary-1" : "bg-primary-1/70 backdrop-blur-sm"
      } shadow-md`}
    >
      <div className="flex justify-between items-center">
        <div className="flex">
          <Image
            src="/images/logo.png"
            alt="Logo Suitmedia"
            height={100}
            width={150}
          />
        </div>
        <div className="h-fit text-white font-semibold text-md">
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
