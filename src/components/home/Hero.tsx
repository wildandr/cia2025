"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rotation >= 30 || rotation <= 1) {
        setDirection((prevDirection) => -prevDirection);
      }
      setRotation((prevRotation) => prevRotation + 30 * direction);
    }, 500);

    return () => clearInterval(interval);
  }, [rotation, direction]);

  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };
  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <>
      <Image
        src={`/assets/home/logo.svg`}
        className="h-20 md:h-28 w-auto absolute top-[10%] lg:top-[10%] left-[20%] md:left-[30%]"
        width={1000}
        height={1000}
        style={{ transform: `rotate(${rotation}deg)` }}
        alt={""}
      />

      <Image
        src={`/assets/home/craft-logo.svg`}
        className="h-20 md:h-28 w-auto absolute top-[10%] lg:top-[10%] right-[20%] md:right-[30%]"
        width={1000}
        height={1000}
        style={{ transform: `rotate(${rotation}deg)` }}
        alt={""}
      />

      <Image
        src={`/assets/home/cic-logo.svg`}
        className="h-16 md:h-32 w-auto absolute top-[25%] lg:top-[35%] left-[5%]"
        width={1000}
        height={1000}
        style={{ transform: `rotate(${rotation}deg)` }}
        alt={""}
      />

      <Image
        src={`/assets/home/crane-logo.svg`}
        className="h-14 lg:h-28 w-auto absolute -bottom-[5%] lg:bottom-[15%] left-[14%] hidden lg:block"
        width={1000}
        height={1000}
        style={{ transform: `rotate(${rotation}deg)` }}
        alt={""}
      />

      <Image
        src={`/assets/home/monitor-logo.svg`}
        className="h-10 md:h-14 lg:h-32 w-auto absolute bottom-[-10%] lg:bottom-[5%] left-[33%] hidden lg:block"
        width={1000}
        height={1000}
        style={{ transform: `rotate(${rotation}deg)` }}
        alt={""}
      />

      <Image
        src={`/assets/home/sketch-logo.svg`}
        className="h-10 md:h-14 lg:h-32 w-auto absolute bottom-[-10%] lg:bottom-[5%] right-[33%] hidden lg:block"
        width={1000}
        height={1000}
        style={{ transform: `rotate(${rotation}deg)` }}
        alt={""}
      />

      <Image
        src={`/assets/home/fcec-logo.svg`}
        className="h-10 lg:h-32 w-auto absolute -bottom-[5%] lg:bottom-[15%] right-[10%] hidden lg:block"
        width={1000}
        height={1000}
        style={{ transform: `rotate(${rotation}deg)` }}
        alt={""}
      />
      <Image
        src={`/assets/home/sbc-logo.svg`}
        className="h-16 md:h-28 w-auto absolute top-[25%] lg:top-[35%] right-[5%] lg:right-[10%]"
        width={1000}
        height={1000}
        style={{ transform: `rotate(${rotation}deg)` }}
        alt={""}
      />
      <Image
        src={`/assets/autentikasi/star.svg`}
        className="h-36 md:h-44 lg:h-56 w-auto absolute top-[20%] md:top-[23%] left-[15%] md:left-[20%] lg:left-[22%]"
        width={1000}
        height={1000}
        // style={{ transform: `rotate(${rotation}deg)` }}
        alt={""}
      />

      <div className="h-screen w-full bg-cia-primary bg-[url('/assets/autentikasi/teksture.svg')] bg-cover bg-center font-plusJakarta">
        <div className="flex min-h-screen w-full items-center justify-center py-2 px-8">
          <div className="flex flex-col items-center text-center mt-[30%] lg:mt-4">
            <Image
              src={`/assets/home/title.svg`}
              className="w-[669px] h-auto justify-center z-50 hidden lg:block"
              width={1000}
              height={1000}
              alt={""}
            />
            <Image
              src={`/assets/home/title-mobile.svg`}
              className="w-[60%] h-auto justify-center z-50 lg:hidden"
              width={1000}
              height={1000}
              alt={""}
            />
            <div className="text-white w-full md:w-[70%] my-4">
              <p className="mb-2 z-50 text-xl lg:text-3xl font-LibreBaskerville">
                13th Civil In Action
              </p>
              <p className="z-50 text-xs lg:text-base font-sfui">
                Civil In Action adalah event tahunan yang diselenggarakan oleh
                mahasiswa Departemen Teknik Sipil dan Lingkungan (DTSL) Fakultas
                Teknik UGM yang bertujuan sebagai wadah untuk mengembangkan ilmu
                pengetahuan dan keprofesian di bidang teknik sipil dan
                lingkungan bagi semua pihak yang terlibat
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 w-full md:w-[70%] justify-center items-center font-sans">
              <button
                onClick={handleLoginClick}
                className="w-full lg:w-[20%] relative border border-white text-white px-4 py-2 rounded-md font-bold z-50 hover:opacity-50"
              >
                Masuk
              </button>
              <button
                onClick={handleRegisterClick}
                className="w-full lg:w-[20%] border-r-[3px] border-b-[3px] border-gray-200 bg-white shadow-md shadow-gray-800 text-cia-dark px-4 py-2 rounded-md font-bold z-50 hover:opacity-50"
              >
                Daftar Sekarang !
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
