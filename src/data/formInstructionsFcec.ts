interface DocumentRequirement {
  description: string;
  format: string;
  example: string;
}

interface Instruction {
  text: string;
  documents?: DocumentRequirement[];
}

export const formInstructionsFcec: Instruction[] = [
  {
    text: "FCEC (Future Civil Engineer Challenge) merupakan salah satu rangkaian acara 12th Civil in Action yang berfokus pada karya tulis ilmiah di bidang teknik sipil, lingkungan, dan sumber daya air untuk tingkatan SMA dan/atau sederajat."
  },
  {
    text: "FCEC 2025 mengusung tema \"Optimalkan Biaya dan Waktu Proyek dengan BIM 5D: Membangun Masa Depan Berkelanjutan di 8 Dekade Indonesia Merdeka\"."
  },
  {
    text: "Periode pendaftaran dimulai dari 22 Maret 2025 hingga 25 April 2025 pukul 23:59 WIB."
  },
  {
    text: "Contact Person yang dapat dihubungi:\nNaiwa (WA:081346158069, Line:naiwaaa)  \nAlma (WA:08211601749, Line:aalmaaulian)"
  },
  {
    text: "Ikuti akun sosial media kami untuk informasi lebih lanjut:\nInstagram: @civilinaction\nTiktok: @cia.ugm\nLinkedin: Civil in Action\nYoutube: Civil in Action"
  },
  {
    text: "Peserta diharapkan mengunggah dokumen sesuai dengan ketentuan berikut:",
    documents: [
      {
        description: "File Abstrak (PDF/JPG/JPEG/PNG)",
        format: "Nama Tim_Abstrak",
        example: "Eco Warriors_Abstrak"
      },
      {
        description: "Surat Pernyataan Orisinalitas (PDF/JPG/JPEG/PNG)",
        format: "Nama Tim_Surat Pernyataan Orisinalitas",
        example: "Eco Warriors_Surat Pernyataan Orisinalitas"
      },
      {
        description: "Kartu Tanda Pengenal (PDF/JPG/JPEG/PNG)",
        format: "Nama Tim_Kartu Identitas_Nama Lengkap",
        example: "Eco Warriors_Kartu Identitas_John Doe"
      },
      {
        description: "Surat Pernyataan Siswa Aktif (PDF/JPG/JPEG/PNG)",
        format: "Nama Tim_Surat Pernyataan Siswa Aktif_Nama Lengkap",
        example: "Eco Warriors_Surat Pernyataan Siswa Aktif_John Doe"
      },
      {
        description: "Pas Foto 3x4 (JPG/JPEG/PNG)",
        format: "Nama Tim_Pas Foto_Nama Lengkap",
        example: "Eco Warriors_Pas Foto_John Doe"
      }
    ]
  },
  {
    text: "Biaya Registrasi Rp150.000 bagi tim yang dibayarkan jika lolos ke tahap paper. Pengumpulan abstrak tidak dipungut biaya pendaftaran."
  },

];
