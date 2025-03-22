"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructionsCic } from "@/data/formInstructionsCic";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod"; // Import Zod for URL validation

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
  const router = useRouter(); // Initialize useRouter for redirection
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

  // State to track file names for display
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

  // Regex for validation
  const alphabeticOnlyRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
  const numericOnlyRegex = /^\d+$/; // Allows only numbers

  // Zod schema for URL validation
  const urlSchema = z.string().url("Link Upload Twibbon dan Poster harus berupa URL yang valid");

  const validateTextFields = () => {
    const errors: string[] = [];

    // Validate Team Info
    if (!formData.team_name.trim()) {
      errors.push("Nama Tim wajib diisi");
    }
    if (!formData.institution_name.trim()) {
      errors.push("Nama Perguruan Tinggi wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.institution_name.trim())) {
      errors.push("Nama Perguruan Tinggi hanya boleh berisi huruf dan spasi");
    }
    if (!formData.email.trim()) {
      errors.push("Email wajib diisi");
    }

    // Validate Leader
    if (!formData.leader.full_name.trim()) {
      errors.push("Nama Lengkap Ketua wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.leader.full_name.trim())) {
      errors.push("Nama Lengkap Ketua hanya boleh berisi huruf dan spasi");
    }
    if (!formData.leader.department.trim()) {
      errors.push("Jurusan Ketua wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.leader.department.trim())) {
      errors.push("Jurusan Ketua hanya boleh berisi huruf dan spasi");
    }
    if (!formData.leader.batch.trim()) {
      errors.push("Semester Ketua wajib diisi");
    } else if (!numericOnlyRegex.test(formData.leader.batch.trim())) {
      errors.push("Semester Ketua hanya boleh berisi angka");
    }
    if (!formData.leader.email.trim()) {
      errors.push("Email Ketua wajib diisi");
    }
    if (!formData.leader.phone_number.trim()) {
      errors.push("Nomor Whatsapp Ketua wajib diisi");
    } else if (!numericOnlyRegex.test(formData.leader.phone_number.trim())) {
      errors.push("Nomor Whatsapp Ketua hanya boleh berisi angka");
    }
    if (!formData.leader.line_id.trim()) {
      errors.push("ID Line Ketua wajib diisi");
    }
    if (!formData.leader.twibbon_and_poster_link.trim()) {
      errors.push("Link Upload Twibbon dan Poster Ketua wajib diisi");
    } else {
      try {
        urlSchema.parse(formData.leader.twibbon_and_poster_link.trim());
      } catch (error) {
        errors.push("Link Upload Twibbon dan Poster Ketua harus berupa URL yang valid");
      }
    }

    // Validate Members
    const activeMembers = formData.members.filter(
      (member) => member.full_name || member.email || member.department
    ).length;

    console.log("Active Members Count:", activeMembers);

    if (activeMembers < 2) {
      errors.push("Minimal 2 anggota (Anggota 1 dan Anggota 2) wajib diisi");
    }

    // Member 1
    if (!formData.members[0].full_name.trim()) {
      errors.push("Nama Lengkap Anggota 1 wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.members[0].full_name.trim())) {
      errors.push("Nama Lengkap Anggota 1 hanya boleh berisi huruf dan spasi");
    }
    if (!formData.members[0].department.trim()) {
      errors.push("Jurusan Anggota 1 wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.members[0].department.trim())) {
      errors.push("Jurusan Anggota 1 hanya boleh berisi huruf dan spasi");
    }
    if (!formData.members[0].batch.trim()) {
      errors.push("Semester Anggota 1 wajib diisi");
    } else if (!numericOnlyRegex.test(formData.members[0].batch.trim())) {
      errors.push("Semester Anggota 1 hanya boleh berisi angka");
    }
    if (!formData.members[0].email.trim()) {
      errors.push("Email Anggota 1 wajib diisi");
    }
    if (!formData.members[0].phone_number.trim()) {
      errors.push("Nomor Whatsapp Anggota 1 wajib diisi");
    } else if (!numericOnlyRegex.test(formData.members[0].phone_number.trim())) {
      errors.push("Nomor Whatsapp Anggota 1 hanya boleh berisi angka");
    }
    if (!formData.members[0].line_id.trim()) {
      errors.push("ID Line Anggota 1 wajib diisi");
    }
    if (!formData.members[0].twibbon_and_poster_link.trim()) {
      errors.push("Link Upload Twibbon dan Poster Anggota 1 wajib diisi");
    } else {
      try {
        urlSchema.parse(formData.members[0].twibbon_and_poster_link.trim());
      } catch (error) {
        errors.push("Link Upload Twibbon dan Poster Anggota 1 harus berupa URL yang valid");
      }
    }

    // Member 2
    if (!formData.members[1].full_name.trim()) {
      errors.push("Nama Lengkap Anggota 2 wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.members[1].full_name.trim())) {
      errors.push("Nama Lengkap Anggota 2 hanya boleh berisi huruf dan spasi");
    }
    if (!formData.members[1].department.trim()) {
      errors.push("Jurusan Anggota 2 wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.members[1].department.trim())) {
      errors.push("Jurusan Anggota 2 hanya boleh berisi huruf dan spasi");
    }
    if (!formData.members[1].batch.trim()) {
      errors.push("Semester Anggota 2 wajib diisi");
    } else if (!numericOnlyRegex.test(formData.members[1].batch.trim())) {
      errors.push("Semester Anggota 2 hanya boleh berisi angka");
    }
    if (!formData.members[1].email.trim()) {
      errors.push("Email Anggota 2 wajib diisi");
    }
    if (!formData.members[1].phone_number.trim()) {
      errors.push("Nomor Whatsapp Anggota 2 wajib diisi");
    } else if (!numericOnlyRegex.test(formData.members[1].phone_number.trim())) {
      errors.push("Nomor Whatsapp Anggota 2 hanya boleh berisi angka");
    }
    if (!formData.members[1].line_id.trim()) {
      errors.push("ID Line Anggota 2 wajib diisi");
    }
    if (!formData.members[1].twibbon_and_poster_link.trim()) {
      errors.push("Link Upload Twibbon dan Poster Anggota 2 wajib diisi");
    } else {
      try {
        urlSchema.parse(formData.members[1].twibbon_and_poster_link.trim());
      } catch (error) {
        errors.push("Link Upload Twibbon dan Poster Anggota 2 harus berupa URL yang valid");
      }
    }

    // Member 3 (if active)
    if (activeMembers >= 3) {
      if (!formData.members[2].full_name.trim()) {
        errors.push("Nama Lengkap Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      } else if (!alphabeticOnlyRegex.test(formData.members[2].full_name.trim())) {
        errors.push("Nama Lengkap Anggota 3 hanya boleh berisi huruf dan spasi");
      }
      if (!formData.members[2].department.trim()) {
        errors.push("Jurusan Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      } else if (!alphabeticOnlyRegex.test(formData.members[2].department.trim())) {
        errors.push("Jurusan Anggota 3 hanya boleh berisi huruf dan spasi");
      }
      if (!formData.members[2].batch.trim()) {
        errors.push("Semester Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      } else if (!numericOnlyRegex.test(formData.members[2].batch.trim())) {
        errors.push("Semester Anggota 3 hanya boleh berisi angka");
      }
      if (!formData.members[2].email.trim()) {
        errors.push("Email Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      }
      if (!formData.members[2].phone_number.trim()) {
        errors.push("Nomor Whatsapp Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      } else if (!numericOnlyRegex.test(formData.members[2].phone_number.trim())) {
        errors.push("Nomor Whatsapp Anggota 3 hanya boleh berisi angka");
      }
      if (!formData.members[2].line_id.trim()) {
        errors.push("ID Line Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      }
      if (!formData.members[2].twibbon_and_poster_link.trim()) {
        errors.push("Link Upload Twibbon dan Poster Anggota 3 wajib diisi (karena beberapa data sudah diisi)");
      } else {
        try {
          urlSchema.parse(formData.members[2].twibbon_and_poster_link.trim());
        } catch (error) {
          errors.push("Link Upload Twibbon dan Poster Anggota 3 harus berupa URL yang valid");
        }
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

    // Helper function to check file size
    const checkFileSize = (file: File | undefined, fileLabel: string) => {
      if (file && file.size > maxFileSize) {
        errors.push(`${fileLabel} melebihi ukuran maksimum 500KB`);
      }
    };

    // Check for missing required files
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

    // Check file sizes for all uploaded files
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

      // Prepare the team data
      const teamData = {
        team_name: formData.team_name,
        institution_name: formData.institution_name,
        user_id: formData.user_id || 1,
        email: formData.email,
      };

      // Log the user_id explicitly for debugging
      console.log("User ID being sent:", teamData.user_id);

      // Prepare the leader data (excluding files)
      const leaderData = {
        full_name: formData.leader.full_name,
        department: formData.leader.department,
        batch: formData.leader.batch,
        phone_number: formData.leader.phone_number,
        line_id: formData.leader.line_id,
        email: formData.leader.email,
        twibbon_and_poster_link: formData.leader.twibbon_and_poster_link,
      };

      // Prepare the members data (excluding files)
      const membersData = formData.members.map((member) => ({
        full_name: member.full_name,
        department: member.department,
        batch: member.batch,
        phone_number: member.phone_number,
        line_id: member.line_id,
        email: member.email,
        twibbon_and_poster_link: member.twibbon_and_poster_link,
      }));

      // Combine team, leader, and members into a single data object
      const combinedData = {
        team: teamData,
        leader: leaderData,
        members: membersData,
      };

      // Log the data being sent
      console.log("Combined Data:", combinedData);

      // Create FormData object
      const formDataToSend = new FormData();

      // Append the combined data as a single JSON string under the 'data' key
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

      // Append leader files with updated naming
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

      // Append member files with updated naming
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

      // Log the FormData contents (for debugging)
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
        autoClose: 2000, // Shorten autoClose to redirect sooner
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          router.push("/dashboard"); // Redirect to /dashboard after toast closes
        },
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
    type: "leader" | "member",
    index: number,
    field: keyof TeamMember,
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
    } else {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.map((member, i) =>
          i === index ? { ...member, [field]: value } : member
        ),
      }));
      console.log(`Member ${index + 1} Updated - ${field}:`, value);
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
          {/* Instructions */}
          <div className="text-white mx-4 mt-[3%] lg:mb-[1%] md:text-base lg:text-xl text-[0.7rem]">
            <ol className="list-decimal pl-2">
              {formInstructionsCic.map((instruction, index) => (
                <li key={index} className="mb-1 whitespace-pre-line">
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
              required
            />
            <Input
              label="Nama Tim"
              type="text"
              value={formData.team_name}
              onChange={(e) => handleTeamInfoChange("team_name", e.target.value)}
              required
            />
            <Input
              label="Nama Perguruan Tinggi"
              type="text"
              value={formData.institution_name}
              onChange={(e) => handleTeamInfoChange("institution_name", e.target.value)}
              required
            />
            <FileInput
              label="Bukti Pembayaran"
              accept="application/pdf"
              onChange={(e) => handleFileChange("team", null, "payment_proof", e.target.files?.[0] || null)}
              required
              variant="cic"
              helperText="Format Penamaan: Bukti Pembayaran_Nama Tim"
              fileName={fileNames.payment_proof} // Pass the file name for display
            />
            <FileInput
              label="Voucher"
              accept="application/pdf"
              onChange={(e) => handleFileChange("team", null, "voucher", e.target.files?.[0] || null)}
              variant="cic"
              helperText="Format Penamaan: Voucher_Nama Tim"
              fileName={fileNames.voucher} // Pass the file name for display
            />

            {/* Tabs Section */}
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

                {/* Tab Content */}
                <div className="flex flex-col gap-4 p-4">
                  {activeTab === "ketua" && (
                    <>
                      <Input
                        label="Nama Lengkap"
                        type="text"
                        value={formData.leader.full_name}
                        onChange={(e) => handleMemberChange("leader", 0, "full_name", e.target.value)}
                        required
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        value={formData.leader.department}
                        onChange={(e) => handleMemberChange("leader", 0, "department", e.target.value)}
                        helperText="Ketua wajib berasal dari teknik sipil"
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.leader.batch}
                        onChange={(e) => handleMemberChange("leader", 0, "batch", e.target.value)}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.leader.email}
                        onChange={(e) => handleMemberChange("leader", 0, "email", e.target.value)}
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.leader.phone_number}
                        onChange={(e) => handleMemberChange("leader", 0, "phone_number", e.target.value)}
                        required
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        value={formData.leader.line_id}
                        onChange={(e) => handleMemberChange("leader", 0, "line_id", e.target.value)}
                        required
                      />
                      <Input
                        label="Link Upload Twibbon dan Poster"
                        type="text"
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
                        onChange={(e) => handleFileChange("leader", 0, "ktm", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Lengkap"
                        fileName={fileNames.leader.ktm} // Pass the file name for display
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="application/pdf"
                        onChange={(e) =>
                          handleFileChange("leader", 0, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="cic"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                        fileName={fileNames.leader.active_student_letter} // Pass the file name for display
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        onChange={(e) => handleFileChange("leader", 0, "photo", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: Foto_Nama Tim_Nama Lengkap"
                        fileName={fileNames.leader.photo} // Pass the file name for display
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
                        required
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        value={formData.members[0].department}
                        onChange={(e) => handleMemberChange("member", 0, "department", e.target.value)}
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.members[0].batch}
                        onChange={(e) => handleMemberChange("member", 0, "batch", e.target.value)}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.members[0].email}
                        onChange={(e) => handleMemberChange("member", 0, "email", e.target.value)}
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.members[0].phone_number}
                        onChange={(e) => handleMemberChange("member", 0, "phone_number", e.target.value)}
                        required
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        value={formData.members[0].line_id}
                        onChange={(e) => handleMemberChange("member", 0, "line_id", e.target.value)}
                        required
                      />
                      <Input
                        label="Link Upload Twibbon dan Poster"
                        type="text"
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
                        onChange={(e) => handleFileChange("member", 0, "ktm", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[0].ktm} // Pass the file name for display
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="application/pdf"
                        onChange={(e) =>
                          handleFileChange("member", 0, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="cic"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[0].active_student_letter} // Pass the file name for display
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        onChange={(e) => handleFileChange("member", 0, "photo", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: Foto_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[0].photo} // Pass the file name for display
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
                        required
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        value={formData.members[1].department}
                        onChange={(e) => handleMemberChange("member", 1, "department", e.target.value)}
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.members[1].batch}
                        onChange={(e) => handleMemberChange("member", 1, "batch", e.target.value)}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.members[1].email}
                        onChange={(e) => handleMemberChange("member", 1, "email", e.target.value)}
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.members[1].phone_number}
                        onChange={(e) => handleMemberChange("member", 1, "phone_number", e.target.value)}
                        required
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        value={formData.members[1].line_id}
                        onChange={(e) => handleMemberChange("member", 1, "line_id", e.target.value)}
                        required
                      />
                      <Input
                        label="Link Upload Twibbon dan Poster"
                        type="text"
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
                        onChange={(e) => handleFileChange("member", 1, "ktm", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[1].ktm} // Pass the file name for display
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="application/pdf"
                        onChange={(e) =>
                          handleFileChange("member", 1, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="cic"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[1].active_student_letter} // Pass the file name for display
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        onChange={(e) => handleFileChange("member", 1, "photo", e.target.files?.[0] || null)}
                        required
                        variant="cic"
                        helperText="Format Penamaan: Foto_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[1].photo} // Pass the file name for display
                      />
                    </>
                  )}

                  {activeTab === "anggota3" && (
                    <>
                      <Input
                        label="Nama Lengkap"
                        type="text"
                        value={formData.members[2].full_name}
                        onChange={(e) => handleMemberChange("member", 2, "full_name", e.target.value)}
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        value={formData.members[2].department}
                        onChange={(e) => handleMemberChange("member", 2, "department", e.target.value)}
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.members[2].batch}
                        onChange={(e) => handleMemberChange("member", 2, "batch", e.target.value)}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.members[2].email}
                        onChange={(e) => handleMemberChange("member", 2, "email", e.target.value)}
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.members[2].phone_number}
                        onChange={(e) => handleMemberChange("member", 2, "phone_number", e.target.value)}
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        value={formData.members[2].line_id}
                        onChange={(e) => handleMemberChange("member", 2, "line_id", e.target.value)}
                      />
                      <Input
                        label="Link Upload Twibbon dan Poster"
                        type="text"
                        value={formData.members[2].twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("member", 2, "twibbon_and_poster_link", e.target.value)
                        }
                        helperText="Peserta harap tidak menggunakan private account"
                      />
                      <FileInput
                        label="Kartu Tanda Mahasiswa"
                        accept="application/pdf"
                        onChange={(e) => handleFileChange("member", 2, "ktm", e.target.files?.[0] || null)}
                        variant="cic"
                        helperText="Format Penamaan: KTM_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[2].ktm} // Pass the file name for display
                      />
                      <FileInput
                        label="Surat Keterangan Mahasiswa Aktif"
                        accept="application/pdf"
                        onChange={(e) =>
                          handleFileChange("member", 2, "active_student_letter", e.target.files?.[0] || null)
                        }
                        variant="cic"
                        helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[2].active_student_letter} // Pass the file name for display
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="image/*"
                        onChange={(e) => handleFileChange("member", 2, "photo", e.target.files?.[0] || null)}
                        variant="cic"
                        helperText="Format Penamaan: Foto_Nama Tim_Nama Lengkap"
                        fileName={fileNames.members[2].photo} // Pass the file name for display
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
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