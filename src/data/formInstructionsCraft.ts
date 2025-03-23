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
    text: "Link Guidebook: https://bit.ly/GuidebookPesertaCRAFT"
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
    text: "Peserta wajib share story feeds pendaftaran CRAFT di akun instagram pribadi peserta, serta tag akun instagram @pktsl_ugm dan @civilinaction"
  },
  {
    text: "Peserta wajib mem-follow akun instagram @pktsl_ugm dan @civilinaction"
  },
  {
    text: "Apabila peserta tidak dapat datang offline, peserta dapat bergabung secara online dengan mengonfirmasi ke CP terlebih dahulu"
  },
  {
    text: "Peserta menyerahkan bukti tangkapan layar share story feeds pendaftaran CRAFT serta follow akun instagram @pktsl_ugm dan @civilinaction (PDF).",
    documents: [
      {
        description: "Bukti story CRAFT (PDF)",
        format: "Bukti Story CRAFT_Nama Peserta",
        example: "Bukti Story CRAFT_Angga Peuliken Ginting"
      },
      {
        description: "Bukti follow CIA (PDF)",
        format: "Bukti Follow CIA_Nama Peserta",
        example: "Bukti Follow CIA_Angga Peuliken Ginting"
      },
      {
        description: "Bukti follow PKTSL (PDF)",
        format: "Bukti Follow PKTSL_Nama Peserta",
        example: "Bukti Follow PKTSL_Angga Peuliken Ginting"
      }
    ]
  },
  {
    text: "Peserta menyerahkan bukti pembayaran pada formulir (PDF).\n\nFormat penamaan file: Bukti Pembayaran_Nama Peserta\nContoh: Bukti Pembayaran_Dimas Apta\n\nBiaya pendaftaran yang harus dibayarkan sejumlah berikut:\nTiket Early Bird(60k) [10 tiket]\nBunding [60 tiket]\n •⁠  ⁠1 orang (80k)\n•⁠  ⁠3 orang (70k)\n•⁠  ⁠5 orang (65k)\nPembayaran ditambah dengan kode unik (+Rp 13)\nContoh: Rp 40.233,00\nPembayaran dilakukan melalui rekening 1370022414649 (Mandiri) a.n NAOMI ELLENA MANURUN",
    documents: [
      {
        description: "Bukti Pembayaran (PDF)",
        format: "Bukti Pembayaran_Nama Peserta",
        example: "Bukti Pembayaran_Dimas Apta"
      }
    ]
  },
  {
    text: "Apabila terdapat kendala dan kesalahan dalam mengisi google form dapat menghubungi Contact Person:\n(081225449240) Anggito\n(081341316170) Nandita"
  },
];
