import { MobileLayout } from "@/components/fcec/MobileLayout";
import { DesktopLayout } from "@/components/fcec/DesktopLayout";

export default function FCEC() {
  return (
    <main className="relative min-h-screen flex flex-col items-center bg-fcec-primary">
      <MobileLayout />
      <DesktopLayout />
    </main>
  );
}
