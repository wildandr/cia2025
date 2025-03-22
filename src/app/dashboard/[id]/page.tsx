import DetailCIC from "@/components/dashboard/user/Detailcic";
import Detailsbc from "@/components/dashboard/user/Detailsbc";
import Detailfcec from "@/components/dashboard/user/Detailfcec";

export default function DetailDashboard({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id);
  const separated = params.id.split("%26");

  let int1 = parseInt(separated[0]);
  let int2 = parseInt(separated[1]);

  console.log(int1);
  console.log(int2);

  return (
    <div className="">
      {int1 === 1 && <Detailfcec params={{ id: int2.toString() }} />}
      {int1 === 3 && <Detailsbc params={{ id: int2.toString() }} />}
      {int1 === 4 && <DetailCIC params={{ id: int2.toString() }} />}
    </div>
  );
}
