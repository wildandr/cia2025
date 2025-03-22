interface DocumentRequirement {
  description: string;
  format: string;
  example: string;
}

interface Instruction {
  text: string;
  documents?: DocumentRequirement[];
}

export const formInstructionsCic: Instruction[] = [
  {
    text: "Peserta diharapkan mengisi formulir pendaftaran dengan teliti."
  },
  {
    text: "Peserta mengunggah dokumen sesuai dengan ketentuan berikut:",
    documents: [
      {
        description: "Scan Kartu Tanda Mahasiswa (PDF)",
        format: "KTM_Nama Tim_Nama Peserta",
        example: "KTM_Komet Minor_Soke Bahtera"
      },
      {
        description: "Scan surat keterangan mahasiswa aktif (PDF)",
        format: "SKMA_Nama Tim_Nama Peserta",
        example: "SKMA_Komet Minor_Soke Bahtera"
      },
      {
        description: "Pas foto 3x4 (PDF)",
        format: "Pas Foto_Nama Tim",
        example: "Pas Foto_Komet Minor"
      },
      {
        description: "Scan bukti pembayaran (PDF)",
        format: "Bukti Pembayaran_Nama Tim",
        example: "Bukti Pembayaran_Komet Minor"
      }
    ]
  },
  {
    text: "Surat Keterangan Mahasiswa Aktif (SKMA) dapat digantikan dengan data lain yang membuktikan peserta sebagai mahasiswa aktif. (Contoh : KRS, transkrip, atau bukti registrasi semester terbaru)"
  },
  {
    text: "Biaya pendaftaran yang harus dibayarkan disesuaikan dengan gelombang pendaftaran yang diikuti:",
    documents: [
      {
        description: "Gelombang 1: Rp200.000",
        format: "22 Maret - 27 April",
        example: "Contoh: 200.013"
      },
      {
        description: "Gelombang 2: Rp250.000",
        format: "27 April - 4 Mei",
        example: "Contoh: 250.013"
      },
      {
        description: "Gelombang 3: Rp300.000",
        format: "5 Mei - 12 Mei",
        example: "Contoh: 300.013"
      }
    ]
  },
  {
    text: "Jangan lupa untuk menambahkan kode unik berupa 13 rupiah di akhir digit"
  },
  {
    text: "Pembayaran dilakukan ke rekening berikut : \n\ NAOMI ELLENA MANURUN Bank Mandiri 1370022414649"
  },
  {
    text: "Apabila terjadi kendala dan kesalahan pada saat mengisi form, segera hubungi CP:",
    documents: [
      {
        description: "Nabila Puspita Rena",
        format: "WhatsApp (089636977055)",
        example: "Line (nabila_rena)"
      },
      {
        description: "Ni Made Jiesta Pradnya Gauri",
        format: "WhatsApp (081339168272)",
        example: "Line (jiiesta24)"
      }
    ]
  },
  {
    text: "Email balasan akan dikirimkan ke email team leader."
  },
  {
    text: "Apabila tim hanya terdiri dari 3 anggota (termasuk ketua tim), maka anggota 3 dapat dikosongkan"
  }
];
