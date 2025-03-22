import DetailUserFcec from "@/components/dashboard/user/Detailfcec";

export default function DetailDashboard({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="">
      <DetailUserFcec params={{ id: params.id }} />
    </div>
  );
}
