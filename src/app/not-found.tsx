"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NotFound() {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <main className="h-screen flex flex-col xl:flex-row items-center justify-center pt-10 bg-cia-primary text-white bg-[url('/assets/autentikasi/teksture.svg')] bg-cover bg-center font-plusJakarta relative">
      <Image
        alt="background"
        src={"/assets/autentikasi/teksture_city.svg"}
        width={500}
        height={500}
        className="w-full h-auto absolute bottom-0"
      />
      <div className="h-2/5 lg:h-full w-full flex flex-col justify-end lg:justify-center items-center relative px-8 z-50">
        <div className="absolute top-[15%] left-[15%]">
          <Image
            alt="title"
            src="/assets/autentikasi/star.svg"
            className="w-2/5 md:w-3/5 xl:w-4/5 h-auto z-10"
            width={500}
            height={500}
          />
        </div>
        <Image
          alt="title"
          src="/assets/autentikasi/title.svg"
          className="w-3/5 md:w-2/5 xl:w-3/5 h-auto z-10"
          width={500}
          height={500}
        />
      </div>
      <div className="h-4/5 lg:h-full w-full xl:w-4/5 flex flex-col py-[4%]">
        <div className="flex flex-col h-full bg-[url('/assets/autentikasi/bg-form-mobile.svg')] md:bg-[url('/assets/autentikasi/bg-form-md.svg')] lg:bg-[url('/assets/autentikasi/bg-form.svg')] bg-contain lg:bg-cover bg-center lg:bg-left bg-no-repeat justify-center items-center xl:items-start xl:ps-[10%] z-10">
          <div className="w-full h-full flex flex-col justify-center px-[20%] xl:px-8 xl:ps-[10%]">
            <div className="text-center">
              <div className="relative flex gap-5 mx-auto justify-center items-center">
                <Image
                  src="/assets/ornament_question.png"
                  alt="CIA Logo"
                  className="object-contain w-14 h-14 md:w-20 md:h-20 mb-8 animate-bounce "
                  priority
                  width={1000}
                  height={1000}
                />
                <Image
                  src="/assets/ornament_questionmid.png"
                  alt="CIA Logo"
                  className="object-contain w-14 h-14 md:w-20 md:h-20 mb-8 animate-bounce "
                  priority
                  width={1000}
                  height={1000}
                />
                <Image
                  src="/assets/ornament_questionright.png"
                  alt="CIA Logo"
                  className="object-contain w-14 h-14 md:w-20 md:h-20 mb-8 animate-bounce "
                  priority
                  width={1000}
                  height={1000}
                />
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Halaman Tidak Ditemukan
              </h2>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah
                dipindahkan. Silakan kembali ke halaman utama.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-white text-cia-primary rounded-lg 
          hover:bg-opacity-90 transition-all duration-200 font-semibold 
          hover:scale-105 active:scale-95"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
