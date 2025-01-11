"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/ideas", label: "Ideas" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`fixed w-full py-3 px-8 lg:px-24 z-50 transition-transform duration-300 ${
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
            loading="lazy"
            height={100}
            width={150}
          />
        </div>
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <Image
                src="/icons/cross-menu.svg"
                alt="Cross Icon"
                loading="lazy"
                height={40}
                width={40}
              />
            ) : (
              <Image
                src="/icons/burger-menu.svg"
                alt="Cross Icon"
                loading="lazy"
                height={40}
                width={40}
              />
            )}
          </button>
        </div>
        <div
          className={`h-fit text-white font-semibold text-lg lg:block ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col lg:flex-row gap-4 md:gap-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-slate-700 ${
                  pathname === link.href
                    ? "border-b-4 border-white"
                    : "border-b-4 border-transparent"
                } pb-1`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
