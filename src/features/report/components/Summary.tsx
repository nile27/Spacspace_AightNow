import Toggle from "@/components/Toggle/Toggle";

export type TStockinfo = {
  stockName: string;
  compareToPreviousPrice: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  reutersCode: string;
};

type TSummary = {
  overview: string;
  stockInfo: TStockinfo;
};

export default function Summary({ overview, stockInfo }: TSummary) {
  const { closePrice, compareToPreviousClosePrice, fluctuationsRatio, reutersCode } = stockInfo;
  const stockCode = reutersCode.split(".")[0];

  return (
    <>
      <div className="w-[488px] h-64 flex flex-wrap justify-between items-start border bg-white rounded-2xl p-4">
        <div className="flex flex-col">
          <div className="text-black/opacity-20 text-2xl font-bold font-['Pretendard'] leading-loose">
            ${closePrice} ∙ {stockCode}
          </div>
          <div className="w-[133px] flex gap-4">
            <div className="text-left text-rose-500 text-xl font-['Pretendard'] leading-7">
              ▲{compareToPreviousClosePrice}
            </div>
            <div className="text-left text-rose-500 text-xl font-['Pretendard'] leading-7">
              {fluctuationsRatio}%
            </div>
          </div>
        </div>
        <Toggle />
        <div className="w-[424px] h-24 line-clamp-5 text-neutral-900 text-base font-normal font-['Pretendard'] leading-normal">
          {overview}
        </div>
      </div>
    </>
  );
}
