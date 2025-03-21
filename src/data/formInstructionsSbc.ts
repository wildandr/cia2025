interface DocumentRequirement {
  description: string;
  format: string;
  example: string;
}

interface Instruction {
  text: string;
  documents?: DocumentRequirement[];
}

export const formInstructions: Instruction[] = [
  {
    text: "Periode pendaftaran dimulai pada tanggal 17 Februari 2024 pukul 08.00 hingga 17 Maret 2024 pukul 23.59 dan TOR soal akan rilis pada tanggal 18 Maret 2024;"
  },
  {
    text: "Peserta diharapkan untuk membayar biaya pendaftaran sebesar Rp350.000/tim yang dapat dilakukan dengan cara transfer ke rekening 1800013302668 Bank Mandiri atas nama BALQIS SYBIL BUANAWAT dengan menambahkan kode unik 213 (nominal yang dibayarkan menjadi Rp350.213,00);"
  },
  {
    text: 'Dalam proses transaksi/transfer, peserta diharapkan untuk menambahkan keterangan "Registrasi SBC 2024" pada kolom keterangan/catatan pembayaran;'
  },
  {
    text: "Peserta diharapkan mengisi formulir pendaftaran dengan teliti."
  },
  {
    text: "Peserta diharapkan mengunggah dokumen sesuai dengan ketentuan berikut:",
    documents: [
      {
        description: "Scan Kartu Tanda Mahasiswa (JPG/JPEG/PNG)",
        format: "KTM_Nama Tim_Nama Peserta",
        example: "KTM_All Stars_Nayla Putri"
      },
      {
        description: "Scan surat keterangan mahasiswa aktif (JPG/JPEG/PNG)",
        format: "SKMA_Nama Tim_Nama Peserta",
        example: "SKMA_All Stars_Nayla Putri"
      },
      {
        description: "Pas foto 3x4 (JPG/JPEG/PNG)",
        format: "Pasfoto_Nama Tim_Nama Peserta",
        example: "Pasfoto_All Stars_Nayla Putri"
      },
      {
        description: "Scan bukti pembayaran (JPG/JPEG/PNG)",
        format: "Bukti Pembayaran_Nama Tim",
        example: "Bukti Pembayaran_All Stars"
      },
      {
        description: "Scan bukti voucher (JPG/JPEG/PNG)",
        format: "Bukti Voucher_Nama Tim",
        example: "Bukti Voucher_All Stars"
      }
    ]
  }
];
