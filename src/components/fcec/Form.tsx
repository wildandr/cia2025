"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructionsFcec } from "@/data/formInstructionsFcec";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

interface TeamMember {
  full_name: string;
  nim: string;
  batch: string;
  semester: string;
  department: string;
  phone_number: string;
  line_id: string;
  email: string;
  twibbon_and_poster_link: string;
  is_leader: number;
  identity_card?: File;
  active_student_letter?: File;
  photo?: File;
}

interface FcecData {
  abstract_title: string;
  abstract_video_link: string;
}

interface FormData {
  team_name: string;
  institution_name: string;
  user_id: number;
  email: string;
  payment_proof?: File;
  abstract_title: string;
  abstract_video_link: string;
  abstract_file?: File;
  originality_statement?: File;
  leader: TeamMember;
  members: TeamMember[];
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
    abstract_title: "",
    abstract_video_link: "",
    abstract_file: undefined,
    originality_statement: undefined,
    leader: {
      full_name: "",
      nim: "",
      batch: "",
      semester: "",
      department: "",
      phone_number: "",
      line_id: "",
      email: "",
      twibbon_and_poster_link: "",
      is_leader: 1,
      identity_card: undefined,
      active_student_letter: undefined,
      photo: undefined,
    },
    members: [
      {
        full_name: "",
        nim: "",
        batch: "",
        semester: "",
        department: "",
        phone_number: "",
        line_id: "",
        email: "",
        twibbon_and_poster_link: "",
        is_leader: 0,
        identity_card: undefined,
        active_student_letter: undefined,
        photo: undefined,
      },
      {
        full_name: "",
        nim: "",
        batch: "",
        semester: "",
        department: "",
        phone_number: "",
        line_id: "",
        email: "",
        twibbon_and_poster_link: "",
        is_leader: 0,
        identity_card: undefined,
        active_student_letter: undefined,
        photo: undefined,
      },
    ],
  });

  // State to track file names for display
  const [fileNames, setFileNames] = useState<{
    payment_proof?: string;
    abstract_file?: string;
    originality_statement?: string;
    leader: { identity_card?: string; active_student_letter?: string; photo?: string };
    members: Array<{ identity_card?: string; active_student_letter?: string; photo?: string }>;
  }>({
    payment_proof: undefined,
    abstract_file: undefined,
    originality_statement: undefined,
    leader: { identity_card: undefined, active_student_letter: undefined, photo: undefined },
    members: [
      { identity_card: undefined, active_student_letter: undefined, photo: undefined },
      { identity_card: undefined, active_student_letter: undefined, photo: undefined },
    ],
  });

  // Regex for validation
  const alphabeticOnlyRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
  const numericOnlyRegex = /^\d+$/; // Allows only numbers

  // Zod schema for URL validation
  const urlSchema = z.string().url("Link harus berupa URL yang valid");

  const validateTextFields = () => {
    const errors: string[] = [];

    // Validate Team Info
    if (!formData.team_name.trim()) {
      errors.push("Nama Tim wajib diisi");
    }
    if (!formData.institution_name.trim()) {
      errors.push("Asal Sekolah wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.institution_name.trim())) {
      errors.push("Asal Sekolah hanya boleh berisi huruf dan spasi");
    }
    if (!formData.email.trim()) {
      errors.push("Email wajib diisi");
    }
    if (!formData.abstract_title.trim()) {
      errors.push("Judul Abstrak wajib diisi");
    }
    if (!formData.abstract_video_link.trim()) {
      errors.push("Link Video Abstrak wajib diisi");
    } else {
      try {
        urlSchema.parse(formData.abstract_video_link.trim());
      } catch (error) {
        errors.push("Link Video Abstrak harus berupa URL yang valid");
      }
    }

    // Validate Leader
    if (!formData.leader.full_name.trim()) {
      errors.push("Nama Lengkap Ketua wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.leader.full_name.trim())) {
      errors.push("Nama Lengkap Ketua hanya boleh berisi huruf dan spasi");
    }
    if (!formData.leader.nim.trim()) {
      errors.push("NIM Ketua wajib diisi");
    }
    if (!formData.leader.batch.trim()) {
      errors.push("Angkatan Ketua wajib diisi");
    }
    if (!formData.leader.semester.trim()) {
      errors.push("Semester Ketua wajib diisi");
    } else if (!numericOnlyRegex.test(formData.leader.semester.trim())) {
      errors.push("Semester Ketua hanya boleh berisi angka");
    }
    if (!formData.leader.department.trim()) {
      errors.push("Jurusan Ketua wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.leader.department.trim())) {
      errors.push("Jurusan Ketua hanya boleh berisi huruf dan spasi");
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
      errors.push("Link Bukti Upload Twibbon Ketua wajib diisi");
    } else {
      try {
        urlSchema.parse(formData.leader.twibbon_and_poster_link.trim());
      } catch (error) {
        errors.push("Link Bukti Upload Twibbon Ketua harus berupa URL yang valid");
      }
    }

    // Validate Member 1
    if (!formData.members[0].full_name.trim()) {
      errors.push("Nama Lengkap Anggota 1 wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.members[0].full_name.trim())) {
      errors.push("Nama Lengkap Anggota 1 hanya boleh berisi huruf dan spasi");
    }
    if (!formData.members[0].nim.trim()) {
      errors.push("NIM Anggota 1 wajib diisi");
    }
    if (!formData.members[0].batch.trim()) {
      errors.push("Angkatan Anggota 1 wajib diisi");
    }
    if (!formData.members[0].semester.trim()) {
      errors.push("Semester Anggota 1 wajib diisi");
    } else if (!numericOnlyRegex.test(formData.members[0].semester.trim())) {
      errors.push("Semester Anggota 1 hanya boleh berisi angka");
    }
    if (!formData.members[0].department.trim()) {
      errors.push("Jurusan Anggota 1 wajib diisi");
    } else if (!alphabeticOnlyRegex.test(formData.members[0].department.trim())) {
      errors.push("Jurusan Anggota 1 hanya boleh berisi huruf dan spasi");
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
      errors.push("Link Bukti Upload Twibbon Anggota 1 wajib diisi");
    } else {
      try {
        urlSchema.parse(formData.members[0].twibbon_and_poster_link.trim());
      } catch (error) {
        errors.push("Link Bukti Upload Twibbon Anggota 1 harus berupa URL yang valid");
      }
    }

    // Validate Member 2 (optional, but if any field is filled, all must be filled)
    const member2Fields = [
      formData.members[1].full_name,
      formData.members[1].nim,
      formData.members[1].batch,
      formData.members[1].semester,
      formData.members[1].department,
      formData.members[1].email,
      formData.members[1].phone_number,
      formData.members[1].line_id,
      formData.members[1].twibbon_and_poster_link,
    ];
    const isMember2Filled = member2Fields.some((field) => field.trim() !== "");
    if (isMember2Filled) {
      if (!formData.members[1].full_name.trim()) {
        errors.push("Nama Lengkap Anggota 2 wajib diisi jika salah satu field diisi");
      } else if (!alphabeticOnlyRegex.test(formData.members[1].full_name.trim())) {
        errors.push("Nama Lengkap Anggota 2 hanya boleh berisi huruf dan spasi");
      }
      if (!formData.members[1].nim.trim()) {
        errors.push("NIM Anggota 2 wajib diisi jika salah satu field diisi");
      }
      if (!formData.members[1].batch.trim()) {
        errors.push("Angkatan Anggota 2 wajib diisi jika salah satu field diisi");
      }
      if (!formData.members[1].semester.trim()) {
        errors.push("Semester Anggota 2 wajib diisi jika salah satu field diisi");
      } else if (!numericOnlyRegex.test(formData.members[1].semester.trim())) {
        errors.push("Semester Anggota 2 hanya boleh berisi angka");
      }
      if (!formData.members[1].department.trim()) {
        errors.push("Jurusan Anggota 2 wajib diisi jika salah satu field diisi");
      } else if (!alphabeticOnlyRegex.test(formData.members[1].department.trim())) {
        errors.push("Jurusan Anggota 2 hanya boleh berisi huruf dan spasi");
      }
      if (!formData.members[1].email.trim()) {
        errors.push("Email Anggota 2 wajib diisi jika salah satu field diisi");
      }
      if (!formData.members[1].phone_number.trim()) {
        errors.push("Nomor Whatsapp Anggota 2 wajib diisi jika salah satu field diisi");
      } else if (!numericOnlyRegex.test(formData.members[1].phone_number.trim())) {
        errors.push("Nomor Whatsapp Anggota 2 hanya boleh berisi angka");
      }
      if (!formData.members[1].line_id.trim()) {
        errors.push("ID Line Anggota 2 wajib diisi jika salah satu field diisi");
      }
      if (!formData.members[1].twibbon_and_poster_link.trim()) {
        errors.push("Link Bukti Upload Twibbon Anggota 2 wajib diisi jika salah satu field diisi");
      } else {
        try {
          urlSchema.parse(formData.members[1].twibbon_and_poster_link.trim());
        } catch (error) {
          errors.push("Link Bukti Upload Twibbon Anggota 2 harus berupa URL yang valid");
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
    if (!formData.abstract_file) {
      errors.push("File Abstrak wajib diupload");
    }
    if (!formData.originality_statement) {
      errors.push("Surat Pernyataan Orisinalitas wajib diupload");
    }
    if (!formData.leader.identity_card) {
      errors.push("Kartu Tanda Pengenal Ketua Tim wajib diupload");
    }
    if (!formData.leader.active_student_letter) {
      errors.push("Surat Pernyataan Siswa Aktif Ketua Tim wajib diupload");
    }
    if (!formData.leader.photo) {
      errors.push("Pas Foto Ketua Tim wajib diupload");
    }
    if (!formData.members[0].identity_card) {
      errors.push("Kartu Tanda Pengenal Anggota 1 wajib diupload");
    }
    if (!formData.members[0].active_student_letter) {
      errors.push("Surat Pernyataan Siswa Aktif Anggota 1 wajib diupload");
    }
    if (!formData.members[0].photo) {
      errors.push("Pas Foto Anggota 1 wajib diupload");
    }

    // Validate Member 2 files if Member 2 is filled
    const isMember2Filled = formData.members[1].full_name.trim() !== "";
    if (isMember2Filled) {
      if (!formData.members[1].identity_card) {
        errors.push("Kartu Tanda Pengenal Anggota 2 wajib diupload jika data anggota diisi");
      }
      if (!formData.members[1].active_student_letter) {
        errors.push("Surat Pernyataan Siswa Aktif Anggota 2 wajib diupload jika data anggota diisi");
      }
      if (!formData.members[1].photo) {
        errors.push("Pas Foto Anggota 2 wajib diupload jika data anggota diisi");
      }
    }

    // Check file sizes for all uploaded files
    checkFileSize(formData.payment_proof, "Bukti Pembayaran");
    checkFileSize(formData.abstract_file, "File Abstrak");
    checkFileSize(formData.originality_statement, "Surat Pernyataan Orisinalitas");
    checkFileSize(formData.leader.identity_card, "Kartu Tanda Pengenal Ketua Tim");
    checkFileSize(formData.leader.active_student_letter, "Surat Pernyataan Siswa Aktif Ketua Tim");
    checkFileSize(formData.leader.photo, "Pas Foto Ketua Tim");
    checkFileSize(formData.members[0].identity_card, "Kartu Tanda Pengenal Anggota 1");
    checkFileSize(formData.members[0].active_student_letter, "Surat Pernyataan Siswa Aktif Anggota 1");
    checkFileSize(formData.members[0].photo, "Pas Foto Anggota 1");
    if (isMember2Filled) {
      checkFileSize(formData.members[1].identity_card, "Kartu Tanda Pengenal Anggota 2");
      checkFileSize(formData.members[1].active_student_letter, "Surat Pernyataan Siswa Aktif Anggota 2");
      checkFileSize(formData.members[1].photo, "Pas Foto Anggota 2");
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
        payment_proof: "", // As per response structure, set to empty string
        email: formData.email,
        user_id: formData.user_id || 1,
      };

      // Prepare the leader data (excluding files)
      const leaderData = {
        full_name: formData.leader.full_name,
        phone_number: formData.leader.phone_number,
        line_id: formData.leader.line_id,
        email: formData.leader.email,
        twibbon_and_poster_link: formData.leader.twibbon_and_poster_link,
        is_leader: 1,
        department: formData.leader.department,
        batch: formData.leader.batch,
        nim: formData.leader.nim,
        semester: parseInt(formData.leader.semester, 10),
      };

      // Prepare the members data (excluding files)
      const membersData = formData.members
        .filter((member) => member.full_name.trim() !== "") // Only include filled members
        .map((member) => ({
          full_name: member.full_name,
          phone_number: member.phone_number,
          line_id: member.line_id,
          email: member.email,
          twibbon_and_poster_link: member.twibbon_and_poster_link,
          is_leader: 0,
          department: member.department,
          batch: member.batch,
          nim: member.nim,
          semester: parseInt(member.semester, 10),
        }));

      // Prepare the FCEC data
      const fcecData = {
        abstract_title: formData.abstract_title,
        abstract_video_link: formData.abstract_video_link,
      };

      // Combine all data into a single object matching the response structure
      const combinedData = {
        team: teamData,
        leader: leaderData,
        members: membersData,
        fcec: fcecData,
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
      if (formData.abstract_file) {
        formDataToSend.append("abstract_file", formData.abstract_file);
        console.log("Abstract File:", formData.abstract_file.name);
      }
      if (formData.originality_statement) {
        formDataToSend.append("originality_statement", formData.originality_statement);
        console.log("Originality Statement File:", formData.originality_statement.name);
      }

      // Append leader files
      if (formData.leader.identity_card) {
        formDataToSend.append("leader_identity_card", formData.leader.identity_card);
        console.log("Leader Identity Card File:", formData.leader.identity_card.name);
      }
      if (formData.leader.active_student_letter) {
        formDataToSend.append("leader_active_student_letter", formData.leader.active_student_letter);
        console.log("Leader Active Student Letter File:", formData.leader.active_student_letter.name);
      }
      if (formData.leader.photo) {
        formDataToSend.append("leader_photo", formData.leader.photo);
        console.log("Leader Photo File:", formData.leader.photo.name);
      }

      // Append member files (only for filled members)
      formData.members.forEach((member, index) => {
        if (member.full_name.trim() !== "") {
          if (member.identity_card) {
            formDataToSend.append(`member${index + 1}_identity_card`, member.identity_card);
            console.log(`Member ${index + 1} Identity Card File:`, member.identity_card.name);
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

      // Log the FormData contents (for debugging)
      console.log("Submitting to:", `${process.env.NEXT_PUBLIC_BASE_URL}/teams/fcec/new`);
      Array.from(formDataToSend.entries()).forEach(([key, value]) => {
        console.log(`FormData Entry - ${key}:`, value);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/teams/fcec/new`, {
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
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          router.push("/dashboard");
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
    index: number | null,
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
    } else if (type === "member" && index !== null) {
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

  const [activeTab, setActiveTab] = useState<"ketua" | "anggota1" | "anggota2">("ketua");

  const handleTabChange = (tab: "ketua" | "anggota1" | "anggota2") => {
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
              {formInstructionsFcec.map((instruction, index) => (
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
              label="Asal Sekolah"
              type="text"
              value={formData.institution_name}
              onChange={(e) => handleTeamInfoChange("institution_name", e.target.value)}
              placeholder="Nama sekolah anda"
              required
            />
            <Input
              label="Judul Abstrak"
              type="text"
              value={formData.abstract_title}
              onChange={(e) => handleTeamInfoChange("abstract_title", e.target.value)}
              placeholder="Judul abstrak anda"
              required
            />
            <FileInput
              label="File Abstrak"
              accept="application/pdf, image/*"
              onChange={(e) => handleFileChange("team", null, "abstract_file", e.target.files?.[0] || null)}
              required
              variant="fcec"
              helperText="Format Penamaan: Nama Tim_Abstrak"
              fileName={fileNames.abstract_file}
            />
            <Input
              label="Link Video Abstrak"
              type="text"
              value={formData.abstract_video_link}
              onChange={(e) => handleTeamInfoChange("abstract_video_link", e.target.value)}
              placeholder="Link Video Abstrak"
              required
            />
            <FileInput
              label="Surat Pernyataan Orisinalitas"
              accept="application/pdf, image/*"
              onChange={(e) =>
                handleFileChange("team", null, "originality_statement", e.target.files?.[0] || null)
              }
              required
              variant="fcec"
              helperText="Format Penamaan: Nama Tim_Surat Pernyataan Orisinalitas"
              fileName={fileNames.originality_statement}
            />
            <FileInput
              label="Bukti Pembayaran"
              accept="image/*"
              onChange={(e) => handleFileChange("team", null, "payment_proof", e.target.files?.[0] || null)}
              required
              variant="fcec"
              helperText="Format Penamaan: Nama Tim_Bukti Pembayaran"
              fileName={fileNames.payment_proof}
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
                        label="Angkatan"
                        type="text"
                        value={formData.leader.batch}
                        onChange={(e) => handleMemberChange("leader", null, "batch", e.target.value)}
                        placeholder="Masukkan angkatan ketua tim"
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.leader.semester}
                        onChange={(e) => handleMemberChange("leader", null, "semester", e.target.value)}
                        placeholder="Masukkan semester ketua tim"
                        required
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        value={formData.leader.department}
                        onChange={(e) => handleMemberChange("leader", null, "department", e.target.value)}
                        placeholder="Masukkan jurusan ketua tim"
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
                        label="Kartu Tanda Pengenal"
                        accept="application/pdf, image/*"
                        onChange={(e) =>
                          handleFileChange("leader", null, "identity_card", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Kartu Identitas_Nama Lengkap"
                        fileName={fileNames.leader.identity_card}
                      />
                      <FileInput
                        label="Surat Pernyataan Siswa Aktif"
                        accept="application/pdf, image/*"
                        onChange={(e) =>
                          handleFileChange("leader", null, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap"
                        fileName={fileNames.leader.active_student_letter}
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="application/pdf, image/*"
                        onChange={(e) => handleFileChange("leader", null, "photo", e.target.files?.[0] || null)}
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Pas Foto_Nama Lengkap"
                        fileName={fileNames.leader.photo}
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
                        placeholder="Nama lengkap anggota 1"
                        required
                      />
                      <Input
                        label="NIM"
                        type="text"
                        value={formData.members[0].nim}
                        onChange={(e) => handleMemberChange("member", 0, "nim", e.target.value)}
                        placeholder="Masukkan NIM anggota 1"
                        required
                      />
                      <Input
                        label="Angkatan"
                        type="text"
                        value={formData.members[0].batch}
                        onChange={(e) => handleMemberChange("member", 0, "batch", e.target.value)}
                        placeholder="Masukkan angkatan anggota 1"
                        required
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.members[0].semester}
                        onChange={(e) => handleMemberChange("member", 0, "semester", e.target.value)}
                        placeholder="Masukkan semester anggota 1"
                        required
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        value={formData.members[0].department}
                        onChange={(e) => handleMemberChange("member", 0, "department", e.target.value)}
                        placeholder="Masukkan jurusan anggota 1"
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.members[0].email}
                        onChange={(e) => handleMemberChange("member", 0, "email", e.target.value)}
                        placeholder="Masukkan email anggota 1"
                        required
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.members[0].phone_number}
                        onChange={(e) => handleMemberChange("member", 0, "phone_number", e.target.value)}
                        placeholder="Masukkan nomor whatsapp anggota 1"
                        required
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        value={formData.members[0].line_id}
                        onChange={(e) => handleMemberChange("member", 0, "line_id", e.target.value)}
                        placeholder="Masukkan ID Line anggota 1"
                        required
                      />
                      <Input
                        label="Link Bukti Upload Twibbon"
                        type="text"
                        value={formData.members[0].twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("member", 0, "twibbon_and_poster_link", e.target.value)
                        }
                        placeholder="Masukkan link bukti upload twibbon anggota 1"
                        required
                      />
                      <FileInput
                        label="Kartu Tanda Pengenal"
                        accept="application/pdf, image/*"
                        onChange={(e) =>
                          handleFileChange("member", 0, "identity_card", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Kartu Identitas_Nama Lengkap"
                        fileName={fileNames.members[0].identity_card}
                      />
                      <FileInput
                        label="Surat Pernyataan Siswa Aktif"
                        accept="application/pdf, image/*"
                        onChange={(e) =>
                          handleFileChange("member", 0, "active_student_letter", e.target.files?.[0] || null)
                        }
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap"
                        fileName={fileNames.members[0].active_student_letter}
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="application/pdf, image/*"
                        onChange={(e) => handleFileChange("member", 0, "photo", e.target.files?.[0] || null)}
                        required
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Pas Foto_Nama Lengkap"
                        fileName={fileNames.members[0].photo}
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
                        placeholder="Nama lengkap anggota 2"
                      />
                      <Input
                        label="NIM"
                        type="text"
                        value={formData.members[1].nim}
                        onChange={(e) => handleMemberChange("member", 1, "nim", e.target.value)}
                        placeholder="Masukkan NIM anggota 2"
                      />
                      <Input
                        label="Angkatan"
                        type="text"
                        value={formData.members[1].batch}
                        onChange={(e) => handleMemberChange("member", 1, "batch", e.target.value)}
                        placeholder="Masukkan angkatan anggota 2"
                      />
                      <Input
                        label="Semester"
                        type="text"
                        value={formData.members[1].semester}
                        onChange={(e) => handleMemberChange("member", 1, "semester", e.target.value)}
                        placeholder="Masukkan semester anggota 2"
                      />
                      <Input
                        label="Jurusan"
                        type="text"
                        value={formData.members[1].department}
                        onChange={(e) => handleMemberChange("member", 1, "department", e.target.value)}
                        placeholder="Masukkan jurusan anggota 2"
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.members[1].email}
                        onChange={(e) => handleMemberChange("member", 1, "email", e.target.value)}
                        placeholder="Masukkan email anggota 2"
                      />
                      <Input
                        label="Nomor Whatsapp"
                        type="text"
                        value={formData.members[1].phone_number}
                        onChange={(e) => handleMemberChange("member", 1, "phone_number", e.target.value)}
                        placeholder="Masukkan nomor whatsapp anggota 2"
                      />
                      <Input
                        label="ID Line"
                        type="text"
                        value={formData.members[1].line_id}
                        onChange={(e) => handleMemberChange("member", 1, "line_id", e.target.value)}
                        placeholder="Masukkan ID Line anggota 2"
                      />
                      <Input
                        label="Link Bukti Upload Twibbon"
                        type="text"
                        value={formData.members[1].twibbon_and_poster_link}
                        onChange={(e) =>
                          handleMemberChange("member", 1, "twibbon_and_poster_link", e.target.value)
                        }
                        placeholder="Masukkan link bukti upload twibbon anggota 2"
                      />
                      <FileInput
                        label="Kartu Tanda Pengenal"
                        accept="application/pdf, image/*"
                        onChange={(e) =>
                          handleFileChange("member", 1, "identity_card", e.target.files?.[0] || null)
                        }
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Kartu Identitas_Nama Lengkap"
                        fileName={fileNames.members[1].identity_card}
                      />
                      <FileInput
                        label="Surat Pernyataan Siswa Aktif"
                        accept="application/pdf, image/*"
                        onChange={(e) =>
                          handleFileChange("member", 1, "active_student_letter", e.target.files?.[0] || null)
                        }
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap"
                        fileName={fileNames.members[1].active_student_letter}
                      />
                      <FileInput
                        label="Pas Foto 3x4"
                        accept="application/pdf, image/*"
                        onChange={(e) => handleFileChange("member", 1, "photo", e.target.files?.[0] || null)}
                        variant="fcec"
                        helperText="Format Penamaan: Nama Tim_Pas Foto_Nama Lengkap"
                        fileName={fileNames.members[1].photo}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full mt-4 p-2">
              <Button
                variant="fcec-primary"
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