// components/Form.tsx
"use client"
import React, { useState } from "react";
import { Input } from '@/components/ui/Input';
import { FileInput } from '@/components/ui/FileInput';
import { Button } from '@/components/ui/Button';
import { formInstructions } from '@/data/formInstructionsSbc';
import { useAuthCheck } from '@/hooks/useAuthCheck';

export function Form() {
  // const isAuthenticated = useAuthCheck();

  // if (!isAuthenticated) {
  //   return null; // Or loading spinner
  // }

  const [activeTab, setActiveTab] = useState<"ketua" | "anggota1" | "anggota2" | "dosbim">("ketua");

  const handleTabChange = (tab: "ketua" | "anggota1" | "anggota2" | "dosbim") => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col overflow-hidden  max-w-5xl mx-auto font-openSans">
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
                          {doc.description} Format penamaan file: {doc.format}{' '}
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
              label="Nama Perguruan Tinggi"
              type="text"
              placeholder="Nama perguruan tinggi anda"
              required
            />
            <Input
              label="Nama Jembatan"
              type="text"
              placeholder="Nama jembatan anda"
              required
            />
            <FileInput
              label="Bukti Pembayaran"
              accept="image/*"
              required
              helperText="Format Penamaan: Bukti Pembayaran_Nama Tim"
            />
            <FileInput
              label="Bukti Voucher"
              accept="image/*"
              helperText="Format Penamaan: Bukti Voucher_Nama Tim"
            />
          </form>

          {/* Tabs Section */}
          <div className="w-full mt-[3%]">
            <div className="border-2 rounded-lg">
              {/* Tab Headers */}
              <div className="flex items-center border-b-2 border-white">
                <div
                  className={`flex-1 text-center py-4 w-full  h-full rounded-tl-md text-[10px] md:text-sm lg:text-lg cursor-pointer ${
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
                      label="NIM"
                      type="text"
                      placeholder="Masukkan NIM ketua tim"
                      required
                    />
                    <Input
                      label="Semester"
                      type="text"
                      placeholder="Masukkan semester ketua tim"
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
                      label="Surat Keterangan Mahasiswa Aktif"
                      accept="image/*"
                      required
                      helperText="Format Penamaan: SKMA_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Kartu Tanda Mahasiswa"
                      accept="image/*"
                      required
                      helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="image/*"
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
                      placeholder="Nama lengkap Anggota 1"
                      required
                    />
                    <Input
                      label="NIM"
                      type="text"
                      placeholder="Masukkan NIM Anggota 1"
                      required
                    />
                    <Input
                      label="Semester"
                      type="text"
                      placeholder="Masukkan semester Anggota 1"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Masukkan email Anggota 1"
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      placeholder="Masukkan nomor whatsapp Anggota 1"
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      placeholder="Masukkan ID Line Anggota 1"
                      required
                    />
                    <Input
                      label="Link Bukti Upload Twibbon"
                      type="text"
                      placeholder="Masukkan link bukti upload twibbon Anggota 1"
                      required
                    />
                    <FileInput
                      label="Surat Keterangan Mahasiswa Aktif"
                      accept="image/*"
                      required
                      helperText="Format Penamaan: SKMA_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Kartu Tanda Mahasiswa"
                      accept="image/*"
                      required
                      helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="image/*"
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
                      placeholder="Nama lengkap Anggota 2"
                      required
                    />
                    <Input
                      label="NIM"
                      type="text"
                      placeholder="Masukkan NIM Anggota 2"
                      required
                    />
                    <Input
                      label="Semester"
                      type="text"
                      placeholder="Masukkan semester Anggota 2"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Masukkan email Anggota 2"
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      placeholder="Masukkan nomor whatsapp Anggota 2"
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      placeholder="Masukkan ID Line Anggota 2"
                      required
                    />
                    <Input
                      label="Link Bukti Upload Twibbon"
                      type="text"
                      placeholder="Masukkan link bukti upload twibbon Anggota 2"
                      required
                    />
                    <FileInput
                      label="Surat Keterangan Mahasiswa Aktif"
                      accept="image/*"
                      required
                      helperText="Format Penamaan: SKMA_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Kartu Tanda Mahasiswa"
                      accept="image/*"
                      required
                      helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="image/*"
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
                      placeholder="Nama lengkap dosen pembimbing"
                      required
                    />
                    <Input
                      label="NIP"
                      type="text"
                      placeholder="Masukkan NIP dosen pembimbing"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Masukkan email dosen pembimbing"
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      placeholder="Masukkan nomor whatsapp dosen pembimbing"
                      required
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="image/*"
                      required
                      helperText="Format Penamaan: Pasfoto_Nama Tim_Nama Dosen Pembimbing"
                    />
                  </>
                )}
              </form>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full mt-4 p-2">
            <Button variant="sbc-primary">Kirim Formulir</Button>
          </div>
        </div>
      </div>
    </div>
  );
}