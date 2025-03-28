import DetailUserCic from "@/components/dashboard/user/Detailcic";

export default function DetailDashboard({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="">
      <DetailUserCic params={{ id: params.id }} />
    </div>
  );
}
