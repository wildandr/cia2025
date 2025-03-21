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
    text: "Biaya pendaftaran yang harus dibayarkan sejumlah Rp 300.223,00/tim melalui rekening 1800013302668 (Mandiri) a.n. Balqis Sybil Buanawati."
  },
  {
    text: "Apabila terjadi kendala dan kesalahan pada saat mengisi gform, segera hubungi CP : 081298215556 (Nafta), atau 087734852924 (Bagas)"
  },
  {
    text: "Email balasan akan dikirimkan ke email team leader."
  },
  {
    text: "Apabila tim hanya terdiri dari 3 anggota (termasuk ketua tim), maka anggota 3 dapat dikosongkan"
  }
];
