import DetailCraft from "@/components/dashboard/user/Detailcraft";

export default function CraftDetail({ params }: { params: { id: string } }) {
  return <DetailCraft params={params} />;
}
