// components/Form.tsx
"use client";
import React, { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructionsCraft } from "@/data/formInstructionsCraft";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface FormData {
  full_name: string;
  institution_name: string;
  user_id: number;
  activity_choice: "online" | "offline";
  whatsapp_number: string;
  isMahasiswaDTSL: boolean;
  email: string;
  bundling_member: string;
  ktm?: File;
  payment_proof?: File;
  bukti_follow_pktsl?: File;
  bukti_follow_cia?: File;
  bukti_story?: File;
  bundle?: File;
}

export function Form() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    institution_name: "",
    user_id: user?.id || 1, // Default to 1 if user.id is not available
    activity_choice: "offline", // Default and fixed value
    whatsapp_number: "",
    isMahasiswaDTSL: false, // Default value
    email: "",
    bundling_member: "",
    ktm: undefined,
    payment_proof: undefined,
    bukti_follow_pktsl: undefined,
    bukti_follow_cia: undefined,
    bukti_story: undefined,
    bundle: undefined,
  });

  const validateTextFields = () => {
    const errors: string[] = [];

    if (!formData.full_name.trim()) {
      errors.push("Nama Lengkap Peserta wajib diisi");
    }
    if (!formData.institution_name.trim()) {
      errors.push("Asal Instansi wajib diisi");
    }
    if (!formData.email.trim()) {
      errors.push("Email wajib diisi");
    }
    if (!formData.whatsapp_number.trim()) {
      errors.push("Nomor Whatsapp wajib diisi");
    }
    if (formData.isMahasiswaDTSL === undefined) {
      errors.push("Status Mahasiswa DTSL FT UGM wajib dipilih");
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
    if (!formData.ktm) {
      errors.push("Kartu Tanda Mahasiswa wajib diupload");
    }
    if (!formData.payment_proof) {
      errors.push("Bukti Pembayaran wajib diupload");
    }
    if (!formData.bukti_follow_pktsl) {
      errors.push("Bukti Follow Instagram PKTSL wajib diupload");
    }
    if (!formData.bukti_follow_cia) {
      errors.push("Bukti Follow Instagram CIA wajib diupload");
    }
    if (!formData.bukti_story) {
      errors.push("Bukti Story Instagram CRAFT wajib diupload");
    }

    // Check file sizes for all uploaded files
    checkFileSize(formData.ktm, "Kartu Tanda Mahasiswa");
    checkFileSize(formData.payment_proof, "Bukti Pembayaran");
    checkFileSize(formData.bukti_follow_pktsl, "Bukti Follow Instagram PKTSL");
    checkFileSize(formData.bukti_follow_cia, "Bukti Follow Instagram CIA");
    checkFileSize(formData.bukti_story, "Bukti Story Instagram CRAFT");

    // Add bundle file size check
    checkFileSize(formData.bundle, "File Bundle");

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

      // Prepare the data to send
      const dataToSend = {
        full_name: formData.full_name,
        institution_name: formData.institution_name,
        user_id: formData.user_id.toString(), // Convert to string as per expected response
        activity_choice: formData.activity_choice,
        whatsapp_number: formData.whatsapp_number,
        isMahasiswaDTSL: formData.isMahasiswaDTSL,
        email: formData.email,
        bundling_member: formData.bundling_member,
      };

      // Log the data being sent
      console.log("Data to Send:", dataToSend);

      // Create FormData object
      const formDataToSend = new FormData();

      // Append the data as a JSON string under the 'data' key
      formDataToSend.append("data", JSON.stringify(dataToSend));

      // Append files
      if (formData.ktm) {
        formDataToSend.append("ktm", formData.ktm);
        console.log("KTM File:", formData.ktm.name);
      }
      if (formData.payment_proof) {
        formDataToSend.append("payment_proof", formData.payment_proof);
        console.log("Payment Proof File:", formData.payment_proof.name);
      }
      if (formData.bukti_follow_pktsl) {
        formDataToSend.append("bukti_follow_pktsl", formData.bukti_follow_pktsl);
        console.log("Bukti Follow PKTSL File:", formData.bukti_follow_pktsl.name);
      }
      if (formData.bukti_follow_cia) {
        formDataToSend.append("bukti_follow_cia", formData.bukti_follow_cia);
        console.log("Bukti Follow CIA File:", formData.bukti_follow_cia.name);
      }
      if (formData.bukti_story) {
        formDataToSend.append("bukti_story", formData.bukti_story);
        console.log("Bukti Story File:", formData.bukti_story.name);
      }

      // Add bundle file to FormData if it exists
      if (formData.bundle) {
        formDataToSend.append("bundle", formData.bundle);
        console.log("Bundle File:", formData.bundle.name);
      }

      // Log the FormData contents (for debugging)
   
      Array.from(formDataToSend.entries()).forEach(([key, value]) => {
        console.log(`FormData Entry - ${key}:`, value);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/crafts/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });



      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = "Unknown error occurred during submission";

        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          errorMessage = responseData.message || errorMessage;
        } else {
          const responseText = await response.text();
          console.error("Non-JSON response received:", responseText);
          errorMessage = `Server returned non-JSON response: ${response.statusText}`;
        }

        throw new Error(errorMessage);
      }

      const responseData = await response.json();

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
    } catch (error: any) {
      console.error("Submission Error:", error.message);
      toast.error(`Gagal Submit: ${error.message}`, {
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

  const handleTextChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value || "",
    }));
    console.log(`Field Updated - ${field}:`, value);
  };

  const handleRadioChange = (field: "activity_choice" | "isMahasiswaDTSL", value: string) => {
    if (field === "activity_choice") {
      setFormData((prev) => ({
        ...prev,
        activity_choice: value as "online" | "offline",
      }));
    } else if (field === "isMahasiswaDTSL") {
      setFormData((prev) => ({
        ...prev,
        isMahasiswaDTSL: value === "true",
      }));
    }
    console.log(`Radio Updated - ${field}:`, value);
  };

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
    console.log(`File Updated - ${field}:`, file.name);
  };

  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) {
    console.log("User not authenticated. Rendering null.");
    return null;
  }

  return (
    <div className="relative flex flex-col overflow-hidden max-w-5xl mx-auto font-openSans">
      <ToastContainer style={{ marginTop: "40px" }} />
      <div className="flex flex-col lg:justify-center items-center relative min-w-full">
        <div className="z-[10] min-h-screen flex flex-col">
          {/* Instructions */}
          <div className="text-white mx-4 mt-[3%] lg:mb-[1%] md:text-base lg:text-xl text-[0.7rem]">
            <ol className="list-decimal pl-4">
              {formInstructionsCraft.map((instruction, index) => (
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

          {/* Form Sections */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 font-openSans p-4">
            {/* Remove activity_choice radio buttons section */}

            {/* Apakah Mahasiswa DTSL FT UGM */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-[0.7rem] md:text-base lg:text-lg">
                Apakah Mahasiswa DTSL FT UGM <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-[0.7rem] md:text-base lg:text-lg text-white">
                  <input
                    type="radio"
                    name="isMahasiswaDTSL"
                    value="true"
                    checked={formData.isMahasiswaDTSL === true}
                    onChange={(e) => handleRadioChange("isMahasiswaDTSL", e.target.value)}
                    required
                    className="accent-cia-green"
                  />
                  Ya
                </label>
                <label className="flex items-center gap-1 text-[0.7rem] md:text-base lg:text-lg text-white">
                  <input
                    type="radio"
                    name="isMahasiswaDTSL"
                    value="false"
                    checked={formData.isMahasiswaDTSL === false}
                    onChange={(e) => handleRadioChange("isMahasiswaDTSL", e.target.value)}
                    required
                    className="accent-cia-green"
                  />
                  Tidak
                </label>
              </div>
            </div>

            <Input
              label="Nama Lengkap Peserta"
              type="text"
              placeholder="Nama lengkap peserta"
              value={formData.full_name}
              onChange={(e) => handleTextChange("full_name", e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="Alamat email anda"
              value={formData.email}
              onChange={(e) => handleTextChange("email", e.target.value)}
              required
            />
            <Input
              label="Asal Instansi"
              type="text"
              placeholder="Asal instansi"
              value={formData.institution_name}
              onChange={(e) => handleTextChange("institution_name", e.target.value)}
              required
            />
            <Input
              label="Nomor Whatsapp"
              type="text"
              placeholder="Nomor Whatsapp"
              value={formData.whatsapp_number}
              onChange={(e) => handleTextChange("whatsapp_number", e.target.value)}
              required
            />
            <Input
              label="Nama Member Bundling (Jika Ada)"
              type="text"
              placeholder="Nama member bundling"
              value={formData.bundling_member}
              onChange={(e) => handleTextChange("bundling_member", e.target.value)}
            />
            <FileInput
              label="Kartu Tanda Mahasiswa"
              accept="application/pdf"
              name="ktm"
              onChange={(e) => handleFileChange("ktm", e.target.files?.[0] || null)}
              required
              variant="craft"
              helperText="Format Penamaan: KTM_Nama Peserta"
            />
            <FileInput
              label="Bukti Pembayaran"
              accept="application/pdf"
              name="payment_proof"
              onChange={(e) => handleFileChange("payment_proof", e.target.files?.[0] || null)}
              required
              variant="craft"
              helperText="Format Penamaan: Bukti Pembayaran_Nama Peserta"
            />
            <FileInput
              label="Bukti Follow Instagram PKTSL"
              accept="application/pdf"
              name="bukti_follow_pktsl"
              onChange={(e) => handleFileChange("bukti_follow_pktsl", e.target.files?.[0] || null)}
              required
              variant="craft"
              helperText="Format Penamaan: Bukti Follow PKTSL_Nama Peserta"
            />
            <FileInput
              label="Bukti Follow Instagram CIA"
              accept="application/pdf"
              name="bukti_follow_cia"
              onChange={(e) => handleFileChange("bukti_follow_cia", e.target.files?.[0] || null)}
              required
              variant="craft"
              helperText="Format Penamaan: Bukti Follow CIA_Nama Peserta"
            />
            <FileInput
              label="Bukti Story Instagram CRAFT"
              accept="application/pdf"
              name="bukti_story"
              onChange={(e) => handleFileChange("bukti_story", e.target.files?.[0] || null)}
              required
              variant="craft"
              helperText="Format Penamaan: Bukti Story CRAFT_Nama Peserta"
            />
            <FileInput
              label="Formulir Bundle (Jika Ada)"
              accept="application/pdf"
              name="bundle"
              onChange={(e) => handleFileChange("bundle", e.target.files?.[0] || null)}
              variant="craft"
              helperText="Format Penamaan: Bundle_Nama Peserta"
            />

            {/* Submit Button */}
            <div className="flex justify-center w-full mt-4 p-2">
              <Button
                variant="craft-primary"
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