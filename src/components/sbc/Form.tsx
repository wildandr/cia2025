"use client";
import React, { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructions } from "@/data/formInstructionsSbc";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    team_name: "",
    institution_name: "",
    user_id: user?.id || 1, // Default to 1 if user.id is not available
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
    const errors: string[] = [];
    const maxFileSize = 500 * 1024; // 500KB in bytes

    // Helper function to check file size
    const checkFileSize = (file: File | undefined, fileLabel: string) => {
      if (file && file.size > maxFileSize) {
        errors.push(`${fileLabel} melebihi ukuran maksimum 500KB`);
      }
    };

    // Check for missing required files
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

    // Check file sizes for all uploaded files
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

      // Prepare the team data
      const teamData = {
        team_name: formData.team_name,
        institution_name: formData.institution_name,
        user_id: formData.user_id || 1,
        email: formData.email,
      };

      // Prepare the leader data (excluding files)
      const leaderData = {
        full_name: formData.leader.full_name,
        nim: formData.leader.nim,
        batch: formData.leader.batch,
        phone_number: formData.leader.phone_number,
        line_id: formData.leader.line_id,
        email: formData.leader.email,
        twibbon_and_poster_link: formData.leader.twibbon_and_poster_link,
      };

      // Prepare the members data (excluding files)
      const membersData = formData.members.map((member) => ({
        full_name: member.full_name,
        nim: member.nim,
        batch: member.batch,
        phone_number: member.phone_number,
        line_id: member.line_id,
        email: member.email,
        twibbon_and_poster_link: member.twibbon_and_poster_link,
      }));

      // Prepare the dosbim data (excluding files)
      const dosbimData = {
        full_name: formData.dosbim.full_name,
        nip: formData.dosbim.nip,
        email: formData.dosbim.email,
        phone_number: formData.dosbim.phone_number,
      };

      // Prepare the SBC data
      const sbcData = {
        bridge_name: formData.bridge_name,
      };

      // Combine all data into a single object
      const combinedData = {
        team: teamData,
        leader: leaderData,
        members: membersData,
        dosbim: [dosbimData], // Wrap in array as per the data structure
        sbc: [sbcData], // Wrap in array as per the data structure
      };

      // Log the data being sent
      console.log("Combined Data:", combinedData);

      // Create FormData object
      const formDataToSend = new FormData();

      // Append the combined data as a JSON string under the 'data' key
      formDataToSend.append("data", JSON.stringify(combinedData));

      // Append team files
      if (formData.payment_proof) {
        formDataToSend.append("payment_proof", formData.payment_proof);
        console.log("Payment Proof File:", formData.payment_proof.name);
      }
      if (formData.voucher) {
        formDataToSend.append("voucher", formData.voucher);
        console.log("Voucher File:", formData.voucher.name);
      }

      // Append leader files
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

      // Append member files
      formData.members.forEach((member, index) => {
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
      });

      // Append dosbim files
      if (formData.dosbim.photo) {
        formDataToSend.append("dosbim_photo", formData.dosbim.photo);
        console.log("Dosen Pembimbing Photo File:", formData.dosbim.photo.name);
      }

      // Log the FormData contents (for debugging)
      console.log("Submitting to:", `${process.env.NEXT_PUBLIC_BASE_URL}/teams/sbc/new`);
      Array.from(formDataToSend.entries()).forEach(([key, value]) => {
        console.log(`FormData Entry - ${key}:`, value);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/teams/sbc/new`, {
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(`Team Info Updated - ${field}:`, value);
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
      console.log(`Leader Updated - ${field}:`, value);
    } else if (type === "member" && index !== null) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.map((member, i) =>
          i === index ? { ...member, [field]: value } : member
        ),
      }));
      console.log(`Member ${index + 1} Updated - ${field}:`, value);
    } else if (type === "dosbim") {
      setFormData((prev) => ({
        ...prev,
        dosbim: {
          ...prev.dosbim,
          [field]: value,
        },
      }));
      console.log(`Dosen Pembimbing Updated - ${field}:`, value);
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
      console.log(`Team File Updated - ${field}:`, file.name);
    } else if (type === "leader") {
      setFormData((prev) => ({
        ...prev,
        leader: {
          ...prev.leader,
          [field]: file,
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
      console.log(`Member ${index + 1} File Updated - ${field}:`, file.name);
    } else if (type === "dosbim") {
      setFormData((prev) => ({
        ...prev,
        dosbim: {
          ...prev.dosbim,
          [field]: file,
        },
      }));
      console.log(`Dosen Pembimbing File Updated - ${field}:`, file.name);
    }
  };

  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) {
    console.log("User not authenticated. Rendering null.");
    return null;
  }

  const [activeTab, setActiveTab] = useState<"ketua" | "anggota1" | "anggota2" | "dosbim">("ketua");

  const handleTabChange = (tab: "ketua" | "anggota1" | "anggota2" | "dosbim") => {
    setActiveTab(tab);
    console.log("Active Tab Changed:", tab);
  };

  return (
    <div className="relative flex flex-col overflow-hidden max-w-5xl mx-auto font-openSans">
      <ToastContainer style={{ marginTop: "20px" }} />
      <div className="flex flex-col lg:justify-center items-center relative min-w-full">
        <div className="z-[10] min-h-screen flex flex-col">
          {/* Instructions */}
          <div className="text-white mx-4 mt-[3%] lg:mb-[1%] md:text-base lg:text-xl text-[0.7rem]">
            <ol className="list-decimal pl-2">
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
              value={formData.email}
              onChange={(e) => handleTeamInfoChange("email", e.target.value)}
              placeholder="Email anda"
              required
            />
            <Input
              label="Nama Tim"
              type="text"
              value={formData.team_name}
              onChange={(e) => handleTeamInfoChange("team_name", e.target.value)}
              placeholder="Nama tim anda"
              required
            />
            <Input
              label="Nama Perguruan Tinggi"
              type="text"
              value={formData.institution_name}
              onChange={(e) => handleTeamInfoChange("institution_name", e.target.value)}
              placeholder="Nama perguruan tinggi anda"
              required
            />
            <Input
              label="Nama Jembatan"
              type="text"
              value={formData.bridge_name}
              onChange={(e) => handleTeamInfoChange("bridge_name", e.target.value)}
              placeholder="Nama jembatan anda"
              required
            />
            <FileInput
              label="Bukti Pembayaran"
              accept="image/*"
              onChange={(e) => handleFileChange("team", null, "payment_proof", e.target.files?.[0] || null)}
              required
              helperText="Format Penamaan: Bukti Pembayaran_Nama Tim"
            />
            <FileInput
              label="Bukti Voucher"
              accept="image/*"
              onChange={(e) => handleFileChange("team", null, "voucher", e.target.files?.[0] || null)}
              helperText="Format Penamaan: Bukti Voucher_Nama Tim"
            />

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
                    className={`flex-1 text-center py-2 text-[10px] md:text-sm rounded-tr-md lg:text-lg cursor-pointer ${
                      activeTab === "dosbim" ? "bg-white text-black" : "text-white"
                    }`}
                    onClick={() => handleTabChange("dosbim")}
                  >
                    <p>Dosen Pembimbing</p>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex flex-col gap-4 p-4">
                  {activeTab === "ketua" && (
                    <>
                      <Input
                        label="Nama Lengkap"
                        type="text"
                        value={formData.leader.full_name}
                        onChange={(e) => handleMemberChange("leader", null, "full_name", e.target.value)}
                        placeholder="Nama lengkap ketua tim"
                        required
                      />
                      <Input
                        label="NIM"
                        type="text"
                        value={formData.leader.nim}
                        onChange={(e) => handleMemberChange("leader", null, "nim", e.target.value)}
                        placeholder="Masukkan NIM ketua tim"
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.leader.batch}
                        onChange={(e) => handleMemberChange("leader", null, "batch", e.target.value)}
                        placeholder="Masukkan semester ketua tim"
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.leader.email}
                        onChange={(e) => handleMemberChange("leader", null, "email", e.target.value)}
                        placeholder="Masukkan email ketua tim"
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.leader.phone_number}
                        onChange={(e) => handleMemberChange("leader", null, "phone_number", e.target.value)}
                        placeholder="Masukkan nomor whatsapp ketua tim"
                        required
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        value={formData.leader.line_id}
                        onChange={(e) => handleMemberChange("leader", null, "line_id", e.target.value)}
                        placeholder="Masukkan ID Line ketua tim"
                        required
                      />
                      <Input
                        label="Link Bukti Upload Twibbon"
                        type="text"
                        value={formData.leader.twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("leader", null, "twibbon_and_poster_link", e.target.value)
                        }
                        placeholder="Masukkan link bukti upload twibbon ketua tim"
                        required
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange("leader", null, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Peserta"
                      />
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="image/*"
                        onChange={(e) => handleFileChange("leader", null, "ktm", e.target.files?.[0] || null)}
                        required
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        onChange={(e) => handleFileChange("leader", null, "photo", e.target.files?.[0] || null)}
                        required
                        helperText="Format Penamaan: Pasfoto_Nama Tim_Nama Peserta"
                      />
                    </>
                  )}

                  {activeTab === "anggota1" && (
                    <>
                      <Input
                        label="Nama Lengkap"
                        type="text"
                        value={formData.members[0].full_name}
                        onChange={(e) => handleMemberChange("member", 0, "full_name", e.target.value)}
                        placeholder="Nama lengkap Anggota 1"
                        required
                      />
                      <Input
                        label="NIM"
                        type="text"
                        value={formData.members[0].nim}
                        onChange={(e) => handleMemberChange("member", 0, "nim", e.target.value)}
                        placeholder="Masukkan NIM Anggota 1"
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.members[0].batch}
                        onChange={(e) => handleMemberChange("member", 0, "batch", e.target.value)}
                        placeholder="Masukkan semester Anggota 1"
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.members[0].email}
                        onChange={(e) => handleMemberChange("member", 0, "email", e.target.value)}
                        placeholder="Masukkan email Anggota 1"
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.members[0].phone_number}
                        onChange={(e) => handleMemberChange("member", 0, "phone_number", e.target.value)}
                        placeholder="Masukkan nomor whatsapp Anggota 1"
                        required
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        value={formData.members[0].line_id}
                        onChange={(e) => handleMemberChange("member", 0, "line_id", e.target.value)}
                        placeholder="Masukkan ID Line Anggota 1"
                        required
                      />
                      <Input
                        label="Link Bukti Upload Twibbon"
                        type="text"
                        value={formData.members[0].twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("member", 0, "twibbon_and_poster_link", e.target.value)
                        }
                        placeholder="Masukkan link bukti upload twibbon Anggota 1"
                        required
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange("member", 0, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Peserta"
                      />
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="image/*"
                        onChange={(e) => handleFileChange("member", 0, "ktm", e.target.files?.[0] || null)}
                        required
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        onChange={(e) => handleFileChange("member", 0, "photo", e.target.files?.[0] || null)}
                        required
                        helperText="Format Penamaan: Pasfoto_Nama Tim_Nama Peserta"
                      />
                    </>
                  )}

                  {activeTab === "anggota2" && (
                    <>
                      <Input
                        label="Nama Lengkap"
                        type="text"
                        value={formData.members[1].full_name}
                        onChange={(e) => handleMemberChange("member", 1, "full_name", e.target.value)}
                        placeholder="Nama lengkap Anggota 2"
                        required
                      />
                      <Input
                        label="NIM"
                        type="text"
                        value={formData.members[1].nim}
                        onChange={(e) => handleMemberChange("member", 1, "nim", e.target.value)}
                        placeholder="Masukkan NIM Anggota 2"
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.members[1].batch}
                        onChange={(e) => handleMemberChange("member", 1, "batch", e.target.value)}
                        placeholder="Masukkan semester Anggota 2"
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.members[1].email}
                        onChange={(e) => handleMemberChange("member", 1, "email", e.target.value)}
                        placeholder="Masukkan email Anggota 2"
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.members[1].phone_number}
                        onChange={(e) => handleMemberChange("member", 1, "phone_number", e.target.value)}
                        placeholder="Masukkan nomor whatsapp Anggota 2"
                        required
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        value={formData.members[1].line_id}
                        onChange={(e) => handleMemberChange("member", 1, "line_id", e.target.value)}
                        placeholder="Masukkan ID Line Anggota 2"
                        required
                      />
                      <Input
                        label="Link Bukti Upload Twibbon"
                        type="text"
                        value={formData.members[1].twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("member", 1, "twibbon_and_poster_link", e.target.value)
                        }
                        placeholder="Masukkan link bukti upload twibbon Anggota 2"
                        required
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange("member", 1, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Peserta"
                      />
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="image/*"
                        onChange={(e) => handleFileChange("member", 1, "ktm", e.target.files?.[0] || null)}
                        required
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        onChange={(e) => handleFileChange("member", 1, "photo", e.target.files?.[0] || null)}
                        required
                        helperText="Format Penamaan: Pasfoto_Nama Tim_Nama Peserta"
                      />
                    </>
                  )}

                  {activeTab === "dosbim" && (
                    <>
                      <Input
                        label="Nama Lengkap"
                        type="text"
                        value={formData.dosbim.full_name}
                        onChange={(e) => handleMemberChange("dosbim", null, "full_name", e.target.value)}
                        placeholder="Nama lengkap dosen pembimbing"
                        required
                      />
                      <Input
                        label="NIP"
                        type="text"
                        value={formData.dosbim.nip}
                        onChange={(e) => handleMemberChange("dosbim", null, "nip", e.target.value)}
                        placeholder="Masukkan NIP dosen pembimbing"
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.dosbim.email}
                        onChange={(e) => handleMemberChange("dosbim", null, "email", e.target.value)}
                        placeholder="Masukkan email dosen pembimbing"
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.dosbim.phone_number}
                        onChange={(e) => handleMemberChange("dosbim", null, "phone_number", e.target.value)}
                        placeholder="Masukkan nomor whatsapp dosen pembimbing"
                        required
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        onChange={(e) => handleFileChange("dosbim", null, "photo", e.target.files?.[0] || null)}
                        required
                        helperText="Format Penamaan: Pasfoto_Nama Tim_Nama Dosen Pembimbing"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full mt-4 p-2">
              <Button
                variant="sbc-primary"
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