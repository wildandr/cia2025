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
    text: "Periode pendaftaran dimulai pada tanggal 22 Maret 2025 - 30 April 2025"
  },
  {
    text: "Peserta diharapkan untuk membayar biaya pendaftaran sebesar Rp300.000/tim yang dapat dilakukan dengan cara transfer ke rekening 1370022414649 Bank Mandiri atas nama NAOMI ELLENA MANURUN dengan menambahkan kode unik 13 (nominal yang dibayarkan menjadi Rp300.013,00)"
  },
  {
    text: 'Dalam proses transaksi/transfer, peserta diharapkan untuk menambahkan keterangan "Registrasi SBC 2025" pada kolom keterangan/catatan pembayaran;'
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
  },
  {
    text: "Contact Person yang dapat dihubungi:\na. Muhammad Chairul Nusantara (Nusa)\nWhatsApp: 081311783896\nLine: 24042006_\nb. Michelle Moody Hadhinoto (Moody)\nWhatsApp: 0895397075008\nLine: michellemoody"
  }
  
];
