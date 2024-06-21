import GuestHeader from "@/components/Main/GuestHeder";
import Report from "../features/report/components/Report";

export default function Home() {
  return (
    <>
      <div className="w-[1440px] h-full bg-[#f1f3f8] p-28 ">
        <GuestHeader />
        <Report />
      </div>
    </>
  );
}
