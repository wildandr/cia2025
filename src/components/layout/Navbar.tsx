"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/auth/useAuth";
import Cookies from "js-cookie";

export default function Nav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const activeSegment = useSelectedLayoutSegment();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { logout } = useAuth();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const userCookie = Cookies.get("user");
    setIsLoggedIn(!!userCookie);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownVisible(false);
  };

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
        setIsDropdownVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full z-[9999] ${
        activeSegment === "cic"
          ? "bg-cic-dark"
          : activeSegment === "sbc"
          ? "bg-sbc-dark"
          : activeSegment === "fcec"
          ? "bg-fcec-dark"
          : "bg-cia-dark"
      } fixed  justify-between transition-transform  lg:flex lg:px-10 items-center shadow-md font-plusJakarta ${
        isVisible
          ? "transition-transform"
          : "-translate-y-[300%] transition-transform"
      }`}
      ref={dropdownRef}
    >
      <div
        className={`flex w-full flex-row  my-3 px-4 lg:px-16 justify-between items-center`}
      >
        <Link href="/">
          <div className="h-10 w-auto flex justify-center items-center">
            <Image
              src="/assets/autentikasi/logo.svg"
              alt="logo"
              width={100}
              height={100}
              className="cursor-pointer p-[20%]"
            />
          </div>
        </Link>
        <nav
          className={`hidden lg:flex flex-row gap-1 justify-center items-center`}
        >
          <Link className={"text-white hover:underline"} href="/">
            Home
          </Link>

          <div className={`group  menu1 `}>
            <button
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-controls="menu"
              className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center hover:underline"
            >
              {/* Event */}
              <span className={`flex justify-center items-center text-white`}>
                Event
              </span>

              <svg
                className={`fill-white h-4 w-4 transform transition duration-150 ease-in-out ms-1`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <ul
              className={`shadow-lg text-cia-green w-[55%] sm:w-[45%] md:w-[28%] p-3 bg-white ${
                isDropdownVisible ? "absolute top-16 right-0" : "hidden"
              } ${
                isVisible
                  ? "transition-transform"
                  : "-translate-y-[300%] transition-transform"
              }`}
            >
              <li className={`py-2 border-b border-black`}>
                <div className="flex items-center">
                  <span className={`text-black`}>Civil in Action </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    className={`ml-3 text-black`}
                  >
                    <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                  </svg>
                </div>
                <ul className="pl-2 text-sm text-cia-green">
                  <li className="py-1 ">
                    <Link
                      href="/cic"
                      className="flex justify-between items-center hover:translate-x-1"
                    >
                      <span className={`text-black`}>
                        Registrasi Peserta CIC{" "}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        className={` fill-black`}
                      >
                        <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                      </svg>
                    </Link>
                  </li>
                  <li className="py-1 ">
                    <Link
                      href="/sbc"
                      className="flex justify-between items-center hover:translate-x-1"
                    >
                      <span className={`text-black`}>
                        Registrasi Peserta SBC{" "}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        className={` fill-black`}
                      >
                        <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                      </svg>
                    </Link>
                  </li>
                  <li className="py-1 ">
                    <Link
                      href="/fcec"
                      className="flex justify-between items-center hover:translate-x-1"
                    >
                      <span className={`text-black`}>
                        Registrasi Peserta FCEC{" "}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        className={` fill-black`}
                      >
                        <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                      </svg>
                    </Link>
                  </li>
                  <li className="py-1 ">
                    <p
                      // href="/craft"
                      className="flex justify-between items-center hover:translate-x-1"
                    >
                      <span className={`text-gray-500`}>
                        Registrasi Peserta CRAFT (Coming Soon){" "}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        className={` fill-black`}
                      >
                        <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                      </svg>
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link
            href={`/contact`}
            className={`-ml-2 text-white hover:underline
            `}
          >
            Contact
          </Link>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}

          {/* Add login button when user is not logged in */}
          {!isLoggedIn && (
            <Link
              href="/login"
              className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
        <div className="lg:hidden">
          <button
            onClick={toggleDropdown}
            className="outline-none focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="36"
              viewBox="0 0 42 36"
              fill="none"
            >
              <path
                d="M24.1818 0L6.78788 2.96471L0 18.6353L8.48485 36H34.7879L42 21.1765L39.0303 5.50588L24.1818 0Z"
                fill="white"
              />
              <path
                d="M12 26H32M12 19H32M12 12H32"
                stroke="#005A48"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <ul
            className={`shadow-lg text-cia-green w-[55%] sm:w-[45%] md:w-[28%] p-3 bg-white ${
              isDropdownVisible ? "absolute top-16 right-0" : "hidden"
            }  ${
              isVisible
                ? "transition-transform"
                : "-translate-y-[300%] transition-transform"
            }`}
          >
            <li className={`py-2 border-b border-black`}>
              <div className="flex items-center">
                <span className={`text-black`}>Civil in Action </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  className={`ml-3 fill-black`}
                >
                  <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                </svg>
              </div>
              <ul className="pl-2 text-sm text-cia-green">
                <li className="py-1 ">
                  <Link
                    href="/cic"
                    className="flex justify-between items-center hover:translate-x-1"
                  >
                    <span className={`text-black`}>
                      Registrasi Peserta CIC{" "}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      className={` fill-black`}
                    >
                      <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                    </svg>
                  </Link>
                </li>
                <li className="py-1 ">
                  <Link
                    href="/sbc"
                    className="flex justify-between items-center hover:translate-x-1"
                  >
                    <span className={`text-black`}>
                      Registrasi Peserta SBC{" "}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      className={` fill-black`}
                    >
                      <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                    </svg>
                  </Link>
                </li>
                <li className="py-1 ">
                  <Link
                    href="/fcec"
                    className="flex justify-between items-center hover:translate-x-1"
                  >
                    <span className={`text-black`}>
                      Registrasi Peserta FCEC{" "}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      className={` fill-black`}
                    >
                      <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                    </svg>
                  </Link>
                </li>
                <li className="py-1 ">
                  <Link
                    href="/craft"
                    className="flex justify-between items-center hover:translate-x-1"
                  >
                    <span className={`text-black`}>
                      Registrasi Peserta CRAFT{" "}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      className={` fill-black`}
                    >
                      <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
