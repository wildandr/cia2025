"use client";

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
    <div className="flex flex-col bg-white text-black min-h-screen justify-center items-center">
      <h1>Dashboard</h1>
      <p>{userData}</p>
    </div>
  );
}
