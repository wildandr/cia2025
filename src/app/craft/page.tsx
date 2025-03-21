import { MobileLayout } from "@/components/craft/MobileLayout";
import { DesktopLayout } from "@/components/craft/DesktopLayout";

export default function CRAFT() {
  return (
    <main className="relative min-h-screen flex flex-col items-center bg-craft-primary">
      <MobileLayout />
      <DesktopLayout />
    </main>
  );
}
