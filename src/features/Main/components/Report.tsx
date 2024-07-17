import { TStockData } from "@/app/api/(crawler)/type";
import Icon from "@/components/Stock/Icon";

export default function Report({ data }: { data: TStockData }) {
  const {
    logo,
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousPrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
  } = data;
  return (
    <>
      <div className="w-[400px] p-8 bg-white rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch h-14 flex-col justify-start items-start flex">
          <div className="justify-start items-center gap-2 inline-flex">
            {/* 기업 아이콘 */}
            <div>
              <Icon name={logo} size={50} />
            </div>
            <div className="justify-start items-center gap-2 flex">
              <div className="text-neutral-900 text-2xl font-bold font-['Pretendard'] leading-loose">
                {stockName}
              </div>
              <div className="text-zinc-600 text-lg font-normal font-['Pretendard'] leading-7">
                {symbolCode}
              </div>
            </div>
          </div>
          <div className="justify-end items-center gap-2 inline-flex">
            <div className="justify-start items-center gap-2 flex">
              <div className="text-right text-neutral-900 text-base font-semibold leading-normal">
                ${closePrice}
              </div>
              <div
                className={`text-right ${
                  compareToPreviousPrice.text === "하락" ? "text-secondBlue-500" : "text-warning"
                } text-base font-normal`}
              >
                {compareToPreviousPrice.text === "하락" ? "▼" : "▲"}
                {compareToPreviousClosePrice.replace("-", "")}
              </div>
              <div
                className={`text-right ${
                  compareToPreviousPrice.text === "하락" ? "text-secondBlue-500" : "text-warning"
                } text-base font-normal`}
              >
                {compareToPreviousPrice.text === "하락" ? "" : "+"}
                {fluctuationsRatio}%{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="justify-start items-start gap-2.5 inline-flex">
          <div className="justify-start items-center gap-6 flex">
            <div className="w-32 h-32 relative">
              <div className="w-32 h-32 left-0 top-0 absolute">{/* 차트 */}</div>
            </div>
            <div className="px-6 py-4 bg-stone-50 rounded-3xl flex-col justify-start items-center gap-1 inline-flex">
              <div className="w-28 justify-between items-center inline-flex">
                <div className="text-zinc-600 text-base font-medium">주가</div>
                <div className="text-right text-sky-500 text-sm font-medium font-['Pretendard'] leading-tight">
                  ▲0.0%
                </div>
              </div>
              <div className="w-28 justify-between items-center inline-flex">
                <div className="text-zinc-600 text-base font-medium">투자지수</div>
                <div className="text-right text-rose-500 text-sm font-medium font-['Pretendard'] leading-tight">
                  ▲0.0%
                </div>
              </div>
              <div className="w-28 justify-between items-center inline-flex">
                <div className="text-zinc-600 text-base font-medium">수익성</div>
                <div className="text-right text-rose-500 text-sm font-medium font-['Pretendard'] leading-tight">
                  ▲0.0%
                </div>
              </div>
              <div className="w-28 justify-between items-center inline-flex">
                <div className="text-zinc-600 text-base font-medium">성장성</div>
                <div className="text-right text-rose-500 text-sm font-medium font-['Pretendard'] leading-tight">
                  ▲0.0%
                </div>
              </div>
              <div className="w-28 justify-between items-center inline-flex">
                <div className="text-zinc-600 text-base font-medium">관심도</div>
                <div className="text-right text-rose-500 text-sm font-medium font-['Pretendard'] leading-tight">
                  ▲0.0%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
