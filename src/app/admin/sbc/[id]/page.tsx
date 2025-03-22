import DetailUsersbc from "@/components/dashboard/user/Detailsbc";

export default function DetailDashboard({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="">
      <DetailUsersbc params={{ id: params.id }} />
    </div>
  );
}
