import DetailUserCraft from "@/components/dashboard/user/Detailcraft";

export default function DetailDashboard({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="">
      <DetailUserCraft params={{ id: params.id }} />
    </div>
  );
}
