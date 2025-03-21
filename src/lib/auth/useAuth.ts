"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface LoginCredentials {
  email: string;
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  eventId?: string;
}

interface UseAuthReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseURL}/user/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      if (data.message === "User logged in successfully") {
        Cookies.set("token", data.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
        router.push("/dashboard");
      } else {
        setError(data.message || "Login gagal");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Terjadi kesalahan saat login"
        );
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${baseURL}/user/register`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.message === "User created successfully") {
        if (data.token) {
          Cookies.set("token", data.token, { expires: 7 });
          Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      } else {
        setError(data.message || "Pendaftaran gagal");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Terjadi kesalahan saat pendaftaran"
        );
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
};
