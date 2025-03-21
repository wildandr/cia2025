// components/Form.tsx
"use client";
import React from "react";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructionsCraft } from "@/data/formInstructionsCraft";

export function Form() {
  return (
    <div className="relative flex flex-col overflow-hidden sm:overflow-scroll max-w-5xl mx-auto font-openSans">
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
          <form className="w-full flex flex-col gap-4 font-openSans p-4">
            {/* Pilihan Kegiatan */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-xs lg:text-sm">
                Pilihan Kegiatan <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-xs lg:text-sm text-white">
                  <input
                    type="radio"
                    name="activity_choice"
                    value="online"
                    required
                    className="accent-cia-green"
                  />
                  Online
                </label>
                <label className="flex items-center gap-1 text-xs lg:text-sm text-white">
                  <input
                    type="radio"
                    name="activity_choice"
                    value="offline"
                    required
                    className="accent-cia-green"
                  />
                  Offline
                </label>
              </div>
            </div>

            {/* Apakah Mahasiswa DTSL FT UGM */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-xs lg:text-sm">
                Apakah Mahasiswa DTSL FT UGM{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-xs lg:text-sm text-white">
                  <input
                    type="radio"
                    name="isMahasiswaDTSL"
                    value="true"
                    required
                    className="accent-cia-green"
                  />
                  Ya
                </label>
                <label className="flex items-center gap-1 text-xs lg:text-sm text-white">
                  <input
                    type="radio"
                    name="isMahasiswaDTSL"
                    value="false"
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
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="Alamat email anda"
              required
            />
            <Input
              label="Asal Instansi"
              type="text"
              placeholder="Asal instansi"
              required
            />
            <Input
              label="Nomor Whatsapp"
              type="text"
              placeholder="Nomor Whatsapp"
              required
            />
            <FileInput
              label="Kartu Tanda Mahasiswa"
              accept="application/pdf"
              required
              variant="craft"
              helperText="Format Penamaan: KTM_Nama Peserta"
            />
            <FileInput
              label="Bukti Pembayaran"
              accept="application/pdf"
              required
              variant="craft"
              helperText="Format Penamaan: Bukti Pembayaran_Nama Peserta"
            />
            <FileInput
              label="Bukti Follow Instagram"
              accept="application/pdf"
              required
              variant="craft"
              helperText="Format Penamaan: Bukti Follow PKTSL_Nama Peserta"
            />
            <FileInput
              label="Bukti Follow Instagram"
              accept="application/pdf"
              required
              variant="craft"
              helperText="Format Penamaan: Bukti Follow CIA_Nama Peserta"
            />
            <FileInput
              label="Bukti Story Instagram"
              accept="application/pdf"
              required
              variant="craft"
              helperText="Format Penamaan: Bukti Story CRAFT_Nama Peserta"
            />
          </form>

          {/* Submit Button */}
          <div className="flex justify-center w-full mt-4 p-2">
            <Button variant="craft-primary">Kirim Formulir</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
