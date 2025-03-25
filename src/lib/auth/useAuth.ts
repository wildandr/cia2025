"use client";

import { useState, useCallback } from "react";
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

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          `${baseURL}/user/login`,
          credentials,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        if (data.message === "User logged in successfully" && data.token) {
          Cookies.set("token", data.token, { expires: 1, path: "/" });
          Cookies.set("user", JSON.stringify(data.user), {
            expires: 1,
            path: "/",
          });

          // Refresh router sebelum redirect
          await router.refresh();

          // Redirect berdasarkan role
          const redirectPath = data.user.isAdmin ? "/admin" : "/dashboard";
          router.push(redirectPath);

          // Tambahkan delay kecil untuk memastikan redirect
          setTimeout(() => {
            window.location.href = redirectPath; // Fallback jika router.push gagal
          }, 100);
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
    },
    [router]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<void> => {
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
            Cookies.set("token", data.token, { expires: 7, path: "/" });
            Cookies.set("user", JSON.stringify(data.user), {
              expires: 7,
              path: "/",
            });

            await router.refresh();

            const redirectPath = credentials.isAdmin ? "/admin" : "/dashboard";
            router.push(redirectPath);

            setTimeout(() => {
              window.location.href = redirectPath;
            }, 100);
          } else {
            router.push("/login");
            setTimeout(() => {
              window.location.href = "/login";
            }, 100);
          }
        } else {
          setError(data.message || "Pendaftaran gagal");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Terjadi kesalahan saat pendaftaran"
          );
        } else {
          setError("Terjadi kesalahan yang tidak diketahui");
        }
        console.error("Register error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback((): void => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user", { path: "/" });
    router.push("/login");
    setTimeout(() => {
      router.refresh();
      window.location.reload();
    }, 100);
  }, [router]);

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
};
