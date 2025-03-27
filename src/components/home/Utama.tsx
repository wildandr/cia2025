"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Utama() {
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

  const md_width = 766;
  const lg_width = 1024;

  const isDeviceGreaterThanLg = windowWidth >= lg_width;
  const isDeviceGreaterThanMd = windowWidth >= md_width;

  const backgroundImage = {
    backgroundImage: `url(/assets/cia/bg_tema_cia.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="relative bg-cia-primary bg-[url('/assets/autentikasi/teksture.svg')] p-2 lg:p-6 pb-28 flex flex-col items-center justify-center overflow-hidden text-white">
      <Image
        src={`/assets/home/ornamen-atas.svg`}
        width={1000}
        height={1000}
        alt=""
        className="absolute top-0 w-full h-auto"
      />

      <div className="flex flex-col px-8">
        <div className="flex flex-col justify-center items-center relative w-full mt-[10%]">
          <Image
            src={`/assets/home/title_utama.svg`}
            width={1000}
            height={1000}
            alt=""
            className="w-full lg:w-[60%] h-auto"
          />
          {/* <p className='absolute top-[15%] font-plusJakarta font-bold text-6xl text-chiasGreen-500'>
                        Civil In Action X PKTSL
                    </p>
                    <p className='absolute top-[45%] left-[30%] font-plusJakarta font-bold text-2xl text-chiasGreen-500'>
                            Prize Pool Total
                    </p>
                    <p className='absolute top-[50%] left-[30%] font-plusJakarta font-bold text-9xl text-chiasGreen-500'>
                        75 JUTA
                    </p>
                    <p className='absolute bottom-[15%] right-[35%] font-plusJakarta font-bold text-2xl text-chiasGreen-500'>
                        Rupiah
                    </p> */}
        </div>
        <div className="w-full lg:w-[80%] items-start">
          <Image
            src={`/assets/cia/logo_sbc_hard.png`}
            width={1000}
            height={1000}
            alt=""
            className="w-full h-auto px-[25%] mt-[10%] lg:hidden"
          />
          <div className="flex flex-col relative w-full mt-[10%]">
            <Image
              src={
                isDeviceGreaterThanMd
                  ? "/assets/home/title-1.svg"
                  : "/assets/home/title-1-mobile.svg"
              }
              width={1000}
              height={1000}
              alt=""
              className="h-auto w-full lg:w-[70%]"
            />
            <Image
              src={`/assets/cia/logo_sbc_hard.png`}
              width={1000}
              height={1000}
              alt=""
              className="absolute w-auto h-16 lg:h-52 top-[30%] -right-[10%] lg:-right-[35%] hidden lg:block"
            />
            <p
              id={`sbc`}
              className="absolute top-[15%] md:top-[25%] left-[16%] md:left-[5%] lg:left-[2%] 2xl:left-[5%] font-plusJakarta font-bold text-2xl md:text-4xl text-chiasGreen-500"
            >
              Sustainable Bridge Competition (SBC)
            </p>
          </div>
          <p className="text-white text-justify my-4">
            Sustainable Bridge Competition (SBC) merupakan lomba rancang
            jembatan tingkat nasional yang akan diikuti oleh kurang lebih 20 tim
            dari seluruh universitas dan/atau sederajat di Indonesia dengan
            masing-masing tim beranggotakan tiga mahasiswa/i aktif D3, D4, atau
            S1 Teknik Sipil sebagai tim inti, satu hingga tiga mahasiswa/i
            sebagai tim support pada tahap perakitan, serta satu dosen
            pembimbing.
          </p>
          <p className="text-white text-justify my-4">
            Sustainable Bridge Competition mengusung tema “Realisasi Ibu Kota
            Impian dengan Jembatan Inovatif dan Berkelanjutan Karya Pionir
            Pembangunan Bangsa.” Tema ini diambil dengan berkonsentrasi pada
            pionir pembangunan dengan mengacu pada Ibu Kota Negara baru,
            Nusantara yang berkelanjutan berupa desain jembatan dengan
            mengutamakan hasil inovatif yang mengacu pada konfigurasi struktur,
            sambungan, metode perakitan, dan metode perawatan
          </p>
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <Link
              href={`#persyaratan`}
              className="border justify-center border-white flex flex-row w-full lg:w-auto text-white py-2 my-2 px-8 rounded-lg text-xs lg:text-base hover:opacity-50 items-center"
            >
              Persyaratan Pendaftaran
              <span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="100" viewBox="0 0 24 24" className="fill-current text-chiasGreen-500 h-5">
                                <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                            </svg> */}
              </span>
            </Link>
            <Link
              href={`/sbc`}
              className=" justify-center bg-craft-secondary flex flex-row w-full lg:w-auto border text-chiasGreen-500 py-2 my-2 px-6 rounded-lg text-xs lg:text-base hover:opacity-50 items-center"
            >
              Formulir Pendaftaran SBC
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="100"
                  viewBox="0 0 24 24"
                  className="fill-current text-chiasGreen-500 h-3 lg:h-5"
                >
                  <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-[80%] self-end">
          <Image
            src={`/assets/cia/logo_cic_hard.png`}
            width={1000}
            height={1000}
            alt=""
            className="w-full h-auto px-[30%] mt-[10%] lg:hidden"
          />
          <div className="flex flex-col relative w-full mt-[10%]">
            <Image
              src={
                isDeviceGreaterThanMd
                  ? "/assets/home/title-2.svg"
                  : "/assets/home/title-2-mobile.svg"
              }
              width={1000}
              height={1000}
              alt=""
              className="h-auto w-full lg:w-[70%] 2xl:w-[60%] self-end"
            />
            <Image
              src={`/assets/cia/logo_cic_hard.png`}
              width={1000}
              height={1000}
              alt=""
              className="absolute w-auto h-20 lg:h-56 top-[50%] -left-[6%] lg:-left-[25%] hidden lg:block"
            />
            <p
              id={`cic`}
              className="absolute top-[12%] md:top-[30%] left-[15%] md:left-[5%] lg:left-auto lg:right-[5%] xl:right-[8%] 2xl:right-[7%] font-plusJakarta font-bold text-2xl md:text-4xl px-4 text-chiasGreen-500"
            >
              Civil Innovation Challenge (CIC)
            </p>
          </div>
          <p className="text-white text-justify my-4">
            Civil Innovation Challenge (CIC) merupakan salah satu rangkaian
            kegiatan Civil In Action yang berfokus pada inovasi di bidang teknik
            sipil. Kegiatan ini mengajak mahasiswa/i dari seluruh Indonesia
            terutama mahasiswa yang berasal dari program studi teknik sipil
            untuk ikut berpartisipasi dalam memberikan ide-ide terbaiknya untuk
            menyelesaikan suatu permasalahan ilmu teknik sipil dan lingkungan.
          </p>
          <p className="text-white text-justify my-4">
            Pada tahun ini, Civil Innovation Challenge mengusung tema “Solusi
            Inovatif dalam Mengatasi Permasalahan Tanah pada Tahap
            Pra-Konstruksi untuk Pembangunan Ibu Kota yang Berkelanjutan”. Tema
            ini diangkat untuk menciptakan solusi mengenai ketidakstabilan tanah
            yang diharapkan dapat diterapkan dalam pembangunan ibu kota baru
            yang berkelanjutan.
          </p>
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <Link
              href={`#persyaratan`}
              className="border justify-center border-white flex flex-row w-full lg:w-auto text-white py-2 my-2 px-8 rounded-lg text-xs lg:text-base hover:opacity-50 items-center"
            >
              Persyaratan Pendaftaran
              <span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="100" viewBox="0 0 24 24" className="fill-current text-chiasGreen-500 h-5">
                                <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                            </svg> */}
              </span>
            </Link>
            <Link
              href={`cic`}
              className=" justify-center bg-craft-secondary flex flex-row w-full lg:w-auto border text-chiasGreen-500 py-2 my-2 px-6 rounded-lg text-xs lg:text-base hover:opacity-50 items-center"
            >
              Formulir Pendaftaran CIC
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="100"
                  viewBox="0 0 24 24"
                  className="fill-current text-chiasGreen-500 h-3 lg:h-5"
                >
                  <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-[80%] items-start">
          <Image
            src={`/assets/cia/logo_fcec_hard.png`}
            width={1000}
            height={1000}
            alt=""
            className="w-full h-auto px-[30%] mt-[10%] lg:hidden"
          />
          <div className="flex flex-col relative w-full mt-[10%] text-center">
            <Image
              src={
                isDeviceGreaterThanMd
                  ? "/assets/home/title-3.svg"
                  : "/assets/home/title-3-mobile.svg"
              }
              width={1000}
              height={1000}
              alt=""
              className="h-auto w-full lg:w-[80%] 2xl:w-[70%]"
            />
            <Image
              src={`/assets/cia/logo_fcec_hard.png`}
              width={1000}
              height={1000}
              alt=""
              className="absolute w-auto h-16 lg:h-52 -top-[15%] lg:top-[100%] -right-[5%] lg:-right-[30%]  hidden lg:block"
            />
            <p
              id={`fcec`}
              className="absolute top-[15%] md:top-[22%] left-[0%] md:left-[25%] lg:left-[12%] font-plusJakarta font-bold text-2xl md:text-4xl lg:text-5xl text-chiasGreen-500"
            >
              Future Civil Engineering{" "}
              {isDeviceGreaterThanMd ? <br /> : undefined} Challenge (FCEC)
            </p>
          </div>
          <p className="text-white text-justify my-4">
            FCEC (Future Civil Engineer Challenge) merupakan salah satu
            rangkaian acara 12th Civil in Action yang berfokus pada karya tulis
            ilmiah di bidang teknik sipil, lingkungan, dan sumber daya air untuk
            tingkatan SMA dan/atau sederajat. Perlombaan ini diadakan karena
            minimnya pemakaian sumber daya berkelanjutan dalam aspek
            pembangunan. Oleh karena itu, perlu adanya peran dari generasi muda
            penerus bangsa yang kreatif dan inovatif sehingga mampu melahirkan
            karya yang solutif dalam menciptakan pembangunan berwawasan
            lingkungan dan pemanfaatan sumberdaya berkelanjutan
          </p>
          <p className="text-white text-justify my-4">
            FCEC 2024 mengusung tema “Strategi generasi muda dalam menciptakan
            pembangunan berwawasan lingkungan dan pemanfaatan sumberdaya
            berkelanjutan”. Tema ini bermaksud untuk mewujudkan pembangunan
            Indonesia yang berwawasan lingkungan dengan karya kreatif dan
            inovatif dari generasi muda yang bermanfaat bagi masyarakat.
          </p>
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <Link
              href={`#persyaratan`}
              className="border justify-center border-white flex flex-row w-full lg:w-auto text-white py-2 my-2 px-8 rounded-lg text-xs lg:text-base hover:opacity-50 items-center"
            >
              Persyaratan Pendaftaran
              <span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="100" viewBox="0 0 24 24" className="fill-current text-chiasGreen-500 h-5">
                                <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                            </svg> */}
              </span>
            </Link>
            <Link
              href={`/fcec`}
              className=" justify-center bg-craft-secondary flex flex-row w-full lg:w-auto border text-chiasGreen-500 py-2 my-2 px-6 rounded-lg text-xs lg:text-base hover:opacity-50 items-center"
            >
              Formulir Pendaftaran FCEC
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="100"
                  viewBox="0 0 24 24"
                  className="fill-current text-chiasGreen-500 h-3 lg:h-5"
                >
                  <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-[80%] self-end">
          <Image
            src={`/assets/cia/logo_craft_hard.png`}
            width={1000}
            height={1000}
            alt=""
            className="w-full h-auto px-[30%] mt-[10%] lg:hidden"
          />
          <div className="flex flex-col relative w-full mt-[10%]">
            <Image
              src={
                isDeviceGreaterThanMd
                  ? "/assets/home/title-4.svg"
                  : "/assets/home/title-4-mobile.svg"
              }
              width={1000}
              height={1000}
              alt=""
              className="h-auto w-full lg:w-[80%] 2xl:w-[70%] self-end"
            />
            <Image
              src={`/assets/cia/logo_craft_hard.png`}
              width={1000}
              height={1000}
              alt=""
              className="absolute w-auto h-20 lg:h-64 top-[-30%] lg:top-[90%] -left-[5%] lg:-left-[30%]  hidden lg:block"
            />
            <p
              id={`craft`}
              className="absolute top-[15%] md:top-[22%] left-[5%] md:left-[5%] lg:left-0 lg:-right-[15%] 2xl:-right-[25%] font-plusJakarta font-bold text-lg md:text-4xl lg:text-5xl text-chiasGreen-500 text-center"
            >
              Civil Engineering Advance{" "}
              {isDeviceGreaterThanLg ? <br /> : undefined}Software Training
              (CRAFT)
            </p>
          </div>
          <p className="text-white text-justify my-4">
            Suatu persembahan dari PKTSL FT UGM, yaitu CRAFT (Civil Engineering
            Advanced Software Training) berupa seminar yang membawa materi
            seputar BIM (Building Information Modelling) yang marak pada
            akhir-akhir ini.
          </p>
          <p className="text-white text-justify my-4">
            CRAFT mengambil tema “Digital Transformation in Construction:
            Implementation Building Information Modelling (BIM) for Sustainable
            Future”. Dalam era perkembangan teknologi dan industri, konsep
            Building Information Modelling (BIM) telah menjadi bagian dari
            industri konstruksi modern. BIM telah menjadi pendorong utama dalam
            mengubah landasan industri konstruksi, membuka peluang dalam cara
            mendesain, membangun, dan mengelola proyek-proyek yang kompleks.
          </p>
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <Link
              href={`#persyaratan`}
              className="border justify-center border-white flex flex-row w-full lg:w-auto text-white py-2 my-2 px-8 rounded-lg text-xs lg:text-base hover:opacity-50 items-center"
            >
              Persyaratan Pendaftaran
              <span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="100" viewBox="0 0 24 24" className="fill-current text-chiasGreen-500 h-5">
                                <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                            </svg> */}
              </span>
            </Link>
            <Link
              href={`craft`}
              className=" justify-center bg-craft-secondary flex flex-row w-full lg:w-auto border text-chiasGreen-500 py-2 my-2 px-6 rounded-lg text-xs lg:text-base hover:opacity-50 items-center"
            >
              Formulir Pendaftaran CRAFT
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="100"
                  viewBox="0 0 24 24"
                  className="fill-current text-chiasGreen-500 h-3 lg:h-5"
                >
                  <path d="M11.109,3L11.109,3C9.78,3,8.988,4.481,9.725,5.587L14,12l-4.275,6.413C8.988,19.519,9.78,21,11.109,21h0 c0.556,0,1.076-0.278,1.385-0.741l4.766-7.15c0.448-0.672,0.448-1.547,0-2.219l-4.766-7.15C12.185,3.278,11.666,3,11.109,3z"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col w-[90%] lg:w-[40%] justify-center items-center mt-[10%] mb-[5%]">
        <Image
          src={
            isDeviceGreaterThanMd
              ? `/assets/home/title-3.svg`
              : `/assets/home/title-1.svg`
          }
          width={1000}
          height={1000}
          alt=""
          className="w-full h-auto"
        />
        <Image
          src={`/assets/cia/note.png`}
          width={1000}
          height={1000}
          alt=""
          className="absolute top-0 right-0 w-auto h-12 md:h-24"
        />
        <p
          id="persyaratan"
          className="absolute top-[18%] md:top-[28%] font-plusJakarta font-bold text-2xl md:text-4xl text-chiasGreen-500"
        >
          Persyaratan Umum
        </p>
      </div>
      <div className="relative flex flex-col w-[90%] mb-[10%] items-center">
        <Image
          src={
            isDeviceGreaterThanLg
              ? `/assets/home/bg-persyaratan.svg`
              : `/assets/home/bg-persyaratan-mobile.svg`
          }
          width={1000}
          height={1000}
          alt=""
          className="w-full h-auto"
        />
        <div className="absolute flex flex-col px-[15%] top-[6%] md:top-[10%] 2xl:top-[15%] font-plusJakarta font-bold text-xs md:text-xl 2xl:text-2xl text-chiasGreen-500 ">
          <p>● SBC </p>
          <p>
            Tim beranggotakan tiga mahasiswa/i aktif D3, D4, atau S1 Teknik
            Sipil sebagai tim inti, nol hingga tiga mahasiswa/i sebagai tim
            support pada tahap perakitan, serta satu dosen pembimbing.
          </p>
          <p className="mt-1 md:mt-4">● CIC</p>
          <p>
            Lomba ini terbuka untuk mahasiswa dari berbagai program studi dengan
            syarat dalam satu tim wajib beranggotakan minimal satu mahasiswa
            teknik sipil.
          </p>
          <p className="mt-1 md:mt-4">● FCEC </p>
          <p>
            Peserta didik SMA, SMK, MA dan/atau sederajat dari seluruh sekolah
            di Indonesia{" "}
          </p>
          <p className="mt-1 md:mt-4">● CRAFT </p>
          <p>
            1. Peserta setiap sub-event CIA 12th yang telah melakukan
            registrasi.{" "}
          </p>
          <p>
            2. Masyarakat umum yang memiliki ketertarikan terhadap perangkat
            lunak di bidang ketekniksipilan dengan rincian jumlah 50 orang untuk
            offline dan 150 orang untuk online.{" "}
          </p>
          <p>
            3. Mahasiswa/i aktif Departemen Teknik Sipil Universitas Gadjah Mada
            dengan jumlah 100 orang untuk online.{" "}
          </p>
          <Link
            href={`https://drive.google.com/drive/folders/1BIPbxrMwFPct-onz0vY670BoVGjQFChi`}
            className="w-full mt-3 md:mt-12 bg-[#18AB8E] text-white py-2 px-16 rounded-2xl hover:opacity-50 text-center font-bold text-xs md:text-base"
          >
            Download ToR
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Utama;
