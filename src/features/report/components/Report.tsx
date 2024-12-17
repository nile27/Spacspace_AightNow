import Icon from "@/components/Stock/Icon";
import Summary from "./Summary";
import Chart from "./Chart";
import FavoriteNews from "./FavoriteNews";
import { exchangeRate, stockAction, stockAction2 } from "@/lib/stockAction";
import AddToWatchListButton from "./AddToWatchListButton";
import StockAnalysis from "./StockAnalysis";
import { stockRealTime } from "@/lib/stockRealTime";
import ClientRadarChart from "./ClientRadarChart";

type TParams = {
  id: string;
};

export default async function Report({ id }: TParams) {
  try {
    // 주식데이터 가져오기
    // const appleStock = await stockAction(id);
    // const appleStock2 = await stockAction2(id);
    // const { stockName, reutersCode } = appleStock2;
    // const stockCode = reutersCode.split(".")[0];
    // const stockHistory = await stockRealTime(id);
    // const exchange = await exchangeRate();

    const appleStock = (await stockAction(id)) || {};
    console.log("appleStock:", appleStock);

    const appleStock2 = (await stockAction2(id)) || {};
    console.log("appleStock2:", appleStock2);

    const stockHistory = (await stockRealTime(id)) || [];
    console.log("stockHistory:", stockHistory);

    const exchange = (await exchangeRate()) || "0";
    console.log("exchange:", exchange);

    const { stockName, reutersCode } = appleStock2 || {};
    const stockCode = reutersCode ? reutersCode.split(".")[0] : "N/A";

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
            <Summary
              overview={appleStock || "No data available"}
              stockInfo={appleStock2 || {}}
              exchange={exchange || 0}
            />
            <Chart stockData={stockHistory} />
          </div>
          <div className=" w-[1200px] flex gap-4 ">
            <div className="w-[429px] h-[297px] bg-white rounded-2xl p-4">
              <div className="font-['pretendard'] font-bold text-2xl">종목 AI 리포트 점수</div>
              <ClientRadarChart stockName={id} />
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
  } catch (error) {
    console.error("Error in Report component:", error);
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <h1 className="text-2xl font-bold mb-4">죄송합니다. 데이터를 불러오는데 실패했습니다.</h1>
        <p className="text-gray-600 mb-2">
          {error instanceof Error && error.message.includes("Invalid stock symbol")
            ? "지원하지 않는 주식 종목입니다."
            : "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."}
        </p>
        <p className="text-sm text-gray-500">
          지원하는 종목: APPLE, TESLA, GOOGLE, MICROSOFT, AMAZON, UNITY
        </p>
      </div>
    );
  }
}
