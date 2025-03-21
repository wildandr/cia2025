"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FooterVariant } from "./types";

const bgColorMap = {
  cic: 'bg-cic-footer',
  craft: 'bg-craft-primary',
  sbc: 'bg-sbc-primary',
  fcec: 'bg-fcec-primary'
} as const;

export function Footer() {
  const pathname = usePathname();
  
  // Extract variant from pathname
  const getVariant = (): FooterVariant => {
    if (pathname.includes('/cic')) return 'cic';
    if (pathname.includes('/craft')) return 'craft';
    if (pathname.includes('/sbc')) return 'sbc';
    if (pathname.includes('/fcec')) return 'fcec';
    return 'craft'; // default fallback
  };

  const variant = getVariant();

  return (
    <footer className={`${bgColorMap[variant]} text-white flex flex-col w-full `}>
      <div className="md:hidden p-10">
        <div className="mb-4">
          <Image
            src="/assets/logo.png"
            alt="Lustrum XI KMTSL Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Formulir Section */}
        <div className="text-left ">
          <h2 className="text-lg md:text-xl font-bold mb-2">Formulir</h2>
          <ul className="text-sm md:text-base space-y-1">
            <li>
              <Link href="/form/craft" className="hover:underline">
                Registrasi Peserta CRAFT &gt;
              </Link>
            </li>
            <li>
              <Link href="/form/cic" className="hover:underline">
                Registrasi Peserta CIC &gt;
              </Link>
            </li>
            <li>
              <Link href="/form/sbc" className="hover:underline">
                Registrasi Peserta SBC &gt;
              </Link>
            </li>
            <li>
              <Link href="/form/pece" className="hover:underline">
                Registrasi Peserta PCEC &gt;
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="w-full md:w-1/2 h-[1px] bg-white my-6"></div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4 w-full justify-center">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 border p-3 rounded-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 border p-3 rounded-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 border p-3 rounded-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm md:text-base text-center">
          Copyright Lustrum-XI KMTSL 2024
        </p>
      </div>
      {/* Desktop Footer */}
      <div className="hidden md:flex flex-col w-full mx-auto max-w-[90rem] px-14 pt-14 pb-10 justify-start">
        <div className="flex gap-5 justify-start items-start">
          <Image
            src="/assets/logo.png"
            alt="Lustrum XI KMTSL Logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <div className="flex flex-col gap-4">
            <p className="font-medium text-xl">Formulir</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-5">
                <Link href="/form/craft" className="hover:underline ">
                  Registrasi Peserta CRAFT &gt;
                </Link>
                <Link href="/form/cic" className="hover:underline ">
                  Registrasi Peserta CIC &gt;
                </Link>
              </div>
              <div className="flex flex-col gap-5">
                <Link href="/form/sbc" className="hover:underline">
                  Registrasi Peserta SBC &gt;
                </Link>
                <Link href="/form/fcec" className="hover:underline">
                  Registrasi Peserta FCEC &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  h-[1px] bg-white my-6"></div>
        <div className="relative flex justify-between">
        <div className="flex space-x-4 mb-4 ">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 border p-3 rounded-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 border p-3 rounded-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 border p-3 rounded-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </Link>
        </div>
        <p className="text-sm md:text-base font-semibold">
          Copyright Lustrum-XI KMTSL 2025
        </p>
        </div>
      
      </div>
    </footer>
  );
}
