import { MobileLayout } from "@/components/cic/MobileLayout";
import { DesktopLayout } from "@/components/cic/DesktopLayout";

export default function CIC() {
  return (
    <main className="relative min-h-screen flex flex-col items-center bg-cic-primary">
      <MobileLayout />
      <DesktopLayout />
    </main>
  );
}
