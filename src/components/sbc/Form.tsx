// components/Form.tsx (SBC Form)
"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructions } from "@/data/formInstructionsSbc";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface TeamMember {
  full_name: string;
  nim: string;
  batch: string;
  phone_number: string;
  line_id: string;
  email: string;
  twibbon_and_poster_link: string;
  ktm?: File;
  active_student_letter?: File;
  photo?: File;
}

interface DosenPembimbing {
  full_name: string;
  nip: string;
  email: string;
  phone_number: string;
  photo?: File;
}

interface SbcData {
  bridge_name: string;
}

interface FormData {
  team_name: string;
  institution_name: string;
  user_id: number;
  email: string;
  payment_proof?: File;
  voucher?: File;
  bridge_name: string;
  leader: TeamMember;
  members: TeamMember[];
  dosbim: DosenPembimbing;
}

export function Form() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    team_name: "",
    institution_name: "",
    user_id: user?.id || 1,
    email: "",
    payment_proof: undefined,
    voucher: undefined,
    bridge_name: "",
    leader: {
      full_name: "",
      nim: "",
      batch: "",
      phone_number: "",
      line_id: "",
      email: "",
      twibbon_and_poster_link: "",
      ktm: undefined,
      active_student_letter: undefined,
      photo: undefined,
    },
    members: [
      {
        full_name: "",
        nim: "",
        batch: "",
        phone_number: "",
        line_id: "",
        email: "",
        twibbon_and_poster_link: "",
        ktm: undefined,
        active_student_letter: undefined,
        photo: undefined,
      },
      {
        full_name: "",
        nim: "",
        batch: "",
        phone_number: "",
        line_id: "",
        email: "",
        twibbon_and_poster_link: "",
        ktm: undefined,
        active_student_letter: undefined,
        photo: undefined,
      },
    ],
    dosbim: {
      full_name: "",
      nip: "",
      email: "",
      phone_number: "",
      photo: undefined,
    },
  });

  // Deteksi autofill menggunakan animationstart
  useEffect(() => {
    const handleAutofill = (e: Event) => {
      if (
        e.type === "animationstart" &&
        (e as AnimationEvent).animationName === "autofill"
      ) {
        const input = e.target as HTMLInputElement;
        const name = input.name;
        const value = input.value;

        if (name === "email") {
          handleTeamInfoChange("email", value);
        } else if (name === "team_name") {
          handleTeamInfoChange("team_name", value);
        } else if (name === "institution_name") {
          handleTeamInfoChange("institution_name", value);
        } else if (name === "bridge_name") {
          handleTeamInfoChange("bridge_name", value);
        } else if (name === "leader_full_name") {
          handleMemberChange("leader", null, "full_name", value);
        } else if (name === "leader_nim") {
          handleMemberChange("leader", null, "nim", value);
        } else if (name === "leader_batch") {
          handleMemberChange("leader", null, "batch", value);
        } else if (name === "leader_email") {
          handleMemberChange("leader", null, "email", value);
        } else if (name === "leader_phone_number") {
          handleMemberChange("leader", null, "phone_number", value);
        } else if (name === "leader_line_id") {
          handleMemberChange("leader", null, "line_id", value);
        } else if (name === "leader_twibbon_and_poster_link") {
          handleMemberChange("leader", null, "twibbon_and_poster_link", value);
        } else if (name === "dosbim_full_name") {
          handleMemberChange("dosbim", null, "full_name", value);
        } else if (name === "dosbim_nip") {
          handleMemberChange("dosbim", null, "nip", value);
        } else if (name === "dosbim_email") {
          handleMemberChange("dosbim", null, "email", value);
        } else if (name === "dosbim_phone_number") {
          handleMemberChange("dosbim", null, "phone_number", value);
        } else {
          formData.members.forEach((_, index) => {
            if (name === `member${index}_full_name`) {
              handleMemberChange("member", index, "full_name", value);
            } else if (name === `member${index}_nim`) {
              handleMemberChange("member", index, "nim", value);
            } else if (name === `member${index}_batch`) {
              handleMemberChange("member", index, "batch", value);
            } else if (name === `member${index}_email`) {
              handleMemberChange("member", index, "email", value);
            } else if (name === `member${index}_phone_number`) {
              handleMemberChange("member", index, "phone_number", value);
            } else if (name === `member${index}_line_id`) {
              handleMemberChange("member", index, "line_id", value);
            } else if (name === `member${index}_twibbon_and_poster_link`) {
              handleMemberChange("member", index, "twibbon_and_poster_link", value);
            }
          });
        }
      }
    };

    document.addEventListener("animationstart", handleAutofill);
    return () => document.removeEventListener("animationstart", handleAutofill);
  }, [formData]);

  const validateTextFields = () => {
    const errors: string[] = [];

    if (!formData.team_name.trim()) {
      errors.push("Nama Tim wajib diisi");
    }
    if (!formData.institution_name.trim()) {
      errors.push("Nama Perguruan Tinggi wajib diisi");
    }
    if (!formData.email.trim()) {
      errors.push("Email wajib diisi");
    }
    if (!formData.bridge_name.trim()) {
      errors.push("Nama Jembatan wajib diisi");
    }

    if (!formData.leader.full_name.trim()) {
      errors.push("Nama Lengkap Ketua wajib diisi");
    }
    if (!formData.leader.nim.trim()) {
      errors.push("NIM Ketua wajib diisi");
    }
    if (!formData.leader.batch.trim()) {
      errors.push("Semester Ketua wajib diisi");
    }
    if (!formData.leader.email.trim()) {
      errors.push("Email Ketua wajib diisi");
    }
    if (!formData.leader.phone_number.trim()) {
      errors.push("Nomor Whatsapp Ketua wajib diisi");
    }
    if (!formData.leader.line_id.trim()) {
      errors.push("ID Line Ketua wajib diisi");
    }
    if (!formData.leader.twibbon_and_poster_link.trim()) {
      errors.push("Link Bukti Upload Twibbon Ketua wajib diisi");
    }

    if (!formData.members[0].full_name.trim()) {
      errors.push("Nama Lengkap Anggota 1 wajib diisi");
    }
    if (!formData.members[0].nim.trim()) {
      errors.push("NIM Anggota 1 wajib diisi");
    }
    if (!formData.members[0].batch.trim()) {
      errors.push("Semester Anggota 1 wajib diisi");
    }
    if (!formData.members[0].email.trim()) {
      errors.push("Email Anggota 1 wajib diisi");
    }
    if (!formData.members[0].phone_number.trim()) {
      errors.push("Nomor Whatsapp Anggota 1 wajib diisi");
    }
    if (!formData.members[0].line_id.trim()) {
      errors.push("ID Line Anggota 1 wajib diisi");
    }
    if (!formData.members[0].twibbon_and_poster_link.trim()) {
      errors.push("Link Bukti Upload Twibbon Anggota 1 wajib diisi");
    }

    if (!formData.members[1].full_name.trim()) {
      errors.push("Nama Lengkap Anggota 2 wajib diisi");
    }
    if (!formData.members[1].nim.trim()) {
      errors.push("NIM Anggota 2 wajib diisi");
    }
    if (!formData.members[1].batch.trim()) {
      errors.push("Semester Anggota 2 wajib diisi");
    }
    if (!formData.members[1].email.trim()) {
      errors.push("Email Anggota 2 wajib diisi");
    }
    if (!formData.members[1].phone_number.trim()) {
      errors.push("Nomor Whatsapp Anggota 2 wajib diisi");
    }
    if (!formData.members[1].line_id.trim()) {
      errors.push("ID Line Anggota 2 wajib diisi");
    }
    if (!formData.members[1].twibbon_and_poster_link.trim()) {
      errors.push("Link Bukti Upload Twibbon Anggota 2 wajib diisi");
    }

    if (!formData.dosbim.full_name.trim()) {
      errors.push("Nama Lengkap Dosen Pembimbing wajib diisi");
    }
    if (!formData.dosbim.nip.trim()) {
      errors.push("NIP Dosen Pembimbing wajib diisi");
    }
    if (!formData.dosbim.email.trim()) {
      errors.push("Email Dosen Pembimbing wajib diisi");
    }
    if (!formData.dosbim.phone_number.trim()) {
      errors.push("Nomor Whatsapp Dosen Pembimbing wajib diisi");
    }

    if (errors.length > 0) {
      toast.error(`Silakan lengkapi data berikut:\n${errors.join("\n")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    return true;
  };

  const validateFiles = () => {
    const errors: string[] = [];
    const maxFileSize = 500 * 1024; // 500KB in bytes

    const checkFileSize = (file: File | undefined, fileLabel: string) => {
      if (file && file.size > maxFileSize) {
        errors.push(`${fileLabel} melebihi ukuran maksimum 500KB`);
      }
    };

    if (!formData.payment_proof) {
      errors.push("Bukti Pembayaran wajib diupload");
    }
    if (!formData.leader.ktm) {
      errors.push("KTM Ketua Tim wajib diupload");
    }
    if (!formData.leader.active_student_letter) {
      errors.push("SKMA Ketua Tim wajib diupload");
    }
    if (!formData.leader.photo) {
      errors.push("Pas Foto Ketua Tim wajib diupload");
    }
    if (!formData.members[0].ktm) {
      errors.push("KTM Anggota 1 wajib diupload");
    }
    if (!formData.members[0].active_student_letter) {
      errors.push("SKMA Anggota 1 wajib diupload");
    }
    if (!formData.members[0].photo) {
      errors.push("Pas Foto Anggota 1 wajib diupload");
    }
    if (!formData.members[1].ktm) {
      errors.push("KTM Anggota 2 wajib diupload");
    }
    if (!formData.members[1].active_student_letter) {
      errors.push("SKMA Anggota 2 wajib diupload");
    }
    if (!formData.members[1].photo) {
      errors.push("Pas Foto Anggota 2 wajib diupload");
    }
    if (!formData.dosbim.photo) {
      errors.push("Pas Foto Dosen Pembimbing wajib diupload");
    }

    checkFileSize(formData.payment_proof, "Bukti Pembayaran");
    checkFileSize(formData.voucher, "Bukti Voucher");
    checkFileSize(formData.leader.ktm, "KTM Ketua Tim");
    checkFileSize(formData.leader.active_student_letter, "SKMA Ketua Tim");
    checkFileSize(formData.leader.photo, "Pas Foto Ketua Tim");
    checkFileSize(formData.members[0].ktm, "KTM Anggota 1");
    checkFileSize(formData.members[0].active_student_letter, "SKMA Anggota 1");
    checkFileSize(formData.members[0].photo, "Pas Foto Anggota 1");
    checkFileSize(formData.members[1].ktm, "KTM Anggota 2");
    checkFileSize(formData.members[1].active_student_letter, "SKMA Anggota 2");
    checkFileSize(formData.members[1].photo, "Pas Foto Anggota 2");
    checkFileSize(formData.dosbim.photo, "Pas Foto Dosen Pembimbing");

    if (errors.length > 0) {
      toast.error(`Silakan periksa dokumen berikut:\n${errors.join("\n")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validateTextFields()) {
        setLoading(false);
        return;
      }

      if (!validateFiles()) {
        setLoading(false);
        return;
      }

      const token = Cookies.get("token");

      const teamData = {
        team_name: formData.team_name,
        institution_name: formData.institution_name,
        user_id: formData.user_id || 1,
        email: formData.email,
      };

      const leaderData = {
        full_name: formData.leader.full_name,
        nim: formData.leader.nim,
        batch: formData.leader.batch,
        phone_number: formData.leader.phone_number,
        line_id: formData.leader.line_id,
        email: formData.leader.email,
        twibbon_and_poster_link: formData.leader.twibbon_and_poster_link,
      };

      const membersData = formData.members.map((member) => ({
        full_name: member.full_name,
        nim: member.nim,
        batch: member.batch,
        phone_number: member.phone_number,
        line_id: member.line_id,
        email: member.email,
        twibbon_and_poster_link: member.twibbon_and_poster_link,
      }));

      const dosbimData = {
        full_name: formData.dosbim.full_name,
        nip: formData.dosbim.nip,
        email: formData.dosbim.email,
        phone_number: formData.dosbim.phone_number,
      };

      const sbcData = {
        bridge_name: formData.bridge_name,
      };

      const combinedData = {
        team: teamData,
        leader: leaderData,
        members: membersData,
        dosbim: [dosbimData],
        sbc: [sbcData],
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(combinedData));

      if (formData.payment_proof) {
        formDataToSend.append("payment_proof", formData.payment_proof);
      }
      if (formData.voucher) {
        formDataToSend.append("voucher", formData.voucher);
      }

      if (formData.leader.ktm) {
        formDataToSend.append("leader_ktm", formData.leader.ktm);
      }
      if (formData.leader.active_student_letter) {
        formDataToSend.append("leader_active_student_letter", formData.leader.active_student_letter);
      }
      if (formData.leader.photo) {
        formDataToSend.append("leader_photo", formData.leader.photo);
      }

      formData.members.forEach((member, index) => {
        if (member.ktm) {
          formDataToSend.append(`member${index + 1}_ktm`, member.ktm);
        }
        if (member.active_student_letter) {
          formDataToSend.append(`member${index + 1}_active_student_letter`, member.active_student_letter);
        }
        if (member.photo) {
          formDataToSend.append(`member${index + 1}_photo`, member.photo);
        }
      });

      if (formData.dosbim.photo) {
        formDataToSend.append("dosbim_photo", formData.dosbim.photo);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/teams/sbc/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Unknown error occurred during submission");
      }

      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000, // Reduced to 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          router.push('/dashboard'); // Redirect after toast closes
        }
      });

      // Reset form to initial state after successful submission
      setFormData({
        team_name: "",
        institution_name: "",
        user_id: user?.id || 1,
        email: "",
        payment_proof: undefined,
        voucher: undefined,
        bridge_name: "",
        leader: {
          full_name: "",
          nim: "",
          batch: "",
          phone_number: "",
          line_id: "",
          email: "",
          twibbon_and_poster_link: "",
          ktm: undefined,
          active_student_letter: undefined,
          photo: undefined,
        },
        members: [
          {
            full_name: "",
            nim: "",
            batch: "",
            phone_number: "",
            line_id: "",
            email: "",
            twibbon_and_poster_link: "",
            ktm: undefined,
            active_student_letter: undefined,
            photo: undefined,
          },
          {
            full_name: "",
            nim: "",
            batch: "",
            phone_number: "",
            line_id: "",
            email: "",
            twibbon_and_poster_link: "",
            ktm: undefined,
            active_student_letter: undefined,
            photo: undefined,
          },
        ],
        dosbim: {
          full_name: "",
          nip: "",
          email: "",
          phone_number: "",
          photo: undefined,
        },
      });
    } catch (error: any) {
      toast.error(`Failed to submit form: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTeamInfoChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMemberChange = (
    type: "leader" | "member" | "dosbim",
    index: number | null,
    field: keyof TeamMember | keyof DosenPembimbing,
    value: string
  ) => {
    if (type === "leader") {
      setFormData((prev) => ({
        ...prev,
        leader: {
          ...prev.leader,
          [field]: value,
        },
      }));
    } else if (type === "member" && index !== null) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.map((member, i) =>
          i === index ? { ...member, [field]: value } : member
        ),
      }));
    } else if (type === "dosbim") {
      setFormData((prev) => ({
        ...prev,
        dosbim: {
          ...prev.dosbim,
          [field]: value,
        },
      }));
    }
  };

  const handleFileChange = (
    type: "team" | "leader" | "member" | "dosbim",
    index: number | null,
    field: string,
    file: File | null
  ) => {
    if (!file) return;

    if (type === "team") {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
    } else if (type === "leader") {
      setFormData((prev) => ({
        ...prev,
        leader: {
          ...prev.leader,
          [field]: file,
        },
      }));
    } else if (type === "member" && index !== null) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.map((member, i) =>
          i === index ? { ...member, [field]: file } : member
        ),
      }));
    } else if (type === "dosbim") {
      setFormData((prev) => ({
        ...prev,
        dosbim: {
          ...prev.dosbim,
          [field]: file,
        },
      }));
    }
  };

  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) {
    return null;
  }

  const [activeTab, setActiveTab] = useState<"ketua" | "anggota1" | "anggota2" | "dosbim">("ketua");

  const handleTabChange = (tab: "ketua" | "anggota1" | "anggota2" | "dosbim") => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col overflow-hidden max-w-5xl mx-auto font-openSans">
      <ToastContainer style={{ marginTop: "20px" }} />
      <div className="flex flex-col lg:justify-center items-center relative min-w-full">
        <div className="z-[10] min-h-screen flex flex-col">
          {/* Instructions */}
          <div className="text-white mx-4 mt-[3%] lg:mb-[1%] md:text-base lg:text-xl text-[0.7rem]">
            <ol className="list-decimal pl-2 whitespace-pre-line">
              {formInstructions.map((instruction, index) => (
                <li key={index} className="mb-1">
                  {instruction.text}
                  {instruction.documents && (
                    <ol className="list-[lower-alpha] pl-5">
                      {instruction.documents.map((doc, docIndex) => (
                        <li key={docIndex} className="mb-1">
                          {doc.description} Format penamaan file: {doc.format}{" "}
                          Contoh: {doc.example}
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Single Form for All Sections */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 font-openSans">
            {/* Team Info */}
            <Input
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleTeamInfoChange("email", e.target.value)}
              placeholder="Email anda"
              required
            />
            <Input
              label="Nama Tim"
              type="text"
              name="team_name"
              autoComplete="organization"
              value={formData.team_name}
              onChange={(e) => handleTeamInfoChange("team_name", e.target.value)}
              placeholder="Nama tim anda"
              required
            />
            <Input
              label="Nama Perguruan Tinggi"
              type="text"
              name="institution_name"
              autoComplete="organization"
              value={formData.institution_name}
              onChange={(e) => handleTeamInfoChange("institution_name", e.target.value)}
              placeholder="Nama perguruan tinggi anda"
              required
            />
            <Input
              label="Nama Jembatan"
              type="text"
              name="bridge_name"
              autoComplete="off"
              value={formData.bridge_name}
              onChange={(e) => handleTeamInfoChange("bridge_name", e.target.value)}
              placeholder="Nama jembatan anda"
              required
            />
            <div>
              <FileInput
                label="Bukti Pembayaran"
                accept="image/*"
                name="payment_proof"
                onChange={(e) => handleFileChange("team", null, "payment_proof", e.target.files?.[0] || null)}
                required
                variant="sbc"
                helperText="Format Penamaan: Bukti Pembayaran_Nama Tim"
              />
            </div>
            <div>
              <FileInput
                label="Bukti Voucher"
                accept="image/*"
                name="voucher"
                onChange={(e) => handleFileChange("team", null, "voucher", e.target.files?.[0] || null)}
                variant="sbc"
                helperText="Format Penamaan: Bukti Voucher_Nama Tim"
              />
            </div>

            {/* Tabs Section */}
            <div className="w-full mt-[3%]">
              <div className="border-2 rounded-lg">
                <div className="flex items-center border-b-2 border-white">
                  <div
                    className={`flex-1 text-center py-4 w-full h-full rounded-tl-md text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                      activeTab === "ketua" ? "bg-white text-black" : "text-white"
                    }`}
                    onClick={() => handleTabChange("ketua")}
                  >
                    <p>Ketua</p>
                  </div>
                  <div
                    className={`flex-1 text-center py-4 text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                      activeTab === "anggota1" ? "bg-white text-black" : "text-white"
                    }`}
                    onClick={() => handleTabChange("anggota1")}
                  >
                    <p>Anggota 1</p>
                  </div>
                  <div
                    className={`flex-1 text-center py-4 text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                      activeTab === "anggota2" ? "bg-white text-black" : "text-white"
                    }`}
                    onClick={() => handleTabChange("anggota2")}
                  >
                    <p>Anggota 2</p>
                  </div>
                  <div
                    className={`flex-1 text-center py-2 custom-480:py-4 md:py-4 text-[10px] md:text-sm rounded-tr-md lg:text-lg cursor-pointer ${
                      activeTab === "dosbim" ? "bg-white text-black" : "text-white"
                    }`}
                    onClick={() => handleTabChange("dosbim")}
                  >
                    <p>Dosen Pembimbing</p>
                  </div>
                </div>

                {/* Tab Content - Render semua tab, sembunyikan dengan CSS */}
                <div className="flex flex-col gap-4 p-4">
                  {/* Tab Ketua */}
                  <div
                    className={`flex flex-col gap-4 ${activeTab === "ketua" ? "block" : "hidden"}`}
                  >
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      name="leader_full_name"
                      autoComplete="name"
                      value={formData.leader.full_name}
                      onChange={(e) => handleMemberChange("leader", null, "full_name", e.target.value)}
                      placeholder="Nama lengkap ketua tim"
                      required
                    />
                    <Input
                      label="NIM"
                      type="text"
                      name="leader_nim"
                      autoComplete="off"
                      value={formData.leader.nim}
                      onChange={(e) => handleMemberChange("leader", null, "nim", e.target.value)}
                      placeholder="Masukkan NIM ketua tim"
                      required
                    />
                    <Input
                      label="Semester"
                      type="text"
                      name="leader_batch"
                      autoComplete="off"
                      value={formData.leader.batch}
                      onChange={(e) => handleMemberChange("leader", null, "batch", e.target.value)}
                      placeholder="Masukkan semester ketua tim"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="leader_email"
                      autoComplete="email"
                      value={formData.leader.email}
                      onChange={(e) => handleMemberChange("leader", null, "email", e.target.value)}
                      placeholder="Masukkan email ketua tim"
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      name="leader_phone_number"
                      autoComplete="tel"
                      value={formData.leader.phone_number}
                      onChange={(e) => handleMemberChange("leader", null, "phone_number", e.target.value)}
                      placeholder="Masukkan nomor whatsapp ketua tim"
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      name="leader_line_id"
                      autoComplete="off"
                      value={formData.leader.line_id}
                      onChange={(e) => handleMemberChange("leader", null, "line_id", e.target.value)}
                      placeholder="Masukkan ID Line ketua tim"
                      required
                    />
                    <Input
                      label="Link Bukti Upload Twibbon"
                      type="text"
                      name="leader_twibbon_and_poster_link"
                      autoComplete="url"
                      value={formData.leader.twibbon_and_poster_link}
                      onChange={(e) =>
                        handleMemberChange("leader", null, "twibbon_and_poster_link", e.target.value)
                      }
                      placeholder="Masukkan link bukti upload twibbon ketua tim"
                      required
                    />
                    <div>
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="image/*"
                        name="leader_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("leader", null, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="sbc"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Peserta"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="image/*"
                        name="leader_ktm"
                        onChange={(e) => handleFileChange("leader", null, "ktm", e.target.files?.[0] || null)}
                        required
                        variant="sbc"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        name="leader_photo"
                        onChange={(e) => handleFileChange("leader", null, "photo", e.target.files?.[0] || null)}
                        required
                        variant="sbc"
                        helperText="Format Penamaan: Pasfoto_Nama Tim_Nama Peserta"
                      />
                    </div>
                  </div>

                  {/* Tab Anggota 1 */}
                  <div
                    className={`flex flex-col gap-4 ${activeTab === "anggota1" ? "block" : "hidden"}`}
                  >
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      name="member0_full_name"
                      autoComplete="name"
                      value={formData.members[0].full_name}
                      onChange={(e) => handleMemberChange("member", 0, "full_name", e.target.value)}
                      placeholder="Nama lengkap Anggota 1"
                      required
                    />
                    <Input
                      label="NIM"
                      type="text"
                      name="member0_nim"
                      autoComplete="off"
                      value={formData.members[0].nim}
                      onChange={(e) => handleMemberChange("member", 0, "nim", e.target.value)}
                      placeholder="Masukkan NIM Anggota 1"
                      required
                    />
                    <Input
                      label="Semester"
                      type="text"
                      name="member0_batch"
                      autoComplete="off"
                      value={formData.members[0].batch}
                      onChange={(e) => handleMemberChange("member", 0, "batch", e.target.value)}
                      placeholder="Masukkan semester Anggota 1"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="member0_email"
                      autoComplete="email"
                      value={formData.members[0].email}
                      onChange={(e) => handleMemberChange("member", 0, "email", e.target.value)}
                      placeholder="Masukkan email Anggota 1"
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      name="member0_phone_number"
                      autoComplete="tel"
                      value={formData.members[0].phone_number}
                      onChange={(e) => handleMemberChange("member", 0, "phone_number", e.target.value)}
                      placeholder="Masukkan nomor whatsapp Anggota 1"
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      name="member0_line_id"
                      autoComplete="off"
                      value={formData.members[0].line_id}
                      onChange={(e) => handleMemberChange("member", 0, "line_id", e.target.value)}
                      placeholder="Masukkan ID Line Anggota 1"
                      required
                    />
                    <Input
                      label="Link Bukti Upload Twibbon"
                      type="text"
                      name="member0_twibbon_and_poster_link"
                      autoComplete="url"
                      value={formData.members[0].twibbon_and_poster_link}
                      onChange={(e) =>
                        handleMemberChange("member", 0, "twibbon_and_poster_link", e.target.value)
                      }
                      placeholder="Masukkan link bukti upload twibbon Anggota 1"
                      required
                    />
                    <div>
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="image/*"
                        name="member0_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("member", 0, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="sbc"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Peserta"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="image/*"
                        name="member0_ktm"
                        onChange={(e) => handleFileChange("member", 0, "ktm", e.target.files?.[0] || null)}
                        required
                        variant="sbc"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        name="member0_photo"
                        onChange={(e) => handleFileChange("member", 0, "photo", e.target.files?.[0] || null)}
                        required
                        variant="sbc"
                        helperText="Format Penamaan: Pasfoto_Nama Tim_Nama Peserta"
                      />
                    </div>
                  </div>

                  {/* Tab Anggota 2 */}
                  <div
                    className={`flex flex-col gap-4 ${activeTab === "anggota2" ? "block" : "hidden"}`}
                  >
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      name="member1_full_name"
                      autoComplete="name"
                      value={formData.members[1].full_name}
                      onChange={(e) => handleMemberChange("member", 1, "full_name", e.target.value)}
                      placeholder="Nama lengkap Anggota 2"
                      required
                    />
                    <Input
                      label="NIM"
                      type="text"
                      name="member1_nim"
                      autoComplete="off"
                      value={formData.members[1].nim}
                      onChange={(e) => handleMemberChange("member", 1, "nim", e.target.value)}
                      placeholder="Masukkan NIM Anggota 2"
                      required
                    />
                    <Input
                      label="Semester"
                      type="text"
                      name="member1_batch"
                      autoComplete="off"
                      value={formData.members[1].batch}
                      onChange={(e) => handleMemberChange("member", 1, "batch", e.target.value)}
                      placeholder="Masukkan semester Anggota 2"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="member1_email"
                      autoComplete="email"
                      value={formData.members[1].email}
                      onChange={(e) => handleMemberChange("member", 1, "email", e.target.value)}
                      placeholder="Masukkan email Anggota 2"
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      name="member1_phone_number"
                      autoComplete="tel"
                      value={formData.members[1].phone_number}
                      onChange={(e) => handleMemberChange("member", 1, "phone_number", e.target.value)}
                      placeholder="Masukkan nomor whatsapp Anggota 2"
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      name="member1_line_id"
                      autoComplete="off"
                      value={formData.members[1].line_id}
                      onChange={(e) => handleMemberChange("member", 1, "line_id", e.target.value)}
                      placeholder="Masukkan ID Line Anggota 2"
                      required
                    />
                    <Input
                      label="Link Bukti Upload Twibbon"
                      type="text"
                      name="member1_twibbon_and_poster_link"
                      autoComplete="url"
                      value={formData.members[1].twibbon_and_poster_link}
                      onChange={(e) =>
                        handleMemberChange("member", 1, "twibbon_and_poster_link", e.target.value)
                      }
                      placeholder="Masukkan link bukti upload twibbon Anggota 2"
                      required
                    />
                    <div>
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="image/*"
                        name="member1_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("member", 1, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="sbc"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Peserta"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="image/*"
                        name="member1_ktm"
                        onChange={(e) => handleFileChange("member", 1, "ktm", e.target.files?.[0] || null)}
                        required
                        variant="sbc"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        name="member1_photo"
                        onChange={(e) => handleFileChange("member", 1, "photo", e.target.files?.[0] || null)}
                        required
                        variant="sbc"
                        helperText="Format Penamaan: Pasfoto_Nama Tim_Nama Peserta"
                      />
                    </div>
                  </div>

                  {/* Tab Dosen Pembimbing */}
                  <div
                    className={`flex flex-col gap-4 ${activeTab === "dosbim" ? "block" : "hidden"}`}
                  >
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      name="dosbim_full_name"
                      autoComplete="name"
                      value={formData.dosbim.full_name}
                      onChange={(e) => handleMemberChange("dosbim", null, "full_name", e.target.value)}
                      placeholder="Nama lengkap dosen pembimbing"
                      required
                    />
                    <Input
                      label="NIP"
                      type="text"
                      name="dosbim_nip"
                      autoComplete="off"
                      value={formData.dosbim.nip}
                      onChange={(e) => handleMemberChange("dosbim", null, "nip", e.target.value)}
                      placeholder="Masukkan NIP dosen pembimbing"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="dosbim_email"
                      autoComplete="email"
                      value={formData.dosbim.email}
                      onChange={(e) => handleMemberChange("dosbim", null, "email", e.target.value)}
                      placeholder="Masukkan email dosen pembimbing"
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      name="dosbim_phone_number"
                      autoComplete="tel"
                      value={formData.dosbim.phone_number}
                      onChange={(e) => handleMemberChange("dosbim", null, "phone_number", e.target.value)}
                      placeholder="Masukkan nomor whatsapp dosen pembimbing"
                      required
                    />
                    <div>
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        name="dosbim_photo"
                        onChange={(e) => handleFileChange("dosbim", null, "photo", e.target.files?.[0] || null)}
                        required
                        variant="sbc"
                        helperText="Format Penamaan: Pasfoto_Nama Tim_Nama Dosen Pembimbing"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full mt-4 p-2">
              <Button
                variant="sbc-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Kirim Formulir"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}