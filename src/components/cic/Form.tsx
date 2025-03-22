"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructionsCic } from "@/data/formInstructionsCic";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TeamMember {
  full_name: string;
  department: string;
  batch: string;
  phone_number: string;
  line_id: string;
  email: string;
  twibbon_and_poster_link: string;
  ktm?: File;
  active_student_letter?: File;
  photo?: File;
}

interface FormData {
  team_name: string;
  institution_name: string;
  user_id: number;
  email: string;
  payment_proof?: File;
  voucher?: File;
  leader: TeamMember;
  members: TeamMember[];
}

export function Form() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    team_name: "",
    institution_name: "",
    user_id: user?.id || 1,
    email: "",
    payment_proof: undefined,
    voucher: undefined,
    leader: {
      full_name: "",
      department: "",
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
        department: "",
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
        department: "",
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
        department: "",
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
  });

  const [fileNames, setFileNames] = useState<{
    payment_proof?: string;
    voucher?: string;
    leader: { ktm?: string; active_student_letter?: string; photo?: string };
    members: Array<{ ktm?: string; active_student_letter?: string; photo?: string }>;
  }>({
    payment_proof: undefined,
    voucher: undefined,
    leader: { ktm: undefined, active_student_letter: undefined, photo: undefined },
    members: [
      { ktm: undefined, active_student_letter: undefined, photo: undefined },
      { ktm: undefined, active_student_letter: undefined, photo: undefined },
      { ktm: undefined, active_student_letter: undefined, photo: undefined },
    ],
  });

  // Deteksi autofill menggunakan animationstart (khusus untuk browser seperti Chrome)
  useEffect(() => {
    const handleAutofill = (e: Event) => {
      if (e.type === "animationstart" && (e as AnimationEvent).animationName === "autofill") {
        const input = e.target as HTMLInputElement;
        const name = input.name;
        const value = input.value;

        console.log(`Autofill detected on input: ${name}, value: ${value}`);

        // Update state berdasarkan nama input
        if (name === "email") {
          handleTeamInfoChange("email", value);
        } else if (name === "team_name") {
          handleTeamInfoChange("team_name", value);
        } else if (name === "institution_name") {
          handleTeamInfoChange("institution_name", value);
        } else if (name === "leader_full_name") {
          handleMemberChange("leader", 0, "full_name", value);
        } else if (name === "leader_department") {
          handleMemberChange("leader", 0, "department", value);
        } else if (name === "leader_batch") {
          handleMemberChange("leader", 0, "batch", value);
        } else if (name === "leader_email") {
          handleMemberChange("leader", 0, "email", value);
        } else if (name === "leader_phone_number") {
          handleMemberChange("leader", 0, "phone_number", value);
        } else if (name === "leader_line_id") {
          handleMemberChange("leader", 0, "line_id", value);
        } else if (name === "leader_twibbon_and_poster_link") {
          handleMemberChange("leader", 0, "twibbon_and_poster_link", value);
        } else {
          formData.members.forEach((_, index) => {
            if (name === `member${index}_full_name`) {
              handleMemberChange("member", index, "full_name", value);
            } else if (name === `member${index}_department`) {
              handleMemberChange("member", index, "department", value);
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

    if (!formData.leader.full_name.trim()) {
      errors.push("Nama Lengkap Ketua wajib diisi");
    }
    if (!formData.leader.department.trim()) {
      errors.push("Jurusan Ketua wajib diisi");
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
      errors.push("Link Upload Twibbon dan Poster Ketua wajib diisi");
    }

    const activeMembers = formData.members.filter(
      (member) => member.full_name || member.email || member.department
    ).length;

    console.log("Active Members Count:", activeMembers);

    if (activeMembers < 2) {
      errors.push("Minimal 2 anggota (Anggota 1 dan Anggota 2) wajib diisi");
    }

    if (activeMembers >= 3) {
      if (!formData.members[2].full_name.trim()) {
        errors.push("Nama Lengkap Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      }
      if (!formData.members[2].department.trim()) {
        errors.push("Jurusan Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      }
      if (!formData.members[2].batch.trim()) {
        errors.push("Semester Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      }
      if (!formData.members[2].email.trim()) {
        errors.push("Email Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      }
      if (!formData.members[2].phone_number.trim()) {
        errors.push("Nomor Whatsapp Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      }
      if (!formData.members[2].line_id.trim()) {
        errors.push("ID Line Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      }
      if (!formData.members[2].twibbon_and_poster_link.trim()) {
        errors.push("Link Upload Twibbon dan Poster Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      }
    }

    if (errors.length > 0) {
      console.log("Text Field Validation Errors:", errors);
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
    const activeMembers = formData.members.filter(
      (member) => member.full_name || member.email || member.department
    ).length;

    const errors: string[] = [];
    const maxFileSize = 500 * 1024; // 500KB in bytes

    const checkFileSize = (file: File | undefined, fileLabel: string) => {
      if (file && file.size > maxFileSize) {
        errors.push(`${fileLabel} melebihi ukuran maksimum 500KB`);
      }
    };

    if (!formData.leader.ktm) {
      errors.push("KTM Ketua Tim wajib diupload");
    }
    if (!formData.leader.active_student_letter) {
      errors.push("SKMA Ketua Tim wajib diupload");
    }
    if (!formData.leader.photo) {
      errors.push("Foto Ketua Tim wajib diupload");
    }

    for (let i = 0; i < activeMembers; i++) {
      if (!formData.members[i].ktm) {
        errors.push(`KTM Anggota ${i + 1} wajib diupload`);
      }
      if (!formData.members[i].active_student_letter) {
        errors.push(`SKMA Anggota ${i + 1} wajib diupload`);
      }
      if (!formData.members[i].photo) {
        errors.push(`Foto Anggota ${i + 1} wajib diupload`);
      }
    }

    if (!formData.payment_proof) {
      errors.push("Bukti pembayaran wajib diupload");
    }

    checkFileSize(formData.payment_proof, "Bukti Pembayaran");
    checkFileSize(formData.voucher, "Voucher");
    checkFileSize(formData.leader.ktm, "KTM Ketua Tim");
    checkFileSize(formData.leader.active_student_letter, "SKMA Ketua Tim");
    checkFileSize(formData.leader.photo, "Foto Ketua Tim");

    for (let i = 0; i < formData.members.length; i++) {
      checkFileSize(formData.members[i].ktm, `KTM Anggota ${i + 1}`);
      checkFileSize(formData.members[i].active_student_letter, `SKMA Anggota ${i + 1}`);
      checkFileSize(formData.members[i].photo, `Foto Anggota ${i + 1}`);
    }

    if (errors.length > 0) {
      console.log("File Validation Errors:", errors);
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
    console.log("Form submission triggered");
    setLoading(true);

    try {
      console.log("Starting form submission...");
      if (!validateTextFields()) {
        console.log("Text field validation failed. Submission stopped.");
        setLoading(false);
        return;
      }

      if (!validateFiles()) {
        console.log("File validation failed. Submission stopped.");
        setLoading(false);
        return;
      }

      const token = Cookies.get("token");
      console.log("Token:", token);

      const teamData = {
        team_name: formData.team_name,
        institution_name: formData.institution_name,
        user_id: formData.user_id || 1,
        email: formData.email,
      };

      console.log("User ID being sent:", teamData.user_id);

      const leaderData = {
        full_name: formData.leader.full_name,
        department: formData.leader.department,
        batch: formData.leader.batch,
        phone_number: formData.leader.phone_number,
        line_id: formData.leader.line_id,
        email: formData.leader.email,
        twibbon_and_poster_link: formData.leader.twibbon_and_poster_link,
      };

      const membersData = formData.members
        .filter((member) => member.full_name || member.email || member.department)
        .map((member) => ({
          full_name: member.full_name,
          department: member.department,
          batch: member.batch,
          phone_number: member.phone_number,
          line_id: member.line_id,
          email: member.email,
          twibbon_and_poster_link: member.twibbon_and_poster_link,
        }));

      const combinedData = {
        team: teamData,
        leader: leaderData,
        members: membersData,
      };

      console.log("Combined Data:", combinedData);

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(combinedData));

      if (formData.payment_proof) {
        formDataToSend.append("payment_proof", formData.payment_proof);
        console.log("Payment Proof File:", formData.payment_proof.name);
      }
      if (formData.voucher) {
        formDataToSend.append("voucher", formData.voucher);
        console.log("Voucher File:", formData.voucher.name);
      }

      if (formData.leader.ktm) {
        formDataToSend.append("leader_ktm", formData.leader.ktm);
        console.log("Leader KTM File:", formData.leader.ktm.name);
      }
      if (formData.leader.active_student_letter) {
        formDataToSend.append("leader_active_student_letter", formData.leader.active_student_letter);
        console.log("Leader Active Student Letter File:", formData.leader.active_student_letter.name);
      }
      if (formData.leader.photo) {
        formDataToSend.append("leader_photo", formData.leader.photo);
        console.log("Leader Photo File:", formData.leader.photo.name);
      }

      formData.members.forEach((member, index) => {
        if (member.full_name || member.email || member.department) {
          if (member.ktm) {
            formDataToSend.append(`member${index + 1}_ktm`, member.ktm);
            console.log(`Member ${index + 1} KTM File:`, member.ktm.name);
          }
          if (member.active_student_letter) {
            formDataToSend.append(`member${index + 1}_active_student_letter`, member.active_student_letter);
            console.log(`Member ${index + 1} Active Student Letter File:`, member.active_student_letter.name);
          }
          if (member.photo) {
            formDataToSend.append(`member${index + 1}_photo`, member.photo);
            console.log(`Member ${index + 1} Photo File:`, member.photo.name);
          }
        }
      });

      console.log("Submitting to:", `${process.env.NEXT_PUBLIC_BASE_URL}/teams/cic/new`);
      Array.from(formDataToSend.entries()).forEach(([key, value]) => {
        console.log(`FormData Entry - ${key}:`, value);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/teams/cic/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

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
    } catch (error: any) {
      console.error("Submission Error:", error.message);
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
      console.log("Submission process completed. Loading state:", loading);
    }
  };

  const handleTeamInfoChange = (field: keyof FormData, value: string) => {
    console.log(`handleTeamInfoChange - Field: ${field}, Value: ${value}`);
    setFormData((prev) => ({
      ...prev,
      [field]: value || "",
    }));
  };

  const handleMemberChange = (
    type: "leader" | "member",
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    console.log(`handleMemberChange - Type: ${type}, Index: ${index}, Field: ${field}, Value: ${value}`);
    if (type === "leader") {
      setFormData((prev) => ({
        ...prev,
        leader: {
          ...prev.leader,
          [field]: value || "",
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.map((member, i) =>
          i === index ? { ...member, [field]: value || "" } : member
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
      setFileNames((prev) => ({
        ...prev,
        [field]: file.name,
      }));
      console.log(`Team File Updated - ${field}:`, file.name);
    } else if (type === "leader") {
      setFormData((prev) => ({
        ...prev,
        leader: {
          ...prev.leader,
          [field]: file,
        },
      }));
      setFileNames((prev) => ({
        ...prev,
        leader: {
          ...prev.leader,
          [field]: file.name,
        },
      }));
      console.log(`Leader File Updated - ${field}:`, file.name);
    } else if (type === "member" && index !== null) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.map((member, i) =>
          i === index ? { ...member, [field]: file } : member
        ),
      }));
      setFileNames((prev) => ({
        ...prev,
        members: prev.members.map((member, i) =>
          i === index ? { ...member, [field]: file.name } : member
        ),
      }));
      console.log(`Member ${index + 1} File Updated - ${field}:`, file.name);
    }
  };

  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) {
    console.log("User not authenticated. Rendering null.");
    return null;
  }

  const [activeTab, setActiveTab] = useState<"ketua" | "anggota1" | "anggota2" | "anggota3">("ketua");

  const handleTabChange = (tab: "ketua" | "anggota1" | "anggota2" | "anggota3") => {
    setActiveTab(tab);
    console.log("Active Tab Changed:", tab);
  };

  return (
    <div className="relative flex flex-col overflow-hidden max-w-5xl mx-auto font-openSans">
      <ToastContainer style={{ marginTop: "20px" }} />
      <div className="flex flex-col lg:justify-center items-center relative min-w-full">
        <div className="z-[10] min-h-screen flex flex-col">
          <div className="text-white mx-4 mt-[3%] lg:mb-[1%] md:text-base lg:text-xl text-[0.7rem]">
            <ol className="list-decimal pl-2">
              {formInstructionsCic.map((instruction, index) => (
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

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 font-openSans">
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
              label="Nama Perguruan Tinggi"
              type="text"
              name="institution_name"
              autoComplete="organization"
              value={formData.institution_name}
              onChange={(e) => handleTeamInfoChange("institution_name", e.target.value)}
              required
            />
            <FileInput
              label="Bukti Pembayaran"
              accept="application/pdf"
              name="payment_proof"
              onChange={(e) => handleFileChange("team", null, "payment_proof", e.target.files?.[0] || null)}
              required
              variant="cic"
              helperText="Format Penamaan: Bukti Pembayaran_Nama Tim"
              fileName={fileNames.payment_proof}
            />
            <FileInput
              label="Voucher"
              accept="application/pdf"
              name="voucher"
              onChange={(e) => handleFileChange("team", null, "voucher", e.target.files?.[0] || null)}
              variant="cic"
              helperText="Format Penamaan: Voucher_Nama Tim"
              fileName={fileNames.voucher}
            />

            <div className="w-full mt-[3%]">
              <div className="border-2 rounded-lg">
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
                  <div
                    className={`flex-1 text-center py-2 text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                      activeTab === "anggota3" ? "bg-white text-black" : "text-white"
                    }`}
                    onClick={() => handleTabChange("anggota3")}
                  >
                    <p>Anggota 3</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 p-4">
                  {activeTab === "ketua" && (
                    <>
                      <Input
                        label="Nama Lengkap"
                        type="text"
                        name="leader_full_name"
                        autoComplete="name"
                        value={formData.leader.full_name}
                        onChange={(e) => handleMemberChange("leader", 0, "full_name", e.target.value)}
                        required
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        name="leader_department"
                        autoComplete="off"
                        value={formData.leader.department}
                        onChange={(e) => handleMemberChange("leader", 0, "department", e.target.value)}
                        helperText="Ketua wajib berasal dari teknik sipil"
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        name="leader_batch"
                        autoComplete="off"
                        value={formData.leader.batch}
                        onChange={(e) => handleMemberChange("leader", 0, "batch", e.target.value)}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        name="leader_email"
                        autoComplete="email"
                        value={formData.leader.email}
                        onChange={(e) => handleMemberChange("leader", 0, "email", e.target.value)}
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        name="leader_phone_number"
                        autoComplete="tel"
                        value={formData.leader.phone_number}
                        onChange={(e) => handleMemberChange("leader", 0, "phone_number", e.target.value)}
                        required
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        name="leader_line_id"
                        autoComplete="off"
                        value={formData.leader.line_id}
                        onChange={(e) => handleMemberChange("leader", 0, "line_id", e.target.value)}
                        required
                      />
                      <Input
                        label="Link Upload Twibbon dan Poster"
                        type="text"
                        name="leader_twibbon_and_poster_link"
                        autoComplete="url"
                        value={formData.leader.twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("leader", 0, "twibbon_and_poster_link", e.target.value)
                        }
                        helperText="Peserta harap tidak menggunakan private account"
                        required
                      />
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="application/pdf"
                        name="leader_ktm"
                        onChange={(e) => handleFileChange("leader", 0, "ktm", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Lengkap"
                        fileName={fileNames.leader.ktm}
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="application/pdf"
                        name="leader_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("leader", 0, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="cic"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                        fileName={fileNames.leader.active_student_letter}
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        name="leader_photo"
                        onChange={(e) => handleFileChange("leader", 0, "photo", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: Foto_Nama Tim_Nama Lengkap"
                        fileName={fileNames.leader.photo}
                      />
                    </>
                  )}

                  {activeTab === "anggota1" && (
                    <>
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
                        label="Jurusan"
                        type="text"
                        name="member0_department"
                        autoComplete="off"
                        value={formData.members[0].department}
                        onChange={(e) => handleMemberChange("member", 0, "department", e.target.value)}
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        name="member0_batch"
                        autoComplete="off"
                        value={formData.members[0].batch}
                        onChange={(e) => handleMemberChange("member", 0, "batch", e.target.value)}
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
                        label="Link Upload Twibbon dan Poster"
                        type="text"
                        name="member0_twibbon_and_poster_link"
                        autoComplete="url"
                        value={formData.members[0].twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("member", 0, "twibbon_and_poster_link", e.target.value)
                        }
                        helperText="Peserta harap tidak menggunakan private account"
                        required
                      />
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="application/pdf"
                        name="member0_ktm"
                        onChange={(e) => handleFileChange("member", 0, "ktm", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[0].ktm}
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="application/pdf"
                        name="member0_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("member", 0, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="cic"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[0].active_student_letter}
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        name="member0_photo"
                        onChange={(e) => handleFileChange("member", 0, "photo", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: Foto_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[0].photo}
                      />
                    </>
                  )}

                  {activeTab === "anggota2" && (
                    <>
                      <Input
                        label="Nama Lengkap"
                        type="text"
                        name="member1_full_name"
                        autoComplete="name"
                        value={formData.members[1].full_name}
                        onChange={(e) => handleMemberChange("member", 1, "full_name", e.target.value)}
                        required
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        name="member1_department"
                        autoComplete="off"
                        value={formData.members[1].department}
                        onChange={(e) => handleMemberChange("member", 1, "department", e.target.value)}
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        name="member1_batch"
                        autoComplete="off"
                        value={formData.members[1].batch}
                        onChange={(e) => handleMemberChange("member", 1, "batch", e.target.value)}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        name="member1_email"
                        autoComplete="email"
                        value={formData.members[1].email}
                        onChange={(e) => handleMemberChange("member", 1, "email", e.target.value)}
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        name="member1_phone_number"
                        autoComplete="tel"
                        value={formData.members[1].phone_number}
                        onChange={(e) => handleMemberChange("member", 1, "phone_number", e.target.value)}
                        required
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        name="member1_line_id"
                        autoComplete="off"
                        value={formData.members[1].line_id}
                        onChange={(e) => handleMemberChange("member", 1, "line_id", e.target.value)}
                        required
                      />
                      <Input
                        label="Link Upload Twibbon dan Poster"
                        type="text"
                        name="member1_twibbon_and_poster_link"
                        autoComplete="url"
                        value={formData.members[1].twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("member", 1, "twibbon_and_poster_link", e.target.value)
                        }
                        helperText="Peserta harap tidak menggunakan private account"
                        required
                      />
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="application/pdf"
                        name="member1_ktm"
                        onChange={(e) => handleFileChange("member", 1, "ktm", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[1].ktm}
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="application/pdf"
                        name="member1_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("member", 1, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="cic"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[1].active_student_letter}
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        name="member1_photo"
                        onChange={(e) => handleFileChange("member", 1, "photo", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: Foto_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[1].photo}
                      />
                    </>
                  )}

                  {activeTab === "anggota3" && (
                    <>
                      <Input
                        label="Nama Lengkap"
                        type="text"
                        name="member2_full_name"
                        autoComplete="name"
                        value={formData.members[2].full_name}
                        onChange={(e) => handleMemberChange("member", 2, "full_name", e.target.value)}
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        name="member2_department"
                        autoComplete="off"
                        value={formData.members[2].department}
                        onChange={(e) => handleMemberChange("member", 2, "department", e.target.value)}
                      />
                      <Input
                        label="Semester"
                        type="text"
                        name="member2_batch"
                        autoComplete="off"
                        value={formData.members[2].batch}
                        onChange={(e) => handleMemberChange("member", 2, "batch", e.target.value)}
                      />
                      <Input
                        label="Email"
                        type="email"
                        name="member2_email"
                        autoComplete="email"
                        value={formData.members[2].email}
                        onChange={(e) => handleMemberChange("member", 2, "email", e.target.value)}
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        name="member2_phone_number"
                        autoComplete="tel"
                        value={formData.members[2].phone_number}
                        onChange={(e) => handleMemberChange("member", 2, "phone_number", e.target.value)}
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        name="member2_line_id"
                        autoComplete="off"
                        value={formData.members[2].line_id}
                        onChange={(e) => handleMemberChange("member", 2, "line_id", e.target.value)}
                      />
                      <Input
                        label="Link Upload Twibbon dan Poster"
                        type="text"
                        name="member2_twibbon_and_poster_link"
                        autoComplete="url"
                        value={formData.members[2].twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("member", 2, "twibbon_and_poster_link", e.target.value)
                        }
                        helperText="Peserta harap tidak menggunakan private account"
                      />
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="application/pdf"
                        name="member2_ktm"
                        onChange={(e) => handleFileChange("member", 2, "ktm", e.target.files?.[0] || null)}
                        variant="cic"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[2].ktm}
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="application/pdf"
                        name="member2_active_student_letter"
                        onChange={(e) =>
                          handleFileChange("member", 2, "active_student_letter", e.target.files?.[0] || null)
                        }
                        variant="cic"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[2].active_student_letter}
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        name="member2_photo"
                        onChange={(e) => handleFileChange("member", 2, "photo", e.target.files?.[0] || null)}
                        variant="cic"
                        helperText="Format Penamaan: Foto_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[2].photo}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center w-full mt-4 p-2">
              <Button
                variant="cic-primary"
                type="submit"
                disabled={loading}
                onClick={() => console.log("Submit button clicked")}
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