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

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, username, password });
  };

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
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
            className="w-2/5 md:w-3/5 xl:w-4/5 h-auto z-10"
            width={500}
            height={500}
          />
        </div>
        <Image
          alt="title"
          src="/assets/autentikasi/title.svg"
          className="w-3/5 md:w-2/5 xl:w-3/5 h-auto z-10"
          width={500}
          height={500}
        />
      </div>
      <div className="h-4/5 lg:h-full w-full xl:w-4/5 flex flex-col py-[4%]">
        <div className="flex flex-col h-full bg-[url('/assets/autentikasi/bg-form-mobile.svg')] md:bg-[url('/assets/autentikasi/bg-form-md.svg')] lg:bg-[url('/assets/autentikasi/bg-form.svg')] bg-contain lg:bg-cover bg-center lg:bg-left bg-no-repeat justify-center items-center xl:items-start xl:ps-[10%] z-10">
          <div className="w-full h-full flex flex-col justify-center px-[20%] xl:px-8 xl:ps-[10%]">
            <div className="flex flex-col w-full">
              <h1 className="text-xl md:text-2xl 2xl:text-4xl font-medium text-white mb-3">
                Masuk
              </h1>

              <p className="text-sm 2xl:text-base text-white mb-6">
                Jika kamu belum memiliki akun, <br /> kamu dapat{" "}
                <a href="/register" className="font-bold underline">
                  Daftar disini!
                </a>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded text-white">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-white text-sm 2xl:text-xl"
                  htmlFor="email"
                >
                  Username/Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="text"
                    placeholder="Masukkan alamat emailmu"
                    className="login-input"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setUsername(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label
                  className="block text-white text-sm 2xl:text-xl"
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
                    type={isVisible ? "text" : "password"}
                    placeholder="Masukkan passwordmu disini"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
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
                {isLoading ? "Memproses..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
