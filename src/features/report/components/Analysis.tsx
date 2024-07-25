// AnalysisClient.tsx (클라이언트 컴포넌트)
"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/Stock/Icon";
import { TStockinfo } from "./Summary";
import { useExchange } from "@/Store/store";

export default function AnalysisClient({
  stockName,
  stockInfo,
  id,
  exchange,
  report,
}: {
  stockName: string;
  stockInfo: TStockinfo;
  id: string;
  exchange: string;
  report: string;
}) {
  const { closePrice, compareToPreviousClosePrice, fluctuationsRatio, compareToPreviousPrice } =
    stockInfo;
  const compareUpDown = compareToPreviousPrice.code;
  const { isChange } = useExchange();
  const [result, setResult] = useState("");

  useEffect(() => {
    const won = Number(exchange.replace(/,/g, ""));
    const dollar = Number(closePrice);
    const test = won * dollar;
    setResult(test.toLocaleString().slice(0, 7));
  }, [exchange, closePrice]);

  return (
    <div className="w-[750px] h-[295px] p-8 bg-white font-['Pretendard'] rounded-2xl">
      <h2 className="font-bold">아잇나우 AI 애널리스트 리포트</h2>
      <div className="w-[323px] h-8  flex gap-2 mt-5 item-center">
        <Icon name={id} size={32} />
        <div className=" flex justify-between items-center gap-1 font-medium ">
          <span>{stockName}</span>
          <span>∙</span>
          {isChange ? `₩ ${result}` : `$ ${closePrice}`}
          <span className={`${compareUpDown === "2" ? "text-rose-500" : "text-blue-500"}`}>
            {compareUpDown === "2"
              ? `▲${compareToPreviousClosePrice} `
              : `▼${compareToPreviousClosePrice} `}
          </span>
          <span className={`${compareUpDown === "2" ? "text-rose-500" : "text-blue-500"}`}>
            {fluctuationsRatio}%
          </span>
        </div>
      </div>
      <div className="w-[686px] h-24 mt-4 inline-flex justify-start items-start gap-2.5 ">
        <div className="grow shrink basis-0   text-black  font-medium leading-normal line-clamp-5">
          {report}
        </div>
      </div>
    </div>
  );
}
