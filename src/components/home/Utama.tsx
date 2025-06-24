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
            jembatan tingkat nasional yang bertujuan untuk menjadi wadah
            pengembangan potensi mahasiswa Teknik sipil agar dapat berinovasi
            dalam merancang jembatan yang dapat mendukung pembangunan
            berkelanjutan dan diharapkan Sustainable Bridge Competition (SBC)
            ini dapat memberikan gambaran lebih luas mengenai Teknik sipil.
          </p>
          <p className="text-white text-justify my-4">
            Pada tahun ini, Sustainable Bridge Competition mengusung tema
            “Merdeka Berkoneksi dengan Jembatan sebagai Pilar Akselerasi
            Pembangunan Negeri”. Tema ini diambil dengan latar belakang yang
            mencerminkan peran vital jembatan dalam pembangunan nasional.
            Jembatan, sebagai infrastruktur krusial, berfungsi menghubungkan
            wilayah-wilayah yang terpisah oleh rintangan alam, menjadi katalis
            penting dalam meningkatkan aktivitas perekonomian nasional. Nuansa
            kemerdekaan dalam tema ini mencerminkan semangat kebebasan dalam
            berkreasi dan berinovasi, sejalan dengan upaya mendorong generasi
            muda untuk berkontribusi dalam pembangunan infrastruktur nasional
            melalui ide-ide inovatif.
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
            Pada tahun ini, Civil Innovation Challenge mengusung tema “
            <b>
              Rekayasa Geoteknik Guna Membebaskan Indonesia dari Barier
              Interaksi antar Daerah
            </b>
            ”. Tema ini menyoroti bagaimana penerapan ilmu rekayasa geoteknik
            dapat berperan dalam meningkatkan konektivitas wilayah di Indonesia.
            Dengan kondisi geografis yang beragam—terdiri dari pulau-pulau,
            pegunungan, rawa, dan daerah dengan tanah yang tidak
            stabil—Indonesia menghadapi berbagai tantangan dalam pembangunan
            infrastruktur transportasi.
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
            rangkaian acara 13th Civil in Action yang berfokus pada karya tulis
            ilmiah di bidang teknik sipil, lingkungan, dan sumber daya air untuk
            tingkatan SMA/SMK/MA dan/atau sederajat pada taraf nasional.
            Kompetisi ini diadakan untuk mengatasi potensi masalah yang timbul
            dari pemenuhan pembangunan untuk mengimbangi kebutuhan manusia atas
            populasi yang kian bertambah. Pesatnya pembangunan membawa
            konsekuensi terhadap lingkungan akibat peningkatan eksploitasi
            sumber daya alam serta dampak yang menyertainya, seperti peningkatan
            emisi gas rumah kaca dari sektor energi, lonjakan jumlah limbah, dan
            krisis ketersediaan air. Oleh karena itu, diperlukan solusi-solusi
            kreatif dari generasi muda penerus bangsa yang inovatif dan
            aplikatif guna mewujudkan akselerasi transisi energi dan
            infrastruktur yang ramah lingkungan.
          </p>
          <p className="text-white text-justify my-4">
            Dalam mencapai hal tersebut, FCEC 2025 mengusung tema “Perwujudan
            Pembangunan Berkelanjutan: Peran Generasi Muda dalam Akselerasi
            Transisi Energi dan Infrastruktur Ramah Lingkungan”. Tema ini
            bermaksud untuk mewujudkan pembangunan Indonesia yang berkelanjutan
            dengan karya kreatif dan inovatif dari generasi muda serta
            bermanfaat bagi masyarakat.
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
            Civil Engineering Advance Software Training (CRAFT) merupakan
            workshop hybrid (offline dan online) yang diadakan oleh PKTSL dan
            bekerjasama dengan 13th Civil in Action di bawah naungan Keluarga
            Mahasiswa Teknik Sipil Fakultas Teknik Universitas Gadjah Mada.
            Dalam era perkembangan teknologi dan industri, konsep Building
            Information Modelling (BIM) telah menjadi bagian dari industri
            konstruksi modern. BIM bukan hanya mencakup model 3D dari struktur
            bangunan, tetapi juga menghimpun aspek-aspek informasi yang lebih
            luas seperti data geometris, data spasial, data waktu, data biaya,
            dan data lingkungan. BIM telah menjadi pendorong utama dalam
            mengubah landasan industri konstruksi, membuka peluang dalam cara
            mendesain, membangun, dan mengelola proyek-proyek yang kompleks.
          </p>
          <p className="text-white text-justify my-4">
            Pada tahun ini, CRAFT akan membawakan tema : "Optimalkan Biaya dan
            Waktu Proyek dengan BIM 5D: Membangun Masa Depan Berkelanjutan di 8
            Dekade Indonesia Merdeka" Dengan tema ini, diharapkan CRAFT akan
            menjadi tempat yang menginspirasi mahasiswa, akademisi, dan praktisi
            dunia konstruksi untuk menggali potensi digitalisasi konstruksi
            melalui penerapan Building Information Modelling (BIM), khususnya
            bagaimana memanfaatkan segala tools yang ada untuk meningkatkan
            efisiensi, kualitas, dan keberlanjutan suatu proyek konstruksi.
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
        <div className="absolute flex flex-col px-[15%] top-[6%] md:top-[10%] 2xl:top-[15%] font-plusJakarta font-bold text-xs md:text-lg 2xl:text-xl text-chiasGreen-500 ">
          <p>● SBC </p>
          <p>
            Kompetisi ini terbuka bagi mahasiswa aktif jenjang D3/D4/S1 dari
            Perguruan Tinggi Negeri atau Swasta di Indonesia, dengan setiap tim
            minimal beranggotakan satu mahasiswa Program Studi Teknik Sipil
            dan/atau peserta lain berasal dari program studi yang berkaitan
            dengan perancangan jembatan
          </p>
          <p className="mt-1 md:mt-4">● CIC</p>
          <p>
            Lomba ini terbuka untuk mahasiswa dari berbagai program studi dengan
            syarat dalam satu tim wajib beranggotakan minimal satu mahasiswa
            teknik sipil.
          </p>
          <p className="mt-1 md:mt-4">● FCEC </p>
          <p>
            Setiap tim beranggotakan 2–3 peserta didik aktif SMA/SMK/MA dan/atau
            sederajat dan berasal dari sekolah yang sama.
          </p>
          <p className="mt-1 md:mt-4">● CRAFT </p>
          <p>
            1. Peserta setiap sub-event CIA 13th yang telah melakukan registrasi
            untuk online.
          </p>
          <p>
            2. Masyarakat umum yang memiliki ketertarikan terhadap perangkat
            lunak di bidang ketekniksipilan dengan rincian jumlah 70 orang untuk
            offline.
          </p>
          <Link
            href={`https://drive.google.com/drive/folders/1BIPbxrMwFPct-onz0vY670BoVGjQFChi`}
            className="w-full mt-3 md:mt-12 bg-craft-primary text-white py-2 px-16 rounded-2xl hover:opacity-50 text-center font-bold text-xs md:text-base"
          >
            Download ToR
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Utama;
