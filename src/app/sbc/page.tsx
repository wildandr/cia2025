import { MobileLayout } from "@/components/sbc/MobileLayout";
import { DesktopLayout } from "@/components/sbc/DesktopLayout";

export default function SBC() {
  return (
    <main className="relative min-h-screen flex flex-col items-center bg-sbc-primary">
      <MobileLayout />
      <DesktopLayout />
    </main>
  );
}
