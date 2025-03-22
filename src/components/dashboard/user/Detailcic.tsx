"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/utlis/axiosInstance";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Member {
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

interface Team {
  team_id: number;
  event_id: number;
  team_name: string;
  institution_name: string;
  payment_proof: string;
  voucher: null | string;
  user_id: number;
  email: null | string;
  isVerified: number;
}

interface TeamData {
  team: Team[];
  leader: Member;
  members: Member[];
}

export default function DetailUser({ params }: { params: { id: string } }) {
  const [teamData, setTeamData] = useState<TeamData>({
    team: [],
    leader: {} as Member,
    members: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/teams/cic/${params.id}`);
      setTeamData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          href={value}
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
    member: Member,
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
        { label: "Semester", value: member.semester },
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

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-black text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-plusJakarta">
      <Image
        src="/assets/autentikasi/teksture.svg"
        alt="background"
        width={1000}
        height={1000}
        className="hidden sm:flex fixed w-full h-full object-cover z-10"
      />
      <div className="w-full min-h-screen absolute z-40">
        <div className="bg-white p-4 rounded-xl w-[90%] mx-auto mt-28 mb-8">
          <p className="text-black text-center text-2xl font-semibold px-6 z-20">
            Detail Tim
          </p>

          {teamData.team[0] &&
            [
              { label: "Email", value: teamData.team[0].email },
              { label: "Nama Tim", value: teamData.team[0].team_name },
              {
                label: "Nama Perguruan Tinggi",
                value: teamData.team[0].institution_name,
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
            ))}

          {teamData.leader &&
            teamData.leader.member_id &&
            renderMemberSection(teamData.leader, "Ketua")}

          {teamData.members &&
            teamData.members.map((member, index) =>
              renderMemberSection(member, `Anggota ${index + 1}`, index)
            )}

          <div className="flex justify-end mt-10">
            {isAdmin && (
              <button
                onClick={() => console.log("Unduh Semua Data")}
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
    </div>
  );
}
