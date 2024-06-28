import Header from "@/components/Header";
import Watchlist from "@/features/Watchlist/components/Watchlist";

export default function page() {
  return (
    <>
      <div className=" xl:opacity-20 2xl:opacity-90 ">
        <Header />
      </div>
      <div className="w-full h-full bg-scaleGray-400 opacity-90 flex justify-center items-center">
        <Watchlist />
      </div>
    </>
  );
}
