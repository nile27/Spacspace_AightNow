import { StockData } from "@/app/api/(crawler)/news/stock/[stock]/route";
import Icon from "./Icon";
import { TStockInfo } from "@/features/Watchlist/components/WatchListCard";

type TStock = {
  logo: string;
  gap?: string;
  data: StockData | TStockInfo | null;
};

export const STOCK_NAMES: { [key: string]: string } = {
  tesla: "테슬라",
  google: "구글",
  apple: "애플",
  microsoft: "마이크로소프트",
  amazon: "아마존",
  unity: "유니티",
};

export const STOCK_CODE: { [key: string]: string } = {
  tesla: "TSLA",
  google: "GOOGL",
  apple: "AAPL",
  microsoft: "MSFT",
  amazon: "AMZN",
  unity: "U",
};

export default function Stock({ logo, gap, data }: TStock) {
  if (!data) return null;
  const {
    reutersCode,
    closePrice,
    compareToPreviousPrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
  } = data;

  return (
    <>
      <button className="flex flex-col  justify-start items-start ">
        <div className="flex-col justify-start items-center flex">
          <div className={`w-full ${gap} py-2 flex justify-between items-center`}>
            <div className="flex justify-start items-center gap-4">
              <div className="flex items-center">
                <Icon name={STOCK_NAMES[logo]} size={50} />
              </div>
              <div className="flex flex-col justify-start items-start">
                <div className="text-neutral-900 text-base font-bold font-['Pretendard'] leading-normal">
                  {STOCK_NAMES[logo]}
                </div>
                <div className="text-neutral-900 text-sm font-normal font-['Pretendard'] leading-tight">
                  {reutersCode.slice(0, 4)}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-y-2">
              <div className="text-right text-neutral-900 text-sm font-medium font-['Pretendard'] leading-tight">
                ${closePrice}
              </div>
              <div className="flex justify-end items-start gap-2">
                <div
                  className={`text-right ${
                    compareToPreviousPrice.code === "5" ? "text-secondBlue-500" : "text-warning"
                  } text-xs font-normal font-['Pretendard'] leading-none`}
                >
                  {compareToPreviousPrice.code === "5" ? "▼" : "▲"}
                  {compareToPreviousClosePrice.toString().replace("-", "")}
                </div>
                <div
                  className={`text-right ${
                    compareToPreviousPrice.code === "5" ? "text-secondBlue-500" : "text-warning"
                  } text-xs font-normal font-['Pretendard'] leading-none`}
                >
                  {compareToPreviousPrice.code === "5" ? "" : "+"}
                  {fluctuationsRatio}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
}
