"use client";
import Toggle from "@/components/Toggle/Toggle";
import { useExchange } from "@/Store/store";
import { useEffect } from "react";

export type TStockinfo = {
  stockName: string;
  compareToPreviousPrice: {
    code: string;
  };
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  reutersCode: string;
};

export type TSummary = {
  overview?: string;
  stockInfo: TStockinfo;
  exchange: string;
};

export default function Summary({ overview, stockInfo, exchange }: TSummary) {
  const { isChange } = useExchange();
  const {
    closePrice = "0",
    compareToPreviousClosePrice = "0",
    fluctuationsRatio = "0",
    reutersCode = "",
    compareToPreviousPrice = { code: "0" },
  } = stockInfo || {};

  useEffect(() => {
    console.log("Debugging stockInfo:", stockInfo);
  }, [stockInfo]);

  const stockCode =
    reutersCode && typeof reutersCode === "string" ? reutersCode.split(".")[0] : "N/A";

  const compareUpDown = compareToPreviousPrice.code;
  const won = Number(exchange.replace(/,/g, ""));
  const dollar = Number(closePrice);
  const test = won * dollar;
  const result = test.toLocaleString().slice(0, 7);

  return (
    <>
      <div className="w-[488px] h-64 flex flex-wrap justify-between items-start border bg-white rounded-2xl p-4">
        <div className="flex flex-col">
          <div className="text-black/opacity-20 text-2xl font-bold font-['Pretendard'] text-mainNavy-900 leading-loose">
            {isChange === true ? `₩ ${result} ∙ ${stockCode}` : `$ ${closePrice} ∙ ${stockCode}`}
          </div>
          <div className="w-[133px] flex gap-4">
            <div
              className={`text-left ${
                compareUpDown === "2" ? "text-rose-500" : "text-blue-500"
              } text-xl font-['Pretendard'] leading-7`}
            >
              {compareUpDown === "2"
                ? `▲${compareToPreviousClosePrice} `
                : `▼${compareToPreviousClosePrice} `}
            </div>
            <div
              className={`text-left ${
                compareUpDown === "2" ? "text-rose-500" : "text-blue-500"
              } text-xl font-['Pretendard'] leading-7`}
            >
              {fluctuationsRatio}%
            </div>
          </div>
        </div>
        <Toggle />
        <div className="w-[424px] h-24 line-clamp-5  text-neutral-900 text-base font-normal font-['Pretendard'] leading-normal">
          {overview || "No overview available"}
        </div>
      </div>
    </>
  );
}
