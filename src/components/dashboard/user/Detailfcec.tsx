"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/utlis/axiosInstance";
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
  nim: string | null;
  semester: string | null;
}

interface Leader {
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
  nim: string | null;
  semester: string | null;
}

interface Fcec {
  team_id: number;
  originality_statement: string;
  abstract_title: string;
  abstract_file: string;
  abstract_video_link: string;
}

interface TeamData {
  team: Team[];
  leader: Leader;
  members: Member[];
  fcec: Fcec[];
}

export default function DetailUser({ params }: { params: { id: string } }) {
  const [teamData, setTeamData] = useState<TeamData>({
    team: [],
    leader: {} as Leader,
    members: [],
    fcec: [],
  });
  const [isLoading, setIsLoading] = useState(true);
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
      const response = await axiosInstance.get(`/teams/fcec/${params.id}`);
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
      const adminCookie = Cookies.get("isAdmin");
      setIsAdmin(adminCookie === "true");
    };
    checkAdmin();
    fetchData();
  }, [params.id]);

  const renderField = (value: string | null | undefined, isLink = false) => {
    const displayValue = value || "Not Found";
    if (isLink && value) {
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

  async function downloadFile(url: string) {
    try {
      const fullUrl = `${baseUrl}${url}`;
      const response = await axiosInstance.get(fullUrl, {
        responseType: "arraybuffer",
      });
      return response.data;
    } catch (error) {
      console.error(`Error downloading file from ${url}:`, error);
      return null;
    }
  }

  async function downloadFilesAsZip() {
    const zip = new JSZip();
    const teamName = teamData.team[0]?.team_name || "UnknownTeam";

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

    const fieldsData = {
      Nama_Tim: teamName,
      Institusi: teamData.team[0]?.institution_name || "",
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
      Link_Bukti_Upload_Twibbon: teamData.leader?.twibbon_and_poster_link || "",
      Payment_Proof: teamData.team[0]?.payment_proof || "",
      Voucher: teamData.team[0]?.voucher || "",
      Originality_Statement: teamData.fcec[0]?.originality_statement || "",
      Abstract_Title: teamData.fcec[0]?.abstract_title || "",
      Abstract_File: teamData.fcec[0]?.abstract_file || "",
      Abstract_Video_Link: teamData.fcec[0]?.abstract_video_link || "",
    };

    const allData = [fieldsData, ...membersData];
    const combinedCsv = parse(allData, { fields: Object.keys(fieldsData) });
    zip.file("data_all.csv", combinedCsv);

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
      const ktmData = await downloadFile(teamData.leader.ktm);
      const activeStudentLetterData = await downloadFile(
        teamData.leader.active_student_letter
      );
      const photoData = await downloadFile(teamData.leader.photo);

      if (ktmData)
        zip.file(
          `KTM_${teamName}_${leaderName}${getFileExtension(
            teamData.leader.ktm
          )}`,
          ktmData
        );
      if (activeStudentLetterData)
        zip.file(
          `SKMA_${teamName}_${leaderName}${getFileExtension(
            teamData.leader.active_student_letter
          )}`,
          activeStudentLetterData
        );
      if (photoData)
        zip.file(
          `Photo_${teamName}_${leaderName}${getFileExtension(
            teamData.leader.photo
          )}`,
          photoData
        );
    }

    for (const member of teamData.members) {
      if (member.ktm && member.active_student_letter && member.photo) {
        const memberName =
          member.full_name || `UnknownMember_${member.member_id}`;
        const ktmData = await downloadFile(member.ktm);
        const activeStudentLetterData = await downloadFile(
          member.active_student_letter
        );
        const photoData = await downloadFile(member.photo);

        if (ktmData)
          zip.file(
            `KTM_${teamName}_${memberName}${getFileExtension(member.ktm)}`,
            ktmData
          );
        if (activeStudentLetterData)
          zip.file(
            `SKMA_${teamName}_${memberName}${getFileExtension(
              member.active_student_letter
            )}`,
            activeStudentLetterData
          );
        if (photoData)
          zip.file(
            `Photo_${teamName}_${memberName}${getFileExtension(member.photo)}`,
            photoData
          );
      }
    }

    if (teamData.fcec[0]?.abstract_file) {
      const abstractData = await downloadFile(teamData.fcec[0].abstract_file);
      if (abstractData)
        zip.file(
          `Abstract_${teamName}${getFileExtension(
            teamData.fcec[0].abstract_file
          )}`,
          abstractData
        );
    }

    if (teamData.fcec[0]?.originality_statement) {
      const originalityData = await downloadFile(
        teamData.fcec[0].originality_statement
      );
      if (originalityData)
        zip.file(
          `Originality_${teamName}${getFileExtension(
            teamData.fcec[0].originality_statement
          )}`,
          originalityData
        );
    }

    if (teamData.team[0]?.payment_proof) {
      const paymentProofData = await downloadFile(
        teamData.team[0].payment_proof
      );
      if (paymentProofData)
        zip.file(
          `PaymentProof_${teamName}${getFileExtension(
            teamData.team[0].payment_proof
          )}`,
          paymentProofData
        );
    }

    if (teamData.team[0]?.voucher) {
      const voucherData = await downloadFile(teamData.team[0].voucher);
      if (voucherData)
        zip.file(
          `Voucher_${teamName}${getFileExtension(teamData.team[0].voucher)}`,
          voucherData
        );
    }

    zip.generateAsync({ type: "blob" }).then((content: Blob) => {
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${teamName}_data.zip`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
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
          Detail Tim FCEC
        </p>

        {teamData.team[0] ? (
          [
            { label: "Email", value: teamData.team[0].email },
            { label: "Nama Tim", value: teamData.team[0].team_name },
            {
              label: "Nama Perguruan Tinggi",
              value: teamData.team[0].institution_name,
            },
            { label: "Judul Abstrak", value: teamData.fcec[0]?.abstract_title },
            {
              label: "File Abstrak",
              value: teamData.fcec[0]?.abstract_file,
              isLink: true,
            },
            {
              label: "Link Video Abstrak",
              value: teamData.fcec[0]?.abstract_video_link,
              isLink: true,
            },
            {
              label: "Surat Pernyataan Orisinalitas",
              value: teamData.fcec[0]?.originality_statement,
              isLink: true,
            },
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

        <div className="flex justify-end mt-10">
          {isAdmin && (
            <button
              onClick={downloadFilesAsZip}
              className="bg-cic-secondary shadow-xl text-white px-6 py-2 rounded-2xl font-sans mr-4"
            >
              Unduh Semua Data
            </button>
          )}
          {!isAdmin && (
            <button
              onClick={handleBack}
              className="bg-cic-secondary shadow-xl text-white px-6 py-2 rounded-2xl font-sans"
            >
              Kembali
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
