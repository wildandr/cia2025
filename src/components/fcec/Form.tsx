// components/Form.tsx
"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructionsFcec } from "@/data/formInstructionsFcec";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TeamMember {
  full_name: string;
  phone_number: string;
  line_id: string;
  email: string;
  twibbon_and_poster_link: string;
  is_leader: number;
  department: string;
  batch: string;
  nim: string;
  semester: number;
  ktm?: File;
  active_student_letter?: File;
  photo?: File;
}

interface FcecData {
  abstract_title: string;
  abstract_video_link: string;
  abstract_file?: File;
  originality_statement?: File;
}

interface FormData {
  team_name: string;
  institution_name: string;
  user_id: number;
  email: string;
  abstract_title: string;
  abstract_video_link: string;
  abstract_file?: File;
  originality_statement?: File;
  leader: TeamMember;
  members: TeamMember[];
}

export function Form() {
  const { user } = useAuth();

  // Inisialisasi state dari localStorage jika ada
  const getInitialFormData = (): FormData => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      // Kosongkan file karena file tidak dapat disimpan di localStorage
      return {
        ...parsedData,
        abstract_file: undefined,
        originality_statement: undefined,
        leader: {
          ...parsedData.leader,
          ktm: undefined,
          active_student_letter: undefined,
          photo: undefined,
        },
        members: parsedData.members.map((member: TeamMember) => ({
          ...member,
          ktm: undefined,
          active_student_letter: undefined,
          photo: undefined,
        })),
      };
    }
    return {
      team_name: "",
      institution_name: "",
      user_id: user?.id || 1,
      email: "",
      abstract_title: "",
      abstract_video_link: "no_video",
      abstract_file: undefined,
      originality_statement: undefined,
      leader: {
        full_name: "",
        phone_number: "",
        line_id: "",
        email: "",
        twibbon_and_poster_link: "",
        is_leader: 1,
        department: "",
        batch: "no",
        nim: "no",
        semester: 2,
        ktm: undefined,
        active_student_letter: undefined,
        photo: undefined,
      },
      members: [
        {
          full_name: "",
          phone_number: "",
          line_id: "",
          email: "",
          twibbon_and_poster_link: "",
          is_leader: 0,
          department: "",
          batch: "no",
          nim: "no",
          semester: 2,
          ktm: undefined,
          active_student_letter: undefined,
          photo: undefined,
        },
        {
          full_name: "",
          phone_number: "",
          line_id: "",
          email: "",
          twibbon_and_poster_link: "",
          is_leader: 0,
          department: "",
          batch: "no",
          nim: "no",
          semester: 2,
          ktm: undefined,
          active_student_letter: undefined,
          photo: undefined,
        },
      ],
    };
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  // Simpan formData ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

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
        } else if (name === "abstract_title") {
          handleTeamInfoChange("abstract_title", value);
        } else if (name === "abstract_video_link") {
          handleTeamInfoChange("abstract_video_link", value);
        } else if (name === "leader_full_name") {
          handleMemberChange("leader", null, "full_name", value);
        } else if (name === "leader_email") {
          handleMemberChange("leader", null, "email", value);
        } else if (name === "leader_phone_number") {
          handleMemberChange("leader", null, "phone_number", value);
        } else if (name === "leader_line_id") {
          handleMemberChange("leader", null, "line_id", value);
        } else if (name === "leader_twibbon_and_poster_link") {
          handleMemberChange("leader", null, "twibbon_and_poster_link", value);
        } else if (name === "leader_department") {
          handleMemberChange("leader", null, "department", value);
        } else if (name === "leader_batch") {
          handleMemberChange("leader", null, "batch", value);
        } else if (name === "leader_nim") {
          handleMemberChange("leader", null, "nim", value);
        } else if (name === "leader_semester") {
          handleMemberChange("leader", null, "semester", parseInt(value) || 0);
        } else {
          formData.members.forEach((_, index) => {
            if (name === `member${index}_full_name`) {
              handleMemberChange("member", index, "full_name", value);
            } else if (name === `member${index}_email`) {
              handleMemberChange("member", index, "email", value);
            } else if (name === `member${index}_phone_number`) {
              handleMemberChange("member", index, "phone_number", value);
            } else if (name === `member${index}_line_id`) {
              handleMemberChange("member", index, "line_id", value);
            } else if (name === `member${index}_twibbon_and_poster_link`) {
              handleMemberChange(
                "member",
                index,
                "twibbon_and_poster_link",
                value
              );
            } else if (name === `member${index}_department`) {
              handleMemberChange("member", index, "department", value);
            } else if (name === `member${index}_batch`) {
              handleMemberChange("member", index, "batch", value);
            } else if (name === `member${index}_nim`) {
              handleMemberChange("member", index, "nim", value);
            } else if (name === `member${index}_semester`) {
              handleMemberChange(
                "member",
                index,
                "semester",
                parseInt(value) || 0
              );
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

    // Validasi untuk informasi tim
    if (!formData.team_name.trim()) {
      errors.push("Nama Tim wajib diisi");
    }
    if (!formData.institution_name.trim()) {
      errors.push("Asal Sekolah wajib diisi");
    }
    if (!formData.email.trim()) {
      errors.push("Email wajib diisi");
    }
    if (!formData.abstract_title.trim()) {
      errors.push("Judul Abstrak wajib diisi");
    }
    if (!formData.abstract_video_link.trim()) {
      errors.push("Link Video Abstrak wajib diisi");
    }

    // Validasi untuk Ketua
    if (!formData.leader.full_name.trim()) {
      errors.push("Nama Lengkap Ketua wajib diisi");
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

    // Validasi untuk Anggota 1
    if (!formData.members[0].full_name.trim()) {
      errors.push("Nama Lengkap Anggota 1 wajib diisi");
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
    const maxFileSize = 500 * 1024;

    const checkFileSize = (file: File | undefined, fileLabel: string) => {
      if (file && file.size > maxFileSize) {
        errors.push(`${fileLabel} melebihi ukuran maksimum 500KB`);
      }
    };

    // Validasi file untuk informasi tim
    if (!formData.abstract_file) {
      errors.push("File Abstrak wajib diupload");
    }
    if (!formData.originality_statement) {
      errors.push("Surat Pernyataan Orisinalitas wajib diupload");
    }

    // Validasi file untuk Ketua
    if (!formData.leader.ktm) {
      errors.push("Kartu Tanda Pengenal Ketua wajib diupload");
    }
    if (!formData.leader.active_student_letter) {
      errors.push("Surat Pernyataan Siswa Aktif Ketua wajib diupload");
    }
    if (!formData.leader.photo) {
      errors.push("Pas Foto Ketua wajib diupload");
    }

    // Validasi file untuk Anggota 1
    if (!formData.members[0].ktm) {
      errors.push("Kartu Tanda Pengenal Anggota 1 wajib diupload");
    }
    if (!formData.members[0].active_student_letter) {
      errors.push("Surat Pernyataan Siswa Aktif Anggota 1 wajib diupload");
    }
    if (!formData.members[0].photo) {
      errors.push("Pas Foto Anggota 1 wajib diupload");
    }

    // Pengecekan ukuran file
    checkFileSize(formData.abstract_file, "File Abstrak");
    checkFileSize(formData.originality_statement, "Surat Pernyataan Orisinalitas");
    checkFileSize(formData.leader.ktm, "Kartu Tanda Pengenal Ketua");
    checkFileSize(formData.leader.active_student_letter, "Surat Pernyataan Siswa Aktif Ketua");
    checkFileSize(formData.leader.photo, "Pas Foto Ketua");
    checkFileSize(formData.members[0].ktm, "Kartu Tanda Pengenal Anggota 1");
    checkFileSize(formData.members[0].active_student_letter, "Surat Pernyataan Siswa Aktif Anggota 1");
    checkFileSize(formData.members[0].photo, "Pas Foto Anggota 1");

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
        payment_proof: "",
      };

      const leaderData = {
        full_name: formData.leader.full_name,
        phone_number: formData.leader.phone_number,
        line_id: formData.leader.line_id,
        email: formData.leader.email,
        twibbon_and_poster_link: formData.leader.twibbon_and_poster_link,
        is_leader: formData.leader.is_leader,
        department: formData.leader.department,
        batch: formData.leader.batch,
        nim: formData.leader.nim,
        semester: formData.leader.semester,
      };

      const membersData = formData.members
        .filter((member) => member.full_name.trim() !== "")
        .map((member) => ({
          full_name: member.full_name,
          phone_number: member.phone_number,
          line_id: member.line_id,
          email: member.email,
          twibbon_and_poster_link: member.twibbon_and_poster_link,
          is_leader: member.is_leader,
          department: member.department,
          batch: member.batch,
          nim: member.nim,
          semester: member.semester,
        }));

      const fcecData = {
        abstract_title: formData.abstract_title,
        abstract_video_link: formData.abstract_video_link,
      };

      const combinedData = {
        team: teamData,
        leader: leaderData,
        members: membersData,
        fcec: fcecData,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(combinedData));

      if (formData.abstract_file) {
        formDataToSend.append("abstract_file", formData.abstract_file);
      }
      if (formData.originality_statement) {
        formDataToSend.append("originality_statement", formData.originality_statement);
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
        if (member.full_name.trim() !== "") {
          if (member.ktm) {
            formDataToSend.append(`member${index + 1}_ktm`, member.ktm);
          }
          if (member.active_student_letter) {
            formDataToSend.append(`member${index + 1}_active_student_letter`, member.active_student_letter);
          }
          if (member.photo) {
            formDataToSend.append(`member${index + 1}_photo`, member.photo);
          }
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/teams/fcec/new`, {
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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Bersihkan localStorage setelah berhasil submit
      localStorage.removeItem("formData");
      setFormData(getInitialFormData());
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
      [field]: value || "",
    }));
  };

  const handleMemberChange = (
    type: "leader" | "member",
    index: number | null,
    field: keyof TeamMember,
    value: string | number
  ) => {
    if (type === "leader") {
      setFormData((prev) => ({
        ...prev,
        leader: {
          ...prev.leader,
          [field]: value || (typeof value === "number" ? 0 : ""),
        },
      }));
    } else if (type === "member" && index !== null) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.map((member, i) =>
          i === index
            ? {
                ...member,
                [field]: value || (typeof value === "number" ? 0 : ""),
              }
            : member
        ),
      }));
    }
  };

  const handleFileChange = (
    type: "team" | "leader" | "member",
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
    }
  };

  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) {
    return null;
  }

  const [activeTab, setActiveTab] = useState<"ketua" | "anggota1" | "anggota2">("ketua");

  const handleTabChange = (tab: "ketua" | "anggota1" | "anggota2") => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col overflow-hidden max-w-5xl mx-auto font-openSans">
      <ToastContainer style={{ marginTop: "24px" }} />
      <div className="flex flex-col lg:justify-center items-center relative min-w-full">
        <div className="z-[10] min-h-screen flex flex-col">
          {/* Instructions */}
          <div className="text-white mx-4 mt-[3%] lg:mb-[1%] md:text-base lg:text-xl text-[0.7rem]">
            <ol className="list-decimal pl-2">
              {formInstructionsFcec.map((instruction, index) => (
                <li key={index} className="mb-1 whitespace-pre-line">
                  {instruction.text}
                  {instruction.documents && (
                    <ol className="list-[lower-alpha] pl-5">
                      {instruction.documents.map((doc, docIndex) => (
                        <li key={docIndex} className="mb-1">
                          {doc.description} Format penamaan file: {doc.format} Contoh: {doc.example}
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
              required
            />
            <Input
              label="Nama Tim"
              type="text"
              name="team_name"
              autoComplete="organization"
              value={formData.team_name}
              onChange={(e) => handleTeamInfoChange("team_name", e.target.value)}
              required
            />
            <Input
              label="Asal Sekolah"
              type="text"
              name="institution_name"
              autoComplete="organization"
              value={formData.institution_name}
              onChange={(e) => handleTeamInfoChange("institution_name", e.target.value)}
              required
            />
            <Input
              label="Judul Abstrak"
              type="text"
              name="abstract_title"
              autoComplete="off"
              value={formData.abstract_title}
              onChange={(e) => handleTeamInfoChange("abstract_title", e.target.value)}
              required
            />
            <div>
              <FileInput
                label="File Abstrak"
                accept="application/pdf, image/*"
                name="abstract_file"
                onChange={(e) =>
                  handleFileChange("team", null, "abstract_file", e.target.files?.[0] || null)
                }
                required
                variant="fcec"
                helperText="Format Penamaan: Nama Tim_Abstrak"
              />
            </div>
            <div>
              <FileInput
                label="Surat Pernyataan Orisinalitas"
                accept="application/pdf, image/*"
                name="originality_statement"
                onChange={(e) =>
                  handleFileChange("team", null, "originality_statement", e.target.files?.[0] || null)
                }
                required
                variant="fcec"
                helperText="Format Penamaan: Nama Tim_Surat Pernyataan Orisinalitas"
              />
            </div>

            {/* Tabs Section */}
            <div className="w-full mt-[3%]">
              <div className="border-2 rounded-lg">
                {/* Tab Headers */}
                <div className="flex items-center border-b-2 border-white">
                  <div
                    className={`flex-1 text-center py-2 rounded-tl-md text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                      activeTab === "ketua" ? "bg-white text-black" : "text-white"
                    }`}
                    onClick={() => handleTabChange("ketua")}
                  >
                    <p>Ketua</p>
                  </div>
                  <div
                    className={`flex-1 text-center py-2 text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                      activeTab === "anggota1" ? "bg-white text-black" : "text-white"
                    }`}
                    onClick={() => handleTabChange("anggota1")}
                  >
                    <p>Anggota 1</p>
                  </div>
                  <div
                    className={`flex-1 text-center py-2 text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                      activeTab === "anggota2" ? "bg-white text-black" : "text-white"
                    }`}
                    onClick={() => handleTabChange("anggota2")}
                  >
                    <p>Anggota 2</p>
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
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="leader_email"
                      autoComplete="email"
                      value={formData.leader.email}
                      onChange={(e) => handleMemberChange("leader", null, "email", e.target.value)}
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      name="leader_phone_number"
                      autoComplete="tel"
                      value={formData.leader.phone_number}
                      onChange={(e) => handleMemberChange("leader", null, "phone_number", e.target.value)}
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      name="leader_line_id"
                      autoComplete="off"
                      value={formData.leader.line_id}
                      onChange={(e) => handleMemberChange("leader", null, "line_id", e.target.value)}
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
                      required
                    />
                    <div>
                      <FileInput
                        label="Kartu Tanda Pengenal"
                        accept="application/pdf, image/*"
                        name="leader_ktm"
                        onChange={(e) =>
                          handleFileChange("leader", null, "ktm", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Kartu Identitas_Nama Lengkap"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Surat Pernyataan Siswa Aktif"
                        accept="application/pdf, image/*"
                        name="leader_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("leader", null, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="application/pdf, image/*"
                        name="leader_photo"
                        onChange={(e) =>
                          handleFileChange("leader", null, "photo", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Pas Foto_Nama Lengkap"
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
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="member0_email"
                      autoComplete="email"
                      value={formData.members[0].email}
                      onChange={(e) => handleMemberChange("member", 0, "email", e.target.value)}
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      name="member0_phone_number"
                      autoComplete="tel"
                      value={formData.members[0].phone_number}
                      onChange={(e) => handleMemberChange("member", 0, "phone_number", e.target.value)}
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      name="member0_line_id"
                      autoComplete="off"
                      value={formData.members[0].line_id}
                      onChange={(e) => handleMemberChange("member", 0, "line_id", e.target.value)}
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
                      required
                    />
                    <div>
                      <FileInput
                        label="Kartu Tanda Pengenal"
                        accept="application/pdf, image/*"
                        name="member0_ktm"
                        onChange={(e) =>
                          handleFileChange("member", 0, "ktm", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Kartu Identitas_Nama Lengkap"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Surat Pernyataan Siswa Aktif"
                        accept="application/pdf, image/*"
                        name="member0_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("member", 0, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="application/pdf, image/*"
                        name="member0_photo"
                        onChange={(e) =>
                          handleFileChange("member", 0, "photo", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Pas Foto_Nama Lengkap"
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
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="member1_email"
                      autoComplete="email"
                      value={formData.members[1].email}
                      onChange={(e) => handleMemberChange("member", 1, "email", e.target.value)}
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      name="member1_phone_number"
                      autoComplete="tel"
                      value={formData.members[1].phone_number}
                      onChange={(e) => handleMemberChange("member", 1, "phone_number", e.target.value)}
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      name="member1_line_id"
                      autoComplete="off"
                      value={formData.members[1].line_id}
                      onChange={(e) => handleMemberChange("member", 1, "line_id", e.target.value)}
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
                    />
                    <div>
                      <FileInput
                        label="Kartu Tanda Pengenal"
                        accept="application/pdf, image/*"
                        name="member1_ktm"
                        onChange={(e) =>
                          handleFileChange("member", 1, "ktm", e.target.files?.[0] || null)
                        }
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Kartu Identitas_Nama Lengkap"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Surat Pernyataan Siswa Aktif"
                        accept="application/pdf, image/*"
                        name="member1_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("member", 1, "active_student_letter", e.target.files?.[0] || null)
                        }
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap"
                      />
                    </div>
                    <div>
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="application/pdf, image/*"
                        name="member1_photo"
                        onChange={(e) =>
                          handleFileChange("member", 1, "photo", e.target.files?.[0] || null)
                        }
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Pas Foto_Nama Lengkap"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full mt-4 p-2">
              <Button
                variant="fcec-primary"
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