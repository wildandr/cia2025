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
    text: "FCEC 2024 mengusung tema \"Strategi generasi muda dalam menciptakan pembangunan berwawasan lingkungan dan pemanfaatan sumberdaya berkelanjutan\"."
  },
  {
    text: "Periode pendaftaran dimulai dari 17 Februari 2024 hingga 10 Maret 2024 pukul 23:59 WIB."
  },
  {
    text: "Contact Person yang dapat dihubungi:\nAra (WA: 08971243798)\nHaya (WA: 085643172448)"
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
  }
];
