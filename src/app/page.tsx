import Image from "next/image";
import Hero from "@/components/home/Hero";
import Tema from "@/components/home/Tema";
import Event from "@/components/home/Event";
import Utama from "@/components/home/Utama";
import Galeri from "@/components/home/Galeri";
import Contact from "@/components/home/Contact";
import Sponsorship from "@/components/home/Sponsorship";
import Mediapatner from "@/components/home/Mediapatner";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Tema />
      <Event />
      <Utama />
      {/* <Galeri /> */}
      {/* <Contact /> */}
      {/* <Sponsorship />
      <Mediapatner /> */}
    </div>
  );
}
