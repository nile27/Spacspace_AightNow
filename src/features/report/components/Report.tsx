import Icon from "@/components/Stock/Icon";
import Summary from "./Summary";
import Chart from "./Chart";
import FavoriteNews from "./FavoriteNews";
import RadarChart from "@/features/Watchlist/components/RadarChart";
import { exchangeRate, stockAction, stockAction2 } from "@/lib/stockAction";
import AddToWatchListButton from "./AddToWatchListButton";
import StockAnalysis from "./StockAnalysis";
import { stockRealTime } from "@/lib/stockRealTime";

type TParams = {
  id: string;
};

export default async function Report({ id }: TParams) {
  // 주식데이터 가져오기
  const appleStock = await stockAction(id);
  const appleStock2 = await stockAction2(id);
  const { stockName, reutersCode } = appleStock2;
  const stockCode = reutersCode.split(".")[0];
  const stockHistory = await stockRealTime(id);
  const exchange = await exchangeRate();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-[1200px] h-16  flex justify-between items-center  ">
          <div className="w-[388px] h-16 flex items-center gap-2">
            <Icon name={id} size={50} />
            <span className="text-lg font-medium">
              {stockName} · {stockCode}
            </span>
          </div>
          <AddToWatchListButton stockName={stockName} />
        </div>
        <div className="w-[1200px] flex gap-4">
          <Summary overview={appleStock} stockInfo={appleStock2} exchange={exchange} />
          <Chart stockData={stockHistory} />
        </div>
        <div className=" w-[1200px] flex gap-4 ">
          <div className="w-[429px] h-[297px] bg-white rounded-2xl p-4">
            <div className="font-['pretendard'] font-bold text-2xl">종목 AI 리포트 점수</div>
            <RadarChart stockName={id} width={400} />
          </div>
          <StockAnalysis
            stockName={stockName}
            stockInfo={appleStock2}
            id={id}
            exchange={exchange}
          />
        </div>
        <FavoriteNews />
      </div>
    </>
  );
}
