"use client";

import Icon from "@/components/Stock/Icon";
import { TStockinfo } from "./Summary";

export default function Analysis({
  stockName,
  stockInfo,
  report,
}: {
  stockName: string;
  stockInfo: TStockinfo;
  report: string;
}) {
  const { closePrice, compareToPreviousClosePrice, fluctuationsRatio } = stockInfo;

  return (
    <>
      <div className="w-[750px] h-[295px] p-8 bg-white font-['Pretendard'] rounded-2xl">
        <h2 className="font-bold">아잇나우 AI 애널리스트 리포트</h2>
        <div className="w-[323px] h-8  flex gap-2 mt-5 item-center">
          <Icon name={stockName} size={32} />
          <div className=" flex justify-between items-center gap-1 font-medium ">
            <span>{stockName}</span>
            <span>∙</span>
            <span>${closePrice}</span>
            <span className="text-rose-500">▲+{compareToPreviousClosePrice}</span>
            <span className="text-rose-500">+{fluctuationsRatio}%</span>
          </div>
        </div>
        <div className="w-[686px] h-24 mt-4 inline-flex justify-start items-start gap-2.5 ">
          <div className="grow shrink basis-0 text-black text-base font-medium leading-normal">
            {report}
          </div>
        </div>
      </div>
    </>
  );
}
