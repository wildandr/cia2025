"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/utils/axiosInstance"; // Ganti axios dengan axiosInstance
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import JSZip from "jszip";
import { parse } from "json2csv";

export default function DashboardAdmin() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isDownloading, setIsDownloading] = useState(false); // Tambah state untuk loading download
  const token = Cookies.get("token");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rejectMessage, setRejectMessage] = useState("");
  const [participantId, setParticipantId] = useState<string | null>(null);
  const router = useRouter();

  const handleRejectMessageChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setRejectMessage(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/crafts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function downloadFile(
    url: string
  ): Promise<{ url: string; data: ArrayBuffer | null }> {
    try {
      const response = await axiosInstance.get(url, {
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

    try {
      // Persiapan data CSV secara sinkron
      const combinedCsv = parse(registrations, {
        fields: Object.keys(registrations[0]),
      });
      zip.file("data_craft.csv", combinedCsv);

      // Kumpulkan semua URL file untuk diunduh secara paralel
      const filePromises: Promise<{
        url: string;
        data: ArrayBuffer | null;
        name: string;
      }>[] = [];
      const getFileName = (url: string) => url?.split("/").pop() || "unknown";

      registrations.forEach((participant) => {
        const { ktm, payment_proof } = participant;
        if (ktm) {
          filePromises.push(
            downloadFile(ktm).then((result) => ({
              ...result,
              name: getFileName(ktm),
            }))
          );
        }
        if (payment_proof) {
          filePromises.push(
            downloadFile(payment_proof).then((result) => ({
              ...result,
              name: getFileName(payment_proof),
            }))
          );
        }
      });

      // Unduh semua file secara paralel
      const fileResults = await Promise.all(filePromises);

      // Tambahkan file ke ZIP
      fileResults.forEach(({ name, data }) => {
        if (data) zip.file(name, data);
      });

      // Generate ZIP dengan kompresi cepat
      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 1 },
      });

      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "files_craft.zip";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during ZIP generation:", error);
      toast.error("Gagal mengunduh data. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  }

  const verifyTeam = async (participant_id: string) => {
    try {
      const response = await axiosInstance.put(
        `/crafts/verify/${participant_id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message === "Participant has been verified") {
        toast.success("Peserta Berhasil Diverifikasi");
        fetchData();
      } else {
        toast.error("Gagal Memverifikasi");
      }
    } catch (error) {
      console.error("Error verifying participant:", error);
      toast.error("Terjadi kesalahan saat memverifikasi peserta.");
    }
  };

  const handleReject = async (
    participant_id: string,
    rejectMessage: string
  ) => {
    try {
      const response = await axiosInstance.put(
        `/crafts/reject/${participant_id}`,
        { rejectMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Peserta berhasil ditolak");
        fetchData();
      } else {
        throw new Error("Gagal menolak peserta");
      }
    } catch (error) {
      console.error("Error rejecting participant:", error);
      toast.error("Gagal menolak peserta. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-cia-primary bg-[url('/assets/autentikasi/teksture.svg')] min-h-screen bg-fixed font-plusJakarta">
      <div className="flex w-full min-h-screen z-40">
        <div className="bg-white p-4 rounded-xl h-full w-[90%] mx-auto mt-28">
          <p className="text-green-600/80 text-center text-2xl font-semibold px-6 z-20">
            Dashboard Panitia Craft
          </p>

          <div className="max-h-[400px] lg:max-h-[350px] 2xl:max-h-[500px] overflow-y-auto mt-5">
            <table className="w-full text-[20px] table-auto border-separate border-spacing-y-2">
              <thead>
                <tr className="text-black text-left">
                  <th>Nama Peserta/Tim</th>
                  <th>Status</th>
                  <th>Event</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-black rounded-xl">
                {registrations.map((registration, index) => (
                  <tr
                    className={`text-left ${
                      index % 2 === 0 ? "bg-[#B5E5DB]" : "bg-[#E4E4E4]"
                    }`}
                    key={index}
                  >
                    <td className="font-semibold px-2 py-2 border-r border-ciaGreen border-opacity-10 rounded-l-xl">
                      {registration.full_name}
                    </td>
                    <td
                      className="font-semibold px-2 border-r border-ciaGreen border-opacity-10"
                      style={{
                        color: registration.isRejected
                          ? "red"
                          : !registration.isVerified
                          ? "black"
                          : "#166534",
                      }}
                    >
                      {registration.isRejected
                        ? "Pendaftaran Ditolak"
                        : !registration.isVerified
                        ? "Perlu Konfirmasi"
                        : "Sudah Terkonfirmasi"}
                    </td>
                    <td className="px-2">{registration.activity_choice}</td>
                    <td className="px-[0.6rem] py-2 rounded-r-xl">
                      <div className="flex-col flex gap-2 md:flex-row">
                        <Link
                          href={`/admin/craft/${registration.participant_id}`}
                          className="bg-green-600/80 text-white text-[13px] lg:text-[16px] text-center rounded-md px-3 py-1 w-full"
                        >
                          Lihat Detail
                        </Link>
                        <button
                          className={`bg-green-600/80 text-white text-[13px] lg:text-[16px] rounded-md px-1 py-1 w-full ${
                            registration.isVerified || registration.isRejected
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            verifyTeam(registration.participant_id)
                          }
                          disabled={
                            registration.isVerified || registration.isRejected
                          }
                        >
                          Terima
                        </button>
                        <button
                          className={`bg-[#E25933] text-white text-[13px] lg:text-[16px] rounded-md px-1 py-1 w-full ${
                            registration.isVerified || registration.isRejected
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={
                            registration.isVerified || registration.isRejected
                          }
                          onClick={() => {
                            setParticipantId(registration.participant_id);
                            onOpen();
                          }}
                        >
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-10">
            <button
              onClick={downloadFilesAsZip}
              disabled={isDownloading}
              className={`bg-[#18AB8E] shadow-xl text-white px-6 py-2 rounded-2xl font-sans flex items-center gap-2 ${
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
          </div>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            className="bg-gray-50 z-[1000] absolute"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-gray-900">
                    Konfirmasi Penolakan
                  </ModalHeader>
                  <ModalBody>
                    <Textarea
                      label="Penolakan"
                      placeholder="Masukkan alasan penolakan"
                      value={rejectMessage}
                      onChange={handleRejectMessageChange}
                      className="text-gray-800"
                      variant="bordered"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={onClose}
                      className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      Batal
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => {
                        if (participantId) {
                          handleReject(participantId, rejectMessage);
                          onClose();
                        }
                      }}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Kirim
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
