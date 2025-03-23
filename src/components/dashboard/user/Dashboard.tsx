"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axiosInstance, { isAxiosError } from "@/lib/utlis/axiosInstance";

interface UserEvent {
  user_id: number | null;
  email: string | null;
  username: string;
  password: string;
  createdAt: string | null;
  updatedAt: string | null;
  isAdmin: number;
  eventId: number | null;
  team_id: number;
  event_id: number;
  team_name: string;
  institution_name: string | null;
  payment_proof: string | null;
  voucher: string | null;
  isVerified: number;
  bridge_name: string | null;
  originality_statement: string | null;
  abstract_title: string | null;
  abstract_file: string | null;
  abstract_video_link: string | null;
  participant_id: number | null;
  full_name: string | null;
  activity_choice: string | null;
  whatsapp_number: string | null;
  isMahasiswaDTSL: boolean | null;
  ktm: string | null;
  event_name: string;
}

interface Craft {
  participant_id: number | null;
  user_id: number | null;
  full_name: string | null;
  isVerified: boolean | null;
  isRejected: boolean | null;
}

export default function Dashboard() {
  const router = useRouter();
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
  const token = Cookies.get("token");

  const [eventsData, setEventsData] = useState<UserEvent[]>([]);
  const [craftData, setCraftData] = useState<Craft | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<
    UserEvent | Craft | null
  >(null);
  const [confirmationInput, setConfirmationInput] = useState("");
  const combinedData = [...eventsData, craftData].filter(Boolean);
  const fetchData = async () => {
    try {
      const eventsResponse = await axiosInstance.get(
        `/user/${user?.user_id}/events`
      );

      if (eventsResponse.data.status === "success") {
        setEventsData(eventsResponse.data.data || []);
      } else {
        console.error(
          "Error fetching events data:",
          eventsResponse.data.message
        );
      }

      try {
        const craftResponse = await axiosInstance.get(
          `/user/${user?.user_id}/craft`
        );

        if (craftResponse.data.success) {
          setCraftData(craftResponse.data.data || null);
        }
      } catch (craftError) {
        console.log("No craft data found or not implemented yet");
        setCraftData(null);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as any;
        if (axiosError.response?.status === 401) {
          toast.error("Sesi anda telah berakhir, silakan login kembali");
          Cookies.remove("token");
          Cookies.remove("user_Id");
          router.push("/login");
        } else {
          toast.error(
            "Gagal memuat data: " +
              (axiosError.response?.data as any)?.message || "Terjadi kesalahan"
          );
        }
      } else {
        toast.error("Terjadi kesalahan saat memuat data");
      }
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = (registration: UserEvent | Craft) => {
    setSelectedRegistration(registration);
    setShowModal(true);
    setConfirmationInput("");
  };

  const handleConfirmDelete = async () => {
    if (!selectedRegistration) return;

    const expectedName =
      "event_name" in selectedRegistration
        ? selectedRegistration.team_name
        : selectedRegistration.full_name;

    if (confirmationInput !== expectedName) {
      toast.error("Nama yang dimasukkan tidak sesuai!");
      return;
    }

    try {
      let response;
      if ("event_id" in selectedRegistration && selectedRegistration.team_id) {
        const eventMap: { [key: number]: string } = {
          1: "fcec",
          3: "sbc",
          4: "cic",
        };
        const eventName = eventMap[selectedRegistration.event_id];
        if (!eventName) {
          throw new Error("Event ID tidak valid");
        }
        response = await axiosInstance.delete(
          `/teams/${eventName}/delete/${selectedRegistration.team_id}`
        );
        if (response.data.status === "success") {
          toast.success(
            `Tim ${selectedRegistration.team_name} berhasil dihapus`
          );
        }
      } else if (
        "participant_id" in selectedRegistration &&
        selectedRegistration.participant_id
      ) {
        response = await axiosInstance.delete(
          `/crafts/delete/${selectedRegistration.participant_id}`
        );
        if (response.data.success) {
          toast.success(
            `Peserta CRAFT ${selectedRegistration.full_name} berhasil dihapus`
          );
        }
      }
      await fetchData();
      setShowModal(false);
      setSelectedRegistration(null);
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as any;
        toast.error(
          `Gagal menghapus: ${
            axiosError.response?.data?.message || "Terjadi kesalahan"
          }`
        );
      } else {
        toast.error("Terjadi kesalahan saat menghapus data");
      }
      console.error("Error deleting registration:", error);
    }
  };

  return (
    <div
      className={`bg-cia-primary bg-[url('/assets/autentikasi/teksture.svg')] h-[100vh] xl:px-24 font-plusJakarta`}
    >
      <div className="flex w-full h-full flex-col items-center justify-center bg-[url('/assets/dashboard/bg_dashboard-mobile.svg')] sm:bg-[url('/assets/dashboard/bg_dashboard-tab.svg')] lg:bg-[url('/assets/dashboard/bg_dashboard.svg')] bg-contain bg-no-repeat bg-center px-8 lg:p-0 lg:px-[10%]">
        <div className="flex items-center justify-center w-full z-20 mb-4">
          <Image
            src="/assets/dashboard/icon2Mobile.png"
            alt="iconlogo"
            width={1000}
            height={1000}
            className="w-auto h-[3.5rem] sm:h-[10%] md:hidden"
          />
          <Image
            src="/assets/dashboard/icon2.png"
            alt="iconlogo"
            width={1000}
            height={1000}
            className="w-[10%] 2xl:w-[14%] h-auto hidden md:flex"
          />
          <Image
            src="/assets/home/title.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="w-[70%] lg:w-[50%] 2xl:w-[60%] "
          />
          <Image
            src="/assets/dashboard/icon1Mobile.png"
            alt="iconlogo"
            width={1000}
            height={1000}
            className="w-auto  h-[3.5rem] sm:h-[10%] md:hidden"
          />
          <Image
            src="/assets/dashboard/icon1.png"
            alt="iconlogo"
            width={1000}
            height={1000}
            className="w-[10%] 2xl:w-[14%] h-auto hidden md:flex"
          />
        </div>
        <p className="text-white/80 text-center font-medium text-[14px] md:text-[16px] lg:text-[18px] px-6 z-20 ">
          Terimakasih telah melakukan pendaftaran, status pendaftaran anda dapat
          dilihat dibawah ini
        </p>
        <div className="z-20 h-full w-full max-h-[40%] md:max-h-[30%] lg:max-h-[40%] overflow-scroll lg:overflow-auto lg:overflow-y-scroll mt-4">
          <table className="w-full text-xs md:text-[16px] lg:text-[20px]">
            <thead className="">
              <tr className="text-white text-left">
                <th className="">Nama</th>
                <th>Event</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              <tr>
                <th className="min-[600px]:hidden"></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-black rounded-xl">
              {combinedData.map((registration, index) => {
                if (registration) {
                  return (
                    <tr key={index} className={`text-left bg-white/20`}>
                      <td
                        className={`font-semibold bg-white/20 max-w-full truncate px-2 py-5 border-r border-cia-dark border-opacity-20 ${
                          index === 0
                            ? "rounded-tl-xl"
                            : index === combinedData.length - 1
                            ? "rounded-bl-xl"
                            : ""
                        } ${combinedData.length === 1 ? "rounded-l-xl" : ""}`}
                      >
                        {"event_name" in registration
                          ? registration.team_name
                          : registration.full_name}
                      </td>
                      <td className="bg-white/20 font-semibold px-2 border-r border-cia-dark border-opacity-10 ">
                        {"event_name" in registration && registration.event_name
                          ? registration.event_name
                          : "CRAFT"}
                      </td>
                      <td
                        className="bg-white/20 font-semibold px-2 border-none"
                        style={{
                          color:
                            ("teams_isRejected" in registration &&
                              registration.teams_isRejected) ||
                            ("isRejected" in registration &&
                              registration.isRejected)
                              ? "red"
                              : ("teams_isVerified" in registration &&
                                  registration.teams_isVerified === 1) ||
                                ("isVerified" in registration &&
                                  registration.isVerified)
                              ? "#166534"
                              : "red",
                        }}
                      >
                        {("teams_isRejected" in registration &&
                          registration.teams_isRejected) ||
                        ("isRejected" in registration &&
                          registration.isRejected)
                          ? "Pendaftaran Ditolak"
                          : ("teams_isVerified" in registration &&
                              registration.teams_isVerified === 1) ||
                            ("isVerified" in registration &&
                              registration.isVerified)
                          ? "Berhasil Verifikasi"
                          : "Pendaftaran Belum Berhasil"}
                      </td>
                      <td
                        className={`bg-white/20  px-[0.6rem] py-2 ${
                          index === 0
                            ? "rounded-tr-xl"
                            : index === combinedData.length - 1
                            ? "rounded-br-xl"
                            : ""
                        } ${combinedData.length === 1 ? "rounded-r-xl" : ""}`}
                      >
                        <div className="flex-col flex gap-2 md:flex-row">
                          {"event_id" in registration &&
                          "team_id" in registration ? (
                            <Link
                              href={`/dashboard/${registration.event_id}&${registration.team_id}`}
                              className="bg-fcec-secondary text-white text-[13px] lg:text-[16px] text-center rounded-md px-3 py-1 w-full"
                            >
                              Lihat
                            </Link>
                          ) : null}
                          <button
                            className="bg-[#E25933] text-white text-[13px] lg:text-[16px] rounded-md px-1 py-1 w-full"
                            onClick={() => handleDeleteClick(registration)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        {/* Modal for confirmation */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md text-black">
              <h2 className="text-lg font-bold mb-4">Konfirmasi Penghapusan</h2>
              <p className="mb-4">
                Masukkan{" "}
                <span className="font-semibold">
                  {selectedRegistration && "event_name" in selectedRegistration
                    ? selectedRegistration.team_name
                    : selectedRegistration?.full_name}
                </span>{" "}
                untuk mengkonfirmasi penghapusan:
              </p>
              <input
                type="text"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                placeholder="Ketik nama tim/peserta"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button
                  className="bg-[#E25933] text-white px-4 py-2 rounded"
                  onClick={handleConfirmDelete}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="">
          <div className="rounded-xl mt-4">
            <p className="text-sm md:text-[20px] text-white text-center">
              Untuk ToR dapat diakses pada{" "}
              <a
                href="https://drive.google.com/drive/folders/1BIPbxrMwFPct-onz0vY670BoVGjQFChi"
                className="font-bold underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link berikut ini.
              </a>
            </p>
            <p className="text-xs md:text-[14px] text-white text-center mt-1">
              {" "}
              jika ada pertanyaan lebih lanjut kontak kami melalui instagram{" "}
              <Link
                href={
                  "https://www.instagram.com/civilinaction?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                }
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @civilinaction
              </Link>{" "}
              atau{" "}
              <Link href="/#contact" className="underline">
                Contact person
              </Link>{" "}
              event terkait
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
