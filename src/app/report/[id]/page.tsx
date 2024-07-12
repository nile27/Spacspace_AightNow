import Header from "@/components/Header";
import Report from "@/features/report/components/Report";

export default function page({ params }: any) {
  const { id } = params;
  console.log(id);
  return (
    <>
      <Header />
      <div className="h-full mt-52">
        <Report id={id} />
      </div>
    </>
  );
}
