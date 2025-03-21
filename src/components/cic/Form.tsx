// components/Form.tsx
"use client";
import React, { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { formInstructionsCic } from "@/data/formInstructionsCic";
import { useAuthCheck } from '@/hooks/useAuthCheck';
import Cookies from 'js-cookie'; 
interface TeamMember {
  full_name: string;
  department: string;
  batch: string;
  phone_number: string;
  line_id: string;
  email: string;
  twibbon_link?: string;
  skma_file?: string;
  ktm_file?: string;
  photo_file?: string;
}

interface FormData {
  team: {
    team_name: string;
    institution_name: string;
    payment_proof: string;
    user_id: number;
    email: string;
    voucher?: string;
  };
  leader: TeamMember;
  members: TeamMember[];
}

export function Form() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    team: {
      team_name: "",
      institution_name: "",
      payment_proof: "",
      user_id: user?.id || 0,
      email: "",
      voucher: ""
    },
    leader: {
      full_name: "",
      department: "",
      batch: "",
      phone_number: "",
      line_id: "",
      email: "",
      twibbon_link: "",
      skma_file: "",
      ktm_file: "",
      photo_file: ""
    },
    members: [
      { full_name: "", department: "", batch: "", phone_number: "", line_id: "", email: "", twibbon_link: "", skma_file: "", ktm_file: "", photo_file: "" },
      { full_name: "", department: "", batch: "", phone_number: "", line_id: "", email: "", twibbon_link: "", skma_file: "", ktm_file: "", photo_file: "" },
      { full_name: "", department: "", batch: "", phone_number: "", line_id: "", email: "", twibbon_link: "", skma_file: "", ktm_file: "", photo_file: "" }
    ]
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get('token'); 
      const user = Cookies.get('user');
      
      // Debug logs
      console.log('Form Data being submitted:', {
        team: formData.team,
        leader: formData.leader,
        members: formData.members
      });
      console.log('Token:', token);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/teams/cic/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization header
        },
        body: JSON.stringify(formData)
      });

      // Log response details
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${responseData.message || 'Unknown error'}`);
      }

      alert('Form submitted successfully!');
      // Optionally reset form or redirect
    } catch (error) {
      console.error('Error details:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamInfoChange = (field: keyof typeof formData.team, value: string) => {
    setFormData(prev => ({
      ...prev,
      team: {
        ...prev.team,
        [field]: value
      }
    }));
  };

  const handleMemberChange = (
    type: 'leader' | 'member',
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    if (type === 'leader') {
      setFormData(prev => ({
        ...prev,
        leader: {
          ...prev.leader,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        members: prev.members.map((member, i) =>
          i === index ? { ...member, [field]: value } : member
        )
      }));
    }
  };

  const handleFileChange = (
    type: 'team' | 'leader' | 'member',
    index: number | null,
    field: string,
    file: File | null
  ) => {
    // Store file name or handle file upload as needed
    if (!file) return;
    
    if (type === 'team') {
      handleTeamInfoChange(field as keyof typeof formData.team, file.name);
    } else if (type === 'leader') {
      handleMemberChange('leader', 0, field as keyof TeamMember, file.name);
    } else if (type === 'member' && index !== null) {
      handleMemberChange('member', index, field as keyof TeamMember, file.name);
    }
  };

  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) {
    return null; // Or loading spinner
  }

  const [activeTab, setActiveTab] = useState<"ketua" | "anggota1" | "anggota2" | "anggota3">("ketua");

  const handleTabChange = (tab: "ketua" | "anggota1" | "anggota2" | "anggota3") => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col overflow-hidden sm:overflow-scroll max-w-5xl mx-auto font-openSans">
      <div className="flex flex-col lg:justify-center items-center relative min-w-full">
        <div className="z-[10] min-h-screen flex flex-col">
          {/* Instructions */}
          <div className="text-white mx-4 mt-[3%] lg:mb-[1%] md:text-base lg:text-xl text-[0.7rem]">
            <ol className="list-decimal pl-2">
              {formInstructionsCic.map((instruction, index) => (
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
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 font-openSans">
            {/* Team Info */}
            <Input
              label="Email"
              type="email"
              value={formData.team.email}
              onChange={(e) => handleTeamInfoChange('email', e.target.value)}
              required
            />
            <Input
              label="Nama Tim"
              type="text"
              value={formData.team.team_name}
              onChange={(e) => handleTeamInfoChange('team_name', e.target.value)}
              required
            />
            <Input
              label="Nama Perguruan Tinggi"
              type="text"
              value={formData.team.institution_name}
              onChange={(e) => handleTeamInfoChange('institution_name', e.target.value)}
              required
            />
            <FileInput
              label="Bukti Pembayaran"
              accept="application/pdf"
              onChange={(e) => handleFileChange('team', null, 'payment_proof', e.target.files?.[0] || null)}
              required
              variant="cic"
              helperText="Format Penamaan: Bukti Pembayaran_Nama Tim"
            />
            <FileInput
              label="Bukti Voucher"
              accept="image/*"
              onChange={(e) => handleFileChange('team', null, 'voucher', e.target.files?.[0] || null)}
              variant="cic"
              helperText="Format Penamaan: Bukti Voucher_Nama Tim"
            />
          </form>

          {/* Tabs Section */}
          <div className="w-full mt-[3%]">
            <div className="border-2 rounded-lg">
              {/* Tab Headers */}
              <div className="flex items-center border-b-2 border-white">
                <div
                  className={`flex-1 text-center py-2 rounded-tl-md text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                    activeTab === "ketua" ? "bg-white text-black" : "text-white"
                  }`}
                  onClick={() => handleTabChange("ketua")}
                >
                  <p>Ketua</p>
                </div>
                <div
                  className={`flex-1 text-center py-2 text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                    activeTab === "anggota1" ? "bg-white text-black" : "text-white"
                  }`}
                  onClick={() => handleTabChange("anggota1")}
                >
                  <p>Anggota 1</p>
                </div>
                <div
                  className={`flex-1 text-center py-2 text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                    activeTab === "anggota2" ? "bg-white text-black" : "text-white"
                  }`}
                  onClick={() => handleTabChange("anggota2")}
                >
                  <p>Anggota 2</p>
                </div>
                <div
                  className={`flex-1 text-center py-2 text-[10px] md:text-sm lg:text-lg cursor-pointer ${
                    activeTab === "anggota3" ? "bg-white text-black" : "text-white"
                  }`}
                  onClick={() => handleTabChange("anggota3")}
                >
                  <p>Anggota 3</p>
                </div>
              </div>

              {/* Tab Content */}
              <form className="flex flex-col gap-4 p-4">
                {activeTab === "ketua" && (
                  <>
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      value={formData.leader.full_name}
                      onChange={(e) => handleMemberChange('leader', 0, 'full_name', e.target.value)}
                      required
                    />
                    <Input
                      label="Jurusan"
                      type="text"
                      value={formData.leader.department}
                      onChange={(e) => handleMemberChange('leader', 0, 'department', e.target.value)}
                      helperText="Ketua wajib berasal dari teknik sipil"
                      required
                    />
                    <Input
                      label="Semester"
                      type="text"
                      value={formData.leader.batch}
                      onChange={(e) => handleMemberChange('leader', 0, 'batch', e.target.value)}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.leader.email}
                      onChange={(e) => handleMemberChange('leader', 0, 'email', e.target.value)}
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      value={formData.leader.phone_number}
                      onChange={(e) => handleMemberChange('leader', 0, 'phone_number', e.target.value)}
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      value={formData.leader.line_id}
                      onChange={(e) => handleMemberChange('leader', 0, 'line_id', e.target.value)}
                      required
                    />
                    <Input
                      label="Link Upload Twibbon"
                      type="text"
                      value={formData.leader.twibbon_link}
                      onChange={(e) => handleMemberChange('leader', 0, 'twibbon_link', e.target.value)}
                      helperText="Peserta harap tidak menggunakan private account"
                      required
                    />
                    <FileInput
                      label="Surat Keterangan Mahasiswa Aktif"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('leader', 0, 'skma_file', e.target.files?.[0] || null)}
                      required
                      variant="cic"
                      helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                    />
                    <FileInput
                      label="Kartu Tanda Mahasiswa"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('leader', 0, 'ktm_file', e.target.files?.[0] || null)}
                      required
                      variant="cic"
                      helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('leader', 0, 'photo_file', e.target.files?.[0] || null)}
                      required
                      variant="cic"
                      helperText="Format Penamaan: Pas Foto_Nama Tim_Nama Lengkap"
                    />
                  </>
                )}

                {activeTab === "anggota1" && (
                  <>
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      value={formData.members[0].full_name}
                      onChange={(e) => handleMemberChange('member', 0, 'full_name', e.target.value)}
                      required
                    />
                    <Input
                      label="Jurusan"
                      type="text"
                      value={formData.members[0].department}
                      onChange={(e) => handleMemberChange('member', 0, 'department', e.target.value)}
                      required
                    />
                    <Input
                      label="Semester"
                      type="text"
                      value={formData.members[0].batch}
                      onChange={(e) => handleMemberChange('member', 0, 'batch', e.target.value)}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.members[0].email}
                      onChange={(e) => handleMemberChange('member', 0, 'email', e.target.value)}
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      value={formData.members[0].phone_number}
                      onChange={(e) => handleMemberChange('member', 0, 'phone_number', e.target.value)}
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      value={formData.members[0].line_id}
                      onChange={(e) => handleMemberChange('member', 0, 'line_id', e.target.value)}
                      required
                    />
                    <Input
                      label="Link Upload Twibbon"
                      type="text"
                      value={formData.members[0].twibbon_link}
                      onChange={(e) => handleMemberChange('member', 0, 'twibbon_link', e.target.value)}
                      helperText="Peserta harap tidak menggunakan private account"
                      required
                    />
                    <FileInput
                      label="Surat Keterangan Mahasiswa Aktif"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('member', 0, 'skma_file', e.target.files?.[0] || null)}
                      required
                      variant="cic"
                      helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                    />
                    <FileInput
                      label="Kartu Tanda Mahasiswa"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('member', 0, 'ktm_file', e.target.files?.[0] || null)}
                      required
                      variant="cic"
                      helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('member', 0, 'photo_file', e.target.files?.[0] || null)}
                      required
                      variant="cic"
                      helperText="Format Penamaan: Pas Foto_Nama Tim_Nama Lengkap"
                    />
                  </>
                )}

                {activeTab === "anggota2" && (
                  <>
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      value={formData.members[1].full_name}
                      onChange={(e) => handleMemberChange('member', 1, 'full_name', e.target.value)}
                      required
                    />
                    <Input
                      label="Jurusan"
                      type="text"
                      value={formData.members[1].department}
                      onChange={(e) => handleMemberChange('member', 1, 'department', e.target.value)}
                      required
                    />
                    <Input
                      label="Semester"
                      type="text"
                      value={formData.members[1].batch}
                      onChange={(e) => handleMemberChange('member', 1, 'batch', e.target.value)}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.members[1].email}
                      onChange={(e) => handleMemberChange('member', 1, 'email', e.target.value)}
                      required
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      value={formData.members[1].phone_number}
                      onChange={(e) => handleMemberChange('member', 1, 'phone_number', e.target.value)}
                      required
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      value={formData.members[1].line_id}
                      onChange={(e) => handleMemberChange('member', 1, 'line_id', e.target.value)}
                      required
                    />
                    <Input
                      label="Link Upload Twibbon"
                      type="text"
                      value={formData.members[1].twibbon_link}
                      onChange={(e) => handleMemberChange('member', 1, 'twibbon_link', e.target.value)}
                      helperText="Peserta harap tidak menggunakan private account"
                      required
                    />
                    <FileInput
                      label="Surat Keterangan Mahasiswa Aktif"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('member', 1, 'skma_file', e.target.files?.[0] || null)}
                      required
                      variant="cic"
                      helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                    />
                    <FileInput
                      label="Kartu Tanda Mahasiswa"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('member', 1, 'ktm_file', e.target.files?.[0] || null)}
                      required
                      variant="cic"
                      helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('member', 1, 'photo_file', e.target.files?.[0] || null)}
                      required
                      variant="cic"
                      helperText="Format Penamaan: Pas Foto_Nama Tim_Nama Lengkap"
                    />
                  </>
                )}

                {activeTab === "anggota3" && (
                  <>
                    <Input
                      label="Nama Lengkap"
                      type="text"
                      value={formData.members[2].full_name}
                      onChange={(e) => handleMemberChange('member', 2, 'full_name', e.target.value)}
                    />
                    <Input
                      label="Jurusan"
                      type="text"
                      value={formData.members[2].department}
                      onChange={(e) => handleMemberChange('member', 2, 'department', e.target.value)}
                    />
                    <Input
                      label="Semester"
                      type="text"
                      value={formData.members[2].batch}
                      onChange={(e) => handleMemberChange('member', 2, 'batch', e.target.value)}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.members[2].email}
                      onChange={(e) => handleMemberChange('member', 2, 'email', e.target.value)}
                    />
                    <Input
                      label="Nomor Whatsapp"
                      type="text"
                      value={formData.members[2].phone_number}
                      onChange={(e) => handleMemberChange('member', 2, 'phone_number', e.target.value)}
                    />
                    <Input
                      label="ID Line"
                      type="text"
                      value={formData.members[2].line_id}
                      onChange={(e) => handleMemberChange('member', 2, 'line_id', e.target.value)}
                    />
                    <Input
                      label="Link Upload Twibbon"
                      type="text"
                      value={formData.members[2].twibbon_link}
                      onChange={(e) => handleMemberChange('member', 2, 'twibbon_link', e.target.value)}
                      helperText="Peserta harap tidak menggunakan private account"
                    />
                    <FileInput
                      label="Surat Keterangan Mahasiswa Aktif"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('member', 2, 'skma_file', e.target.files?.[0] || null)}
                      variant="cic"
                      helperText="Format Penamaan: SKMA_Nama Tim_Nama Lengkap"
                    />
                    <FileInput
                      label="Kartu Tanda Mahasiswa"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('member', 2, 'ktm_file', e.target.files?.[0] || null)}
                      variant="cic"
                      helperText="Format Penamaan: KTM_Nama Tim_Nama Peserta"
                    />
                    <FileInput
                      label="Pas Foto 3x4"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('member', 2, 'photo_file', e.target.files?.[0] || null)}
                      variant="cic"
                      helperText="Format Penamaan: Pas Foto_Nama Tim_Nama Lengkap"
                    />
                  </>
                )}
              </form>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full mt-4 p-2">
            <Button 
              variant="cic-primary" 
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? 'Mengirim...' : 'Kirim Formulir'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}