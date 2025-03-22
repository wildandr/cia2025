"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Define an interface for the user data
interface UserData {
  eventId: number;
  // Add other user properties as needed
}

export default function Page() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        // Parse the cookie string to an object
        const parsedUserData = JSON.parse(userCookie);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        setUserData(null);
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {
      router.push(
        `/admin/${
          userData.eventId === 1
            ? "fcec"
            : userData.eventId === 2
            ? "craft"
            : userData.eventId === 3
            ? "sbc"
            : userData.eventId === 4
            ? "cic"
            : "#"
        }`
      );
    }
  }, [userData, router]);

  return null;
}
