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
  const [participant, setParticipant] = useState<any[]>([]);
  const token = Cookies.get("token");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rejectMessage, setRejectMessage] = useState("");
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const router = useRouter();

  const handleRejectMessageChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setRejectMessage(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/teams/sbc/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchParticipant = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sbc-participant`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setParticipant(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchParticipant();
  }, []);

  async function downloadFile(url: string) {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      return response.data;
    } catch (error) {
      console.error(`Error downloading file from ${url}:`, error);
      return null;
    }
  }

  async function downloadFilesAsZip() {
    const zip = new JSZip();
    const data =
      (participant as any).participants?.map((p: any) => {
        const { dosbim, download, ...rest } = p;
        return rest;
      }) || [];

    const combinedCsv = parse(data, { fields: Object.keys(data[0] || {}) });
    zip.file("data_sbc.csv", combinedCsv);

    const downloadPath = (participant as any).participants || [];
    for (const p of downloadPath) {
      const { download } = p;
      const { ktm, active_student_letter, photo, payment_proof, voucher } =
        download;

      const files = [
        { data: await downloadFile(ktm), name: ktm?.split("/").pop() },
        {
          data: await downloadFile(active_student_letter),
          name: active_student_letter?.split("/").pop(),
        },
        { data: await downloadFile(photo), name: photo?.split("/").pop() },
        {
          data: await downloadFile(payment_proof),
          name: payment_proof?.split("/").pop(),
        },
        { data: await downloadFile(voucher), name: voucher?.split("/").pop() },
      ];

      files.forEach((file) => file.data && zip.file(file.name, file.data));
    }

    zip.generateAsync({ type: "blob" }).then((content: Blob) => {
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "files_sbc.zip";
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  const verifyTeam = async (teamId: string) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/teams/${teamId}/verify`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === "success") {
        toast.success("Tim Berhasil Diverifikasi");
        fetchData();
      } else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error verifying team:", error);
    }
  };

  const handleReject = async (team_id: number, rejectMessage: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/teams/${team_id}/reject`,
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
      toast.success("Tim berhasil ditolak");
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
            Dashboard Panitia SBC
          </p>

          <div className="max-h-[400px] lg:max-h-[350px] 2xl:max-h-[500px] overflow-y-auto mt-5">
            <table className="w-full text-[20px] table-auto border-separate border-spacing-y-2">
              <thead>
                <tr className="text-black text-left">
                  <th>Nama Peserta/Tim</th>
                  <th>Status</th>
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
                      {registration.team.team_name}
                    </td>
                    <td
                      className="font-semibold px-2 border-r border-ciaGreen border-opacity-10"
                      style={{
                        color: registration.team.isRejected
                          ? "red"
                          : registration.team.isVerified === 0
                          ? "black"
                          : "#166534",
                      }}
                    >
                      {registration.team.isRejected
                        ? "Tim telah ditolak"
                        : registration.team.isVerified === 0
                        ? "Perlu Konfirmasi"
                        : "Sudah Terkonfirmasi"}
                    </td>
                    <td className="px-[0.6rem] py-2 rounded-r-xl">
                      <div className="flex-col flex gap-2 md:flex-row">
                        <Link
                          href={`/admin/sbc/${registration.team.team_id}`}
                          className="bg-green-600/80 text-white text-[13px] lg:text-[16px] text-center rounded-md px-3 py-1 w-full"
                        >
                          Lihat Detail
                        </Link>
                        <button
                          className={`bg-green-600/80 text-white text-[13px] lg:text-[16px] rounded-md px-1 py-1 w-full ${
                            registration.team.isVerified ||
                            registration.team.isRejected
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => verifyTeam(registration.team.team_id)}
                          disabled={
                            registration.team.isVerified ||
                            registration.team.isRejected
                          }
                        >
                          Terima
                        </button>
                        <button
                          className={`bg-[#E25933] text-white text-[13px] lg:text-[16px] rounded-md px-1 py-1 w-full ${
                            registration.team.isVerified ||
                            registration.team.isRejected
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={
                            registration.team.isVerified ||
                            registration.team.isRejected
                          }
                          onClick={() => {
                            setCurrentTeamId(registration.team.team_id);
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
                        if (currentTeamId !== null) {
                          handleReject(currentTeamId, rejectMessage);
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
