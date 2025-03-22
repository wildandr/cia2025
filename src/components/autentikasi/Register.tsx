"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MailIcon,
  UserIcon,
  PasswordIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from "@/components/icons";
import { useAuth } from "@/lib/auth/useAuth"; // Sesuaikan path jika perlu

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false); // State untuk validasi password
  const { register, isLoading, error } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset pesan kesalahan sebelum validasi
    setPasswordMismatch(false);

    // Validasi password
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return; // Hentikan proses jika password tidak cocok
    }

    // Panggil fungsi register dari useAuth jika validasi lolos
    await register({
      email,
      username,
      password,
      isAdmin: false, // Default false, sesuaikan jika perlu
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  return (
    <main className="h-screen flex flex-col xl:flex-row items-center justify-center pt-10 bg-cia-primary text-white bg-[url('/assets/autentikasi/teksture.svg')] bg-cover bg-center font-plusJakarta relative">
      <Image
        alt="background"
        src={"/assets/autentikasi/teksture_city.svg"}
        width={500}
        height={500}
        className="w-full h-auto absolute bottom-0"
      />
      <div className="h-2/5 lg:h-full w-full flex flex-col justify-end lg:justify-center items-center relative px-8 z-50">
        <div className="absolute top-[15%] left-[15%]">
          <Image
            alt="title"
            src="/assets/autentikasi/star.svg"
            className="w-2/5 md:w-3/5 lg:w-4/5 h-auto z-10"
            width={500}
            height={500}
          />
        </div>
        <Image
          alt="title"
          src="/assets/autentikasi/title.svg"
          className="w-3/5 md:w-2/5 lg:w-3/5 h-auto z-10"
          width={500}
          height={500}
        />
      </div>
      <div className="h-4/5 md:h-3/5 lg:h-full w-full xl:w-4/5 flex flex-col">
        <div className="flex flex-col h-full bg-[url('/assets/autentikasi/bg-form-mobile.svg')] md:bg-[url('/assets/autentikasi/bg-form-md.svg')] lg:bg-[url('/assets/autentikasi/bg-form.svg')] bg-contain lg:bg-cover bg-center lg:bg-left bg-no-repeat justify-center items-center lg:items-start lg:ps-[10%] z-10">
          <div className="w-full h-full flex flex-col justify-center px-[20%] lg:px-8 lg:ps-[10%]">
            <div className="flex flex-col w-full">
              <h1 className="text-lg md:text-2xl 2xl:text-4xl font-medium text-white mb-1">
                Daftar
              </h1>
              <p className="text-xs md:text-sm 2xl:text-base text-white mb-3">
                Sudah memiliki akun? <br /> kamu bisa{" "}
                <a href="/login" className="font-bold underline">
                  Masuk disini!
                </a>
              </p>
            </div>

            {/* Tampilkan pesan error dari useAuth */}
            {error && (
              <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded text-white text-sm font-medium">
                {error}
              </div>
            )}

            {/* Tampilkan pesan kesalahan jika password tidak cocok */}
            {passwordMismatch && (
              <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded text-white text-sm font-medium">
                Password dan konfirmasi password tidak cocok
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label
                  className="block text-white text-xs md:text-base 2xl:text-xl"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Masukkan alamat emailmu"
                    className="pl-10 pr-3 py-2 w-full bg-transparent border-b border-white text-white text-xs md:text-base 2xl:text-xl focus:outline-none autofill:text-white autofill:bg-transparent placeholder:text-white/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-white text-xs md:text-base 2xl:text-xl"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    className="pl-10 pr-3 py-2 w-full bg-transparent border-b border-white text-white 2xl:text-xl focus:outline-none autofill:text-white autofill:bg-transparent placeholder:text-white/50"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-white text-xs md:text-base 2xl:text-xl"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <PasswordIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Masukkan passwordmu"
                    className="pl-10 pr-10 py-2 w-full bg-transparent border-b border-white text-white 2xl:text-xl focus:outline-none autofill:bg-transparent placeholder:text-white/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <EyeFilledIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashFilledIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <label
                  className="block text-white text-xs md:text-base 2xl:text-xl"
                  htmlFor="confirmPassword"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <PasswordIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="Konfirmasi passwordmu"
                    className="pl-10 pr-10 py-2 w-full bg-transparent border-b border-white text-white text-xs md:text-base 2xl:text-xl focus:outline-none autofill:bg-transparent placeholder:text-white/50"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeFilledIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashFilledIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-full hover:bg-white transition duration-300 disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Daftar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
