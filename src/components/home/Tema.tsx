"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Tema() {
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
  const isDeviceGreaterThanMd = windowWidth >= lg_width;

  const backgroundImage = {
    backgroundImage: `url(/assets/cia/bg_tema_cia.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="relative bg-cia-primary bg-[url('/assets/autentikasi/teksture.svg')] min-h-screen p-6 flex flex-col items-center justify-center overflow-hidden">
      <Image
        src={`/assets/home/ornamen_bawah.svg`}
        width={1000}
        height={1000}
        alt=""
        className="absolute bottom-0 lg:-bottom-[10%] w-full h-auto"
      />

      <div className="flex flex-col justify-center items-center px-8">
        <Image
          src={
            isDeviceGreaterThanMd
              ? `/assets/home/bg-tema.svg`
              : `/assets/home/bg-tema-mobile.svg`
          }
          width={1000}
          height={1000}
          alt=""
          className="absolute w-[90%] lg:w-[80%] h-auto"
        />
        <div className="w-[90%] md:w-[70%] relative mt-[30%] lg:mt-[7%]">
          <p className="text-xs text-center md:text-base font-plusJakarta font-bold text-white mt-[5%] md:mt-[2%]">
            Tema 13th Civil In Action
          </p>
          <p className="text-base md:text-4xl font-plusJakarta font-bold text-white text-center mt-[5%] md:mt-[2%]">
            “Akselerasi Konektivitas Merdeka, Sinergi Membangun Indonesia”
          </p>
          <p className="text-center text-xs md:text-base font-plusJakarta text-white mt-[5%] md:mt-[2%]">
            Melalui Tema “Akselerasi Konektivitas Merdeka, Sinergi Membangun
            Indonesia”. Kegiatan ini diharapkan dapat menjadi ajang memperingati
            80 tahun Indonesia merdeka, serta menjadi landasan bagi seluruh
            pihak yang terlibat untuk bersama-sama menjadikan bangsa Indonesia
            yang merdeka, terkoneksi, dan siap dalam menyambut 2 dekade menuju
            Indonesia Emas 2045
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tema;
