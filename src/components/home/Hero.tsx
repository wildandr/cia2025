"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rotation >= 30 || rotation <= 1) {
        setDirection((prevDirection) => -prevDirection);
      }
      setRotation((prevRotation) => prevRotation + 30 * direction);
    }, 500);

    return () => clearInterval(interval);
  }, [rotation, direction]);

  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };
  const handleRegisterClick = () => {
    router.push("/register");
  };

  return <div className="flex flex-col lg:flex-row"></div>;
}
