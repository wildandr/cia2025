"use client";

import Dashboard from "@/components/dashboard/user/Dashboard";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Page() {
  const [userData, setUserData] = useState<string | undefined>("");

  useEffect(() => {
    // Mengambil data cookie saat komponen dimount (client-side)
    const userCookie = Cookies.get("user");
    setUserData(userCookie);
  }, []);

  return (
    <div className="">
      <Dashboard />
    </div>
  );
}
