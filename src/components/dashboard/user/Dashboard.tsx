"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, use } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/utlis/axiosInstance";

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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
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

  const deleteTeam = async (eventName: string, teamId: number) => {
    try {
      console.log(`Deleting team ${teamId} from event ${eventName}`);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const removeTeam = async (participantId: number) => {
    try {
      console.log(`Removing team with participant ID ${participantId}`);
      toast.success("Tim Berhasil Dihapus");
      fetchData();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div
      className={`bg-cia-primary bg-[url('/assets/autentikasi/teksture.svg')] h-[100vh] xl:px-24 font-plusJakarta`}
    >
      <div className="flex w-full h-full flex-col items-center justify-center bg-[url('/assets/dashboard/bg_dashboard-mobile.svg')] md:bg-[url('/assets/dashboard/bg_dashboard-tab.svg')] lg:bg-[url('/assets/dashboard/bg_dashboard.svg')] bg-contain bg-no-repeat bg-center px-8 lg:p-0 lg:px-[10%]">
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
                            onClick={() => {
                              if (
                                "event_name" in registration &&
                                "team_id" in registration
                              ) {
                                deleteTeam(
                                  registration.event_name,
                                  registration.team_id
                                );
                              }
                              if ("participant_id" in registration) {
                                if (registration.participant_id !== null) {
                                  removeTeam(registration.participant_id);
                                }
                              } else {
                                console.error(
                                  "Cannot delete team: registration is not a UserEvent"
                                );
                              }
                            }}
                          >
                            Edit
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
        <div className="">
          <div className="p-4 rounded-xl mt-4">
            <p className="text-sm md:text-[20px] text-white text-center">
              Untuk ToR SOAL CIC dapat diakses pada{" "}
              <a
                href="https://drive.google.com/drive/folders/1ao2GBpO-OVcbg8kuXG8GrSfoCxkdMf7l?usp=drive_link"
                className="font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link ini.
              </a>
            </p>
            <p className="text-xs md:text-[14px] text-white text-center">
              {" "}
              jika ada pertanyaan lebih lanjut kontak kami melalui instagram
              @civilinaction{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
