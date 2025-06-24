"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Contact() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const md_width = 768;
  const lg_width = 1024;

  const isDeviceGreaterThanLg = windowWidth >= lg_width;
  const isDeviceGreaterThanMd = windowWidth >= md_width;

  const backgroundImage = {
    backgroundImage: `url(/assets/autentikasi/bg-text.svg)`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      id="contact"
      className="w-full min-h-screen p-6 flex flex-col items-center justify-center relative overflow-x-clip bg-cia-primary bg-[url('/assets/autentikasi/teksture.svg')]"
    >
      <div className="flex justify-center w-full px-[7%]">
        <Image
          className="w-full h-auto"
          src={
            isDeviceGreaterThanMd
              ? `/assets/cia/bg_contact_cia.png`
              : `/assets/cia/bg_contact_cia_mobile.png`
          }
          alt=""
          width={1000}
          height={1000}
        />

        <div className="flex flex-col justify-center items-center w-full gap-4 absolute top-[8%] md:top-[22%] lg:top-[10%] px-[20%] md:px-[17%]">
          <div className="flex flex-row justify-center items-center w-full gap-4 p-x8 lg:p-8">
            <Image
              src={`/assets/autentikasi/logo.svg`}
              className="w-auto h-10 md:h-[4rem] lg:h-[7rem]"
              width={1000}
              height={1000}
              alt={""}
            />
            <Image
              src={`/assets/home/ugm-abu.svg`}
              className="w-auto h-10 md:h-[4rem] lg:h-[7rem]"
              width={1000}
              height={1000}
              alt={""}
            />
            <Image
              src={`/assets/home/kmtsl-abu.svg`}
              className="w-auto h-10 md:h-[4rem] lg:h-[7rem]"
              width={1000}
              height={1000}
              alt={""}
            />
          </div>
          <p
            className="font-LibreBaskerville text-lg lg:text-3xl font-bold text-white p-6 md:p-12"
            style={backgroundImage}
          >
            Informasi Lebih Lanjut
          </p>
          <div className="w-full flex flex-col md:flex-row items-center lg:p-4">
            <div className="w-full flex flex-col items-start justify-center gap-3 lg:gap-5">
              <div>
                <p className="font-bold font-LibreBaskerville lg:text-3xl 2xl:text-4xl text-cia-dark">
                  FCEC
                </p>
                <p className="font-bold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  1. Naiwa
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  Whatsapp :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="https://wa.me/6281346158069 "
                  >
                    081346158069
                  </Link>
                  <br />
                  Line :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="http://line.me/ti/p/~naiwaaa"
                  >
                    (naiwaaa)
                  </Link>
                </p>
                <p className="font-bold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  2. Alma
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  Whatsapp :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="https://wa.me/628211601749 "
                  >
                    08211601749
                  </Link>
                  <br />
                  Line :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="http://line.me/ti/p/~aalmaaulian"
                  >
                    (aalmaaulian)
                  </Link>
                </p>
              </div>
              <div>
                <p className="font-bold font-LibreBaskerville lg:text-3xl 2xl:text-4xl text-cia-dark">
                  CIC
                </p>
                <p className="font-bold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  1. Nabila Puspita Rena
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  WhatsApp :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="https://wa.me/6289636977055"
                  >
                    (089636977055)
                  </Link>
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  Line :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="http://line.me/ti/p/~nabila_rena"
                  >
                    (nabila_rena)
                  </Link>
                </p>
                <p className="font-bold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  2. Ni Made Jiesta Pradnya Gauri
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  WhatsApp :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="https://wa.me/6281339168272"
                  >
                    (081339168272)
                  </Link>
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  Line :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="http://line.me/ti/p/~jiiesta24"
                  >
                    (jiiesta24)
                  </Link>
                </p>
              </div>
              <div>
                <p className="font-bold font-LibreBaskerville lg:text-3xl 2xl:text-4xl text-cia-dark">
                  SBC
                </p>
                <p className="font-bold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  1. Muhammad Chairul Nusantara (Nusa)
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  WhatsApp :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="https://wa.me/6281311783896"
                  >
                    081311783896
                  </Link>
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  Line :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="http://line.me/ti/p/~24042006_"
                  >
                    24042006_
                  </Link>
                </p>
                <p className="font-bold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  2. Michelle Moody Hadhinoto (Moody)
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  WhatsApp :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="https://wa.me/62895397075008"
                  >
                    0895397075008
                  </Link>
                </p>
                <p className="font-semibold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  Line :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="http://line.me/ti/p/~michellemoody"
                  >
                    michellemoody
                  </Link>
                </p>
              </div>
              <div>
                <p className="font-bold font-LibreBaskerville lg:text-3xl 2xl:text-4xl text-cia-dark">
                  CRAFT
                </p>
                <p className="font-bold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  1. Anggito :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="https://wa.me/6281225449240"
                  >
                    081225449240
                  </Link>
                </p>
                <p className="font-bold font-LibreBaskerville text-xs lg:text-base text-cia-dark">
                  2. Nandita :{" "}
                  <Link
                    className="hover:text-blue-400 underline"
                    href="https://wa.me/6281341316170"
                  >
                    081341316170
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center mt-6 lg:mt-0">
              <div className="w-full flex flex-col border border-cia-primary items-center justify-center p-[10%] rounded-3xl gap-5">
                <Image
                  src={`/assets/home/civilinaction_qr.png`}
                  className="w-auto h-[10.5rem] lg:h-[12rem] object-contain"
                  width={1000}
                  height={1000}
                  alt={""}
                />
                <Link
                  href={`https://www.instagram.com/civilinaction?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==`}
                  className="flex flex-row bg-cia-primary border-cia-primary w-full lg:w-[40%] justify-center border text-white px-4 py-2 rounded-lg font-bold text-xs lg:text-base hover:opacity-50 items-center"
                >
                  Sponsorship
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
