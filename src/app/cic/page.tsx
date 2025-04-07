"use client";

import { MobileLayout } from "@/components/cic/MobileLayout";
import { DesktopLayout } from "@/components/cic/DesktopLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export default function CIC() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          Cookies.remove("token", { path: "/" });
          Cookies.remove("user", { path: "/" });
          router.push("/login");
          router.refresh();
        }
      } catch (error) {
        console.error("Token validation error:", error);
        Cookies.remove("token", { path: "/" });
        Cookies.remove("user", { path: "/" });
        router.push("/login");
        router.refresh();
      }
    };

    checkToken();
  }, [router]);

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-cic-primary">
      <MobileLayout />
      <DesktopLayout />
    </main>
  );
}
