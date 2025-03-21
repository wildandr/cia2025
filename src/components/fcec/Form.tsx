// components/Form.tsx
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructionsFcec } from "@/data/formInstructionsFcec";
import { useAuthCheck } from '@/hooks/useAuthCheck';

export function Form() {
  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) {
    return null; // Or loading spinner
  }

  const [activeTab, setActiveTab] = useState<"ketua" | "anggota1" | "anggota2">("ketua");

  const handleTabChange = (tab: "ketua" | "anggota1" | "anggota2") => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col overflow-hidden sm:overflow-scroll max-w-5xl mx-auto font-openSans">
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

          {/* Form Sections */}
          <form className="w-full flex flex-col gap-4 font-openSans">
            {/* Team Info */}
            <Input
              label="Email"
              type="email"
              placeholder="Email anda"
              required
            />
            <Input
              label="Nama Tim"
              type="text"
              placeholder="Nama tim anda"
              required
            />
            <Input
              label="Asal Sekolah"
              type="text"
              placeholder="Nama sekolah anda"
              required
            />
            <Input
              label="Judul Abstrak"
              type="text"
              placeholder="Judul abstrak anda"
              required
            />
            <FileInput
              label="File Abstrak"
              accept="application/pdf, image/*"
              required
              variant="fcec"
              helperText="Format Penamaan: Nama Tim_Abstrak"
            />
            <Input
              label="Link Video Abstrak"
              type="text"
              placeholder="Link Video Abstrak"
              required
            />
            <FileInput
              label="Surat Pernyataan Orisinalitas"
              accept="application/pdf, image/*"
              required
              variant="fcec"
              helperText="Format Penamaan: Nama Tim_Surat Pernyataan Orisinalitas"
            />
          </form>

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

              {/* Tab Content */}
              <form className="flex flex-col gap-4 p-4">
                {activeTab === "ketua" && (
                  <>
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      placeholder="Nama lengkap ketua tim"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Masukkan email ketua tim"
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      placeholder="Masukkan nomor whatsapp ketua tim"
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      placeholder="Masukkan ID Line ketua tim"
                      required
                    />
                    <Input
                      label="Link Bukti Upload Twibbon"
                      type="text"
                      placeholder="Masukkan link bukti upload twibbon ketua tim"
                      required
                    />
                    <FileInput
                      label="Kartu Tanda Pengenal"
                      accept="application/pdf, image/*"
                      required
                      variant="fcec"
                      helperText="Format Penamaan: Nama Tim_Kartu Identitas_Nama Lengkap"
                    />
                    <FileInput
                      label="Surat Pernyataan Siswa Aktif"
                      accept="application/pdf, image/*"
                      required
                      variant="fcec"
                      helperText="Format Penamaan: Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="application/pdf, image/*"
                      required
                      variant="fcec"
                      helperText="Format Penamaan: Nama Tim_Pas Foto_Nama Lengkap"
                    />
                  </>
                )}

                {activeTab === "anggota1" && (
                  <>
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      placeholder="Nama lengkap anggota 1"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Masukkan email anggota 1"
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      placeholder="Masukkan nomor whatsapp anggota 1"
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      placeholder="Masukkan ID Line anggota 1"
                      required
                    />
                    <Input
                      label="Link Bukti Upload Twibbon"
                      type="text"
                      placeholder="Masukkan link bukti upload twibbon anggota 1"
                      required
                    />
                    <FileInput
                      label="Kartu Tanda Pengenal"
                      accept="application/pdf, image/*"
                      required
                      variant="fcec"
                      helperText="Format Penamaan: Nama Tim_Kartu Identitas_Nama Lengkap"
                    />
                    <FileInput
                      label="Surat Pernyataan Siswa Aktif"
                      accept="application/pdf, image/*"
                      required
                      variant="fcec"
                      helperText="Format Penamaan: Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="application/pdf, image/*"
                      required
                      variant="fcec"
                      helperText="Format Penamaan: Nama Tim_Pas Foto_Nama Lengkap"
                    />
                  </>
                )}

                {activeTab === "anggota2" && (
                  <>
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      placeholder="Nama lengkap anggota 2"
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Masukkan email anggota 2"
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      placeholder="Masukkan nomor whatsapp anggota 2"
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      placeholder="Masukkan ID Line anggota 2"
                    />
                    <Input
                      label="Link Bukti Upload Twibbon"
                      type="text"
                      placeholder="Masukkan link bukti upload twibbon anggota 2"
                    />
                    <FileInput
                      label="Kartu Tanda Pengenal"
                      accept="application/pdf, image/*"
                      variant="fcec"
                      helperText="Format Penamaan: Nama Tim_Kartu Identitas_Nama Lengkap"
                    />
                    <FileInput
                      label="Surat Pernyataan Siswa Aktif"
                      accept="application/pdf, image/*"
                      variant="fcec"
                      helperText="Format Penamaan: Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="application/pdf, image/*"
                      variant="fcec"
                      helperText="Format Penamaan: Nama Tim_Pas Foto_Nama Lengkap"
                    />
                  </>
                )}
              </form>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full mt-4 p-2">
            <Button variant="fcec-primary">Kirim Formulir</Button>
          </div>
        </div>
      </div>
    </div>
  );
}