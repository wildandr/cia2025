"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/utils/axiosInstance";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import JSZip from "jszip";
import { parse } from "json2csv";

interface Team {
  team_id: number;
  event_id: number;
  team_name: string;
  institution_name: string;
  payment_proof: string;
  voucher: string | null;
  user_id: number;
  email: string | null;
  isVerified: number;
}

interface Leader {
  member_id: number;
  team_id: number;
  full_name: string;
  department: string;
  batch: null | string;
  phone_number: string;
  line_id: string;
  email: string;
  ktm: string;
  active_student_letter: string;
  photo: string;
  twibbon_and_poster_link: string;
  is_leader: number;
  nim: null | string;
  semester: null | string;
}

interface Member {
  member_id: number;
  team_id: number;
  full_name: string;
  department: string | null;
  batch: string | null;
  phone_number: string;
  line_id: string;
  email: string;
  ktm: string;
  active_student_letter: string;
  photo: string;
  twibbon_and_poster_link: string;
  is_leader: number;
  nim: string;
  semester: string | null;
}

interface Advisor {
  advisor_id: number;
  team_id: number;
  full_name: string;
  nip: string;
  email: string;
  phone_number: string;
  photo: string;
}

interface Sbc {
  team_id: number;
  bridge_name: string;
}

interface SbcData {
  team: Team[];
  leader: Leader;
  members: Member[];
  dosbim: Advisor[];
  sbc: Sbc[];
}

export default function DetailUser({ params }: { params: { id: string } }) {
  const [teamData, setTeamData] = useState<SbcData>({
    team: [],
    leader: {} as Leader,
    members: [],
    dosbim: [],
    sbc: [],
  });
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
      const response = await axiosInstance.get(`/teams/sbc/${params.id}`);
      setTeamData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Gagal mengambil data tim. Silakan coba lagi nanti.");
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

  const renderMemberSection = (
    member: Leader | Member,
    title: string,
    index?: number
  ) => (
    <div
      key={`member-section-${member.member_id || index}`}
      className="mt-4 flex flex-col gap-2"
    >
      <p className="text-black text-lg font-semibold">{title}</p>
      {[
        { label: "Nama Lengkap", value: member.full_name },
        { label: "NIM", value: member.nim },
        { label: "Semester", value: member.batch },
        { label: "Email", value: member.email },
        { label: "Nomor Whatsapp", value: member.phone_number },
        { label: "ID Line", value: member.line_id },
        {
          label: "Link Bukti Upload Twibbon",
          value: member.twibbon_and_poster_link,
          isLink: true,
        },
        {
          label: "Surat Keterangan Mahasiswa Aktif",
          value: member.active_student_letter,
          isLink: true,
        },
        { label: "Kartu Tanda Mahasiswa", value: member.ktm, isLink: true },
        { label: "Pas Foto 3x4", value: member.photo, isLink: true },
      ].map((field, idx) => (
        <div
          key={`member-${member.member_id || index}-field-${idx}`}
          className="flex flex-col w-full"
        >
          <p className="text-black text-left text-lg font-medium px-6">
            {field.label}
          </p>
          <div className="px-6 py-2 rounded-xl bg-cia-primary">
            {renderField(field.value, field.isLink)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderAdvisorSection = (
    advisor: Advisor,
    title: string,
    index?: number
  ) => (
    <div
      key={`advisor-section-${advisor.advisor_id || index}`}
      className="mt-4 flex flex-col gap-2"
    >
      <p className="text-black text-lg font-semibold">{title}</p>
      {[
        { label: "Nama Lengkap", value: advisor.full_name },
        { label: "NIP", value: advisor.nip },
        { label: "Email", value: advisor.email },
        { label: "Nomor Whatsapp", value: advisor.phone_number },
        { label: "Pas Foto 3x4", value: advisor.photo, isLink: true },
      ].map((field, idx) => (
        <div
          key={`advisor-${advisor.advisor_id || index}-field-${idx}`}
          className="flex flex-col w-full"
        >
          <p className="text-black text-left text-lg font-medium px-6">
            {field.label}
          </p>
          <div className="px-6 py-2 rounded-xl bg-cia-primary">
            {renderField(field.value, field.isLink)}
          </div>
        </div>
      ))}
    </div>
  );

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
    const teamName = teamData.team[0]?.team_name || "UnknownTeam";

    try {
      const membersData = teamData.members.map((member) => ({
        Nama_Lengkap: member.full_name || "",
        Departemen: member.department || "",
        Batch: member.batch || "",
        Nomor_Whatsapp: member.phone_number || "",
        ID_Line: member.line_id || "",
        Email: member.email || "",
        KTM: member.ktm || "",
        Nim: member.nim || "",
        Semester: member.semester || "",
        Surat_Keterangan_Siswa_Aktif: member.active_student_letter || "",
        Pas_Foto_3x4: member.photo || "",
        Link_Bukti_Upload_Twibbon: member.twibbon_and_poster_link || "",
      }));

      const advisorData = teamData.dosbim.map((advisor) => ({
        Nama_Lengkap: advisor.full_name || "",
        NIP: advisor.nip || "",
        Email: advisor.email || "",
        Nomor_Whatsapp: advisor.phone_number || "",
        Pas_Foto_3x4: advisor.photo || "",
      }));

      const fieldsData = {
        Nama_Tim: teamName,
        Institusi: teamData.team[0]?.institution_name || "",
        Nama_Jembatan: teamData.sbc[0]?.bridge_name || "",
        Nama_Lengkap: teamData.leader?.full_name || "",
        Departemen: teamData.leader?.department || "",
        Batch: teamData.leader?.batch || "",
        Nomor_Whatsapp: teamData.leader?.phone_number || "",
        ID_Line: teamData.leader?.line_id || "",
        Email: teamData.leader?.email || "",
        KTM: teamData.leader?.ktm || "",
        Surat_Keterangan_Siswa_Aktif:
          teamData.leader?.active_student_letter || "",
        Pas_Foto_3x4: teamData.leader?.photo || "",
        Link_Bukti_Upload_Twibbon:
          teamData.leader?.twibbon_and_poster_link || "",
        Payment_Proof: teamData.team[0]?.payment_proof || "",
        Voucher: teamData.team[0]?.voucher || "",
      };

      const allData = [fieldsData, ...membersData, ...advisorData];
      const combinedCsv = parse(allData, { fields: Object.keys(fieldsData) });
      zip.file("data_all.csv", combinedCsv);

      const filePromises: Promise<{
        url: string;
        data: ArrayBuffer | null;
        name: string;
      }>[] = [];
      const getFileExtension = (url: string) => {
        const parts = url.split(".");
        return parts.length > 1 ? `.${parts.pop()}` : "";
      };

      if (
        teamData.leader?.ktm &&
        teamData.leader?.active_student_letter &&
        teamData.leader?.photo
      ) {
        const leaderName = teamData.leader.full_name || "UnknownLeader";
        filePromises.push(
          downloadFile(teamData.leader.ktm).then((result) => ({
            ...result,
            name: `KTM_${teamName}_${leaderName}${getFileExtension(
              teamData.leader.ktm
            )}`,
          }))
        );
        filePromises.push(
          downloadFile(teamData.leader.active_student_letter).then(
            (result) => ({
              ...result,
              name: `SKMA_${teamName}_${leaderName}${getFileExtension(
                teamData.leader.active_student_letter
              )}`,
            })
          )
        );
        filePromises.push(
          downloadFile(teamData.leader.photo).then((result) => ({
            ...result,
            name: `Photo_${teamName}_${leaderName}${getFileExtension(
              teamData.leader.photo
            )}`,
          }))
        );
      }

      teamData.members.forEach((member) => {
        if (member.ktm && member.active_student_letter && member.photo) {
          const memberName =
            member.full_name || `UnknownMember_${member.member_id}`;
          filePromises.push(
            downloadFile(member.ktm).then((result) => ({
              ...result,
              name: `KTM_${teamName}_${memberName}${getFileExtension(
                member.ktm
              )}`,
            }))
          );
          filePromises.push(
            downloadFile(member.active_student_letter).then((result) => ({
              ...result,
              name: `SKMA_${teamName}_${memberName}${getFileExtension(
                member.active_student_letter
              )}`,
            }))
          );
          filePromises.push(
            downloadFile(member.photo).then((result) => ({
              ...result,
              name: `Photo_${teamName}_${memberName}${getFileExtension(
                member.photo
              )}`,
            }))
          );
        }
      });

      teamData.dosbim.forEach((advisor) => {
        if (advisor.photo) {
          const advisorName =
            advisor.full_name || `UnknownAdvisor_${advisor.advisor_id}`;
          filePromises.push(
            downloadFile(advisor.photo).then((result) => ({
              ...result,
              name: `Photo_${teamName}_${advisorName}${getFileExtension(
                advisor.photo
              )}`,
            }))
          );
        }
      });

      if (teamData.team[0]?.payment_proof) {
        filePromises.push(
          downloadFile(teamData.team[0].payment_proof).then((result) => ({
            ...result,
            name: `PaymentProof_${teamName}${getFileExtension(
              teamData.team[0].payment_proof
            )}`,
          }))
        );
      }

      if (teamData.team[0]?.voucher) {
        filePromises.push(
          downloadFile(teamData.team[0].voucher).then((result) => ({
            ...result,
            name: `Voucher_${teamName}${getFileExtension(
              teamData.team[0].voucher || ""
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
      link.download = `${teamName}_data.zip`;
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
          Detail Tim SBC
        </p>

        {teamData.team[0] ? (
          [
            { label: "Email", value: teamData.team[0].email },
            { label: "Nama Tim", value: teamData.team[0].team_name },
            {
              label: "Nama Perguruan Tinggi",
              value: teamData.team[0].institution_name,
            },
            { label: "Nama Jembatan", value: teamData.sbc[0]?.bridge_name },
            {
              label: "Bukti Pembayaran",
              value: teamData.team[0].payment_proof,
              isLink: true,
            },
            {
              label: "Bukti Voucher",
              value: teamData.team[0].voucher,
              isLink: true,
            },
          ].map((field, index) => (
            <div
              key={`team-field-${index}`}
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
          <p className="text-black text-lg">Data tim tidak tersedia.</p>
        )}

        {teamData.leader?.member_id &&
          renderMemberSection(teamData.leader, "Ketua")}

        {teamData.members.length > 0 &&
          teamData.members.map((member, index) =>
            renderMemberSection(member, `Anggota ${index + 1}`, index)
          )}

        {teamData.dosbim.length > 0 &&
          teamData.dosbim.map((advisor, index) =>
            renderAdvisorSection(
              advisor,
              `Dosen Pembimbing ${index + 1}`,
              index
            )
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
