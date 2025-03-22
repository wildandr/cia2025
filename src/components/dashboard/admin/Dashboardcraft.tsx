"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
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
  const token = Cookies.get("token");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rejectMessage, setRejectMessage] = useState("");
  const [participantId, setParticipantId] = useState("");
  const router = useRouter();

  const handleRejectMessageChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setRejectMessage(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/crafts/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function downloadFile(url: string) {
    const fullUrl = `${url}`;
    try {
      const response = await axios.get(fullUrl, {
        responseType: "arraybuffer",
      });
      return response.data;
    } catch (error) {
      console.error(`Error downloading file from ${fullUrl}:`, error);
      return null;
    }
  }

  async function downloadFilesAsZip() {
    const zip = new JSZip();
    const combinedCsv = parse(registrations, {
      fields: Object.keys(registrations[0]),
    });
    zip.file("data_craft.csv", combinedCsv);

    for (const participant of registrations) {
      const { ktm, payment_proof } = participant;
      const ktmData = await downloadFile(ktm);
      const paymentProofData = await downloadFile(payment_proof);

      const ktmFileName = ktm ? ktm.split("/").pop() : null;
      const paymentProofFileName = payment_proof
        ? payment_proof.split("/").pop()
        : null;

      zip.file(ktmFileName, ktmData);
      zip.file(paymentProofFileName, paymentProofData);
    }

    zip.generateAsync({ type: "blob" }).then(function (content: Blob) {
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "files_craft.zip";
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  const verifyTeam = async (participant_id: string) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/crafts/verify/${participant_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Participant has been verified") {
        toast.success("Peserta Berhasil Diverifikasi");
        fetchData();
      } else {
        toast.error("Gagal Memverifikasi");
      }
    } catch (error) {
      console.error("Error verifying team", error);
    }
  };

  const handleReject = async (
    participant_id: string,
    rejectMessage: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/crafts/reject/${participant_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rejectMessage }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      toast.success("Peserta berhasil ditolak");
      fetchData();
    } catch (error) {
      console.error("Error:", error);
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
                          href={`/admin/craft/${registration.user_id}`}
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
              className="bg-[#18AB8E] shadow-xl text-white px-6 py-2 rounded-2xl font-sans"
            >
              Unduh Semua Data
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
