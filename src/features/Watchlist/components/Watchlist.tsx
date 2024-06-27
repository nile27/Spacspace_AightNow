import StockList from "@/components/Stock/StockList";
import WatchInput from "./WatchInput";

export default function Watchlist() {
  return (
    <>
      <div className="w-[794px] h-[735px] bg-white font-pretendard p-10 rounded-[32px]">
        <div className="font-bold text-2xl text-mainNavy-900 text-center">관심종목 추가</div>
        <div>
          <WatchInput />
        </div>

        <div className="w-[714px] h-[332px] mt-12">
          <h2 className="text-lg text-mainNavy-900">인기검색어</h2>
          <div className="w-[714px] h-[288px] flex justify-center items-center gap-6  border border-scaleGray-400 rounded-2xl ">
            <div>
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
            </div>
            <div>
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
