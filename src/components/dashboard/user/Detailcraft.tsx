"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/utlis/axiosInstance";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import JSZip from "jszip";
import { parse } from "json2csv";

interface Participant {
  participant_id: number;
  user_id: number | null;
  full_name: string;
  institution_name: string;
  activity_choice: string;
  whatsapp_number: string;
  isMahasiswaDTSL: boolean;
  ktm: string | null;
  payment_proof: string;
  isVerified: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
  bukti_follow_pktsl: string;
  bukti_follow_cia: string;
  bukti_story: string;
  bundling_member: string;
}

export default function DetailUser({ params }: { params: { id: string } }) {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL_FILE || "http://default-url.com/";

  const handleBack = () => {
    router.back();
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/crafts/user/${params.id}`);
      setParticipant(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Gagal mengambil data peserta. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAdmin = () => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie);
          setIsAdmin(userData.isAdmin === true || userData.isAdmin === "true");
        } catch (error) {
          console.error("Error parsing user cookie:", error);
          setIsAdmin(false);
        }
      }
    };
    checkAdmin();
    fetchData();
  }, [params.id]);

  const renderField = (value: string | null | undefined, isLink = false) => {
    const displayValue = value || "Not Found";
    if (isLink && value) {
      const isPng =
        value.toLowerCase().endsWith(".png") ||
        value.toLowerCase().endsWith(".jpg") ||
        value.toLowerCase().endsWith(".jpeg");
      if (isPng) {
        return (
          <div className="flex flex-col gap-2">
            <a
              href={`${baseUrl}${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-lg font-semibold text-opacity-80"
            >
              {displayValue}
            </a>
            <Image
              src={`${baseUrl}${value}`}
              alt={displayValue}
              width={200}
              height={200}
              className="rounded-lg object-cover"
              onError={(e) => {
                console.error("Error loading image:", value);
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        );
      }
      return (
        <a
          href={`${baseUrl}${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-lg font-semibold text-opacity-80"
        >
          {displayValue}
        </a>
      );
    }
    return (
      <p className="text-white text-opacity-80 text-lg font-semibold">
        {displayValue}
      </p>
    );
  };

  async function downloadFile(
    url: string
  ): Promise<{ url: string; data: ArrayBuffer | null }> {
    try {
      const fullUrl = `${baseUrl}${url}`;
      const response = await axiosInstance.get(fullUrl, {
        responseType: "arraybuffer",
      });
      return { url, data: response.data };
    } catch (error) {
      console.error(`Error downloading file from ${url}:`, error);
      return { url, data: null };
    }
  }

  async function downloadFilesAsZip() {
    setIsDownloading(true);
    const zip = new JSZip();
    if (!participant) {
      console.error("Participant data is null");
      setError("Data peserta tidak tersedia untuk diunduh.");
      setIsDownloading(false);
      return;
    }

    const participantName = participant.full_name || "UnknownParticipant";

    try {
      const participantData = {
        Nama_Lengkap: participant.full_name || "",
        Institusi: participant.institution_name || "",
        Pilihan_Kegiatan: participant.activity_choice || "",
        Nomor_Whatsapp: participant.whatsapp_number || "",
        Mahasiswa_DTSL: participant.isMahasiswaDTSL ? "Ya" : "Tidak",
        KTM: participant.ktm || "",
        Bukti_Pembayaran: participant.payment_proof || "",
        Email: participant.email || "",
        Status_Verifikasi: participant.isVerified
          ? "Terverifikasi"
          : "Belum Terverifikasi",
        Tanggal_Pendaftaran: participant.createdAt || "",
        Tanggal_Pembaruan: participant.updatedAt || "",
        Bukti_Follow_PKTSL: participant.bukti_follow_pktsl || "",
        Bukti_Follow_CIA: participant.bukti_follow_cia || "",
        Bukti_Story: participant.bukti_story || "",
        Bundling_Member: participant.bundling_member || "",
      };

      const combinedCsv = parse([participantData], {
        fields: Object.keys(participantData),
      });
      zip.file("participant_data.csv", combinedCsv);

      const filePromises: Promise<{
        url: string;
        data: ArrayBuffer | null;
        name: string;
      }>[] = [];
      const getFileExtension = (url: string) => {
        const parts = url.split(".");
        return parts.length > 1 ? `.${parts.pop()}` : "";
      };

      if (participant.ktm) {
        filePromises.push(
          downloadFile(participant.ktm).then((result) => ({
            ...result,
            name: `KTM_${participantName}${getFileExtension(
              participant.ktm || ""
            )}`,
          }))
        );
      }

      if (participant.payment_proof) {
        filePromises.push(
          downloadFile(participant.payment_proof).then((result) => ({
            ...result,
            name: `PaymentProof_${participantName}${getFileExtension(
              participant.payment_proof
            )}`,
          }))
        );
      }

      if (participant.bukti_follow_pktsl) {
        filePromises.push(
          downloadFile(participant.bukti_follow_pktsl).then((result) => ({
            ...result,
            name: `FollowPKTSL_${participantName}${getFileExtension(
              participant.bukti_follow_pktsl
            )}`,
          }))
        );
      }

      if (participant.bukti_follow_cia) {
        filePromises.push(
          downloadFile(participant.bukti_follow_cia).then((result) => ({
            ...result,
            name: `FollowCIA_${participantName}${getFileExtension(
              participant.bukti_follow_cia
            )}`,
          }))
        );
      }

      if (participant.bukti_story) {
        filePromises.push(
          downloadFile(participant.bukti_story).then((result) => ({
            ...result,
            name: `Story_${participantName}${getFileExtension(
              participant.bukti_story
            )}`,
          }))
        );
      }

      if (participant.bundling_member) {
        filePromises.push(
          downloadFile(participant.bundling_member).then((result) => ({
            ...result,
            name: `Bundling_${participantName}${getFileExtension(
              participant.bundling_member
            )}`,
          }))
        );
      }

      const fileResults = await Promise.all(filePromises);

      fileResults.forEach(({ name, data }) => {
        if (data) zip.file(name, data);
      });

      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 1 },
      });

      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${participantName}_data.zip`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during download:", error);
      setError("Gagal mengunduh file. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-black text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-fixed bg-cia-primary bg-[url('/assets/autentikasi/teksture.svg')] font-plusJakarta">
      <div className="bg-white/80 p-4 rounded-xl w-[90%] mx-auto mt-28 mb-8">
        <p className="text-black text-center text-2xl font-semibold px-6 z-20">
          Detail Peserta
        </p>

        {participant ? (
          [
            { label: "Email", value: participant.email },
            { label: "Nama Peserta", value: participant.full_name },
            { label: "Pilihan Kegiatan", value: participant.activity_choice },
            {
              label: "Apakah Mahasiswa DTSL FT UGM?",
              value: participant.isMahasiswaDTSL ? "Ya" : "Tidak",
            },
            { label: "Asal Instansi", value: participant.institution_name },
            { label: "Nomor Whatsapp", value: participant.whatsapp_number },
            {
              label: "Kartu Tanda Mahasiswa",
              value: participant.ktm,
              isLink: true,
            },
            {
              label: "Bukti Pembayaran",
              value: participant.payment_proof,
              isLink: true,
            },
            {
              label: "Bukti Follow Instagram PKTSL",
              value: participant.bukti_follow_pktsl,
              isLink: true,
            },
            {
              label: "Bukti Follow Instagram CIA",
              value: participant.bukti_follow_cia,
              isLink: true,
            },
            {
              label: "Bukti Story Instagram",
              value: participant.bukti_story,
              isLink: true,
            },
            {
              label: "Bukti Bundling Member",
              value: participant.bundling_member,
              isLink: true,
            },
          ].map((field, index) => (
            <div
              key={`participant-field-${index}`}
              className="flex flex-col w-full mt-4"
            >
              <p className="text-black text-left text-lg font-medium px-6">
                {field.label}
              </p>
              <div className="px-6 py-2 rounded-xl bg-cia-primary">
                {renderField(field.value, field.isLink)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-black text-lg">Data peserta tidak tersedia.</p>
        )}

        <div className="flex justify-end mt-10">
          {isAdmin && (
            <button
              onClick={downloadFilesAsZip}
              disabled={isDownloading}
              className={`bg-cic-secondary shadow-xl text-white px-6 py-2 rounded-2xl font-sans mr-4 flex items-center gap-2 ${
                isDownloading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isDownloading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sedang Mengunduh...
                </>
              ) : (
                "Unduh Semua Data"
              )}
            </button>
          )}
          <button
            onClick={handleBack}
            className="bg-cic-secondary shadow-xl text-white px-6 py-2 rounded-2xl font-sans"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
