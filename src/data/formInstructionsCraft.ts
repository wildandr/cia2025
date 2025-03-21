interface DocumentRequirement {
  description: string;
  format: string;
  example: string;
}

interface Instruction {
  text: string;
  documents?: DocumentRequirement[];
  links?: { text: string; url: string }[];
}

export const formInstructionsCraft: Instruction[] = [
  {
    text: "Link Guidebook:",
    links: [
      { text: "https://bit.ly/GuidebookPendaftaranCRAFT", url: "https://bit.ly/GuidebookPendaftaranCRAFT" }
    ]
  },
  {
    text: "Peserta membaca Guidebook Pendaftaran CRAFT"
  },
  {
    text: "Peserta mengisi formulir dengan sebenarnya"
  },
  {
    text: "Peserta mencantumkan email aktif untuk mendapatkan email balasan nantinya"
  },
  {
    text: "Peserta wajib share story feeds pendaftaran CRAFT melewati link https://bit.ly/FeedsInstagramPendaftaranCRAFT di akun instagram pribadi peserta, serta tag akun instagram @pktsl_ugm dan @civilinaction"
  },
  {
    text: "Peserta wajib mem-follow akun instagram @pktsl_ugm dan @civilinaction"
  },
  {
    text: "Peserta dapat memilih 2 opsi kehadiran (offline/online)"
  },
  {
    text: "Peserta menyerahkan bukti tangkapan layar share story feeds pendaftaran CRAFT serta follow akun instagram @pktsl_ugm dan @civilinaction (PDF).",
    documents: [
      {
        description: "Bukti story CRAFT (PDF)",
        format: "Bukti Story CRAFT_Nama Peserta",
        example: "Bukti Story CRAFT_Dimas Apta"
      },
      {
        description: "Bukti follow CIA (PDF)",
        format: "Bukti Follow CIA_Nama Peserta",
        example: "Bukti Follow CIA_Dimas Apta"
      },
      {
        description: "Bukti follow PKTSL (PDF)",
        format: "Bukti Follow PKTSL_Nama Peserta",
        example: "Bukti Follow PKTSL_Dimas Apta"
      }
    ]
  },
  {
    text: "Peserta menyerahkan bukti pembayaran pada formulir (PDF).\n\nFormat penamaan file: Bukti Pembayaran_Nama Peserta\nContoh: Bukti Pembayaran_Dimas Apta\n\nBiaya pendaftaran yang harus dibayarkan sejumlah berikut:\nTiket Early Bird (18-24 Maret 2024)\nUmum offline: Rp 40.000\nUmum online: Rp 30.000\nMahasiswa DTSL FT UGM (Coming Soon)\n\nPembayaran ditambah dengan kode unik (+Rp 233)\nContoh: Rp 40.233,00\nPembayaran dilakukan melalui rekening 1800013302668 (Mandiri) a.n Balqis Sybil Buanawati",
    documents: [
      {
        description: "Bukti Pembayaran (PDF)",
        format: "Bukti Pembayaran_Nama Peserta",
        example: "Bukti Pembayaran_Dimas Apta"
      }
    ]
  },
  {
    text: "Apabila terdapat kendala dan kesalahan dalam mengisi google form dapat menghubungi Contact Person:\nApta: 081329845585\nMaul: 085157861966"
  },
  {
    text: "Konfirmasi registrasi berhasil akan dikirimkan melalui email balasan."
  }
];
