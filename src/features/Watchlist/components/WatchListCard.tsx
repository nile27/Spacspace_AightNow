import Icon from "@/components/Stock/Icon";
import TextButton from "@/components/btnUi/TextButton";
import { stockTranslate } from "@/lib/stockTranslate";
import Image from "next/image";
import Link from "next/link";
import RadarChart from "./RadarChart";

export type TStockInfo = {
  stockName: string;
  reutersCode: string;
  closePrice: number;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
  compareToPreviousPrice: {
    code: string;
  };
};

type TStockDetail = {
  stockPriceInfo: TStockInfo | null;
  name: string;
  onDelete: () => void;
};

export default function WatchListCard({ name, onDelete, stockPriceInfo }: TStockDetail) {
  if (!stockPriceInfo) return null;
  const {
    reutersCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    compareToPreviousPrice,
  } = stockPriceInfo;

  const handleDelete = () => {
    onDelete();
  };

  const stockEn = stockTranslate(name);

  return (
    <>
      <div className={`w-[392px] h-[360px]   bg-white rounded-2xl p-4 font-pretendard`}>
        <div className="w-[328px] h-14 flex flex-col">
          <div className="flex items-center gap-2 ">
            <Icon name={name} size={32} />
            <span className="font-bold">{name}</span>
            <span className="text-scaleGray-600">{reutersCode.slice(0, 4)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>${closePrice}</span>
            <span
              className={`${
                compareToPreviousPrice.code === "2" ? "text-warning" : "text-blue-500"
              }`}
            >
              <span className="">
                {compareToPreviousPrice.code === "2" ? "▲" : "▼"}
                {compareToPreviousClosePrice}
              </span>
              <span className="ml-2">{fluctuationsRatio}%</span>
            </span>
          </div>
        </div>
        <div className="w-[365px]  flex  justify-between ">
          <RadarChart stockName={stockEn} />
        </div>
        <div className=" flex gap-4 justify-center items-center">
          <div className="hover:opacity-80">
            <TextButton
              size="custom"
              color="grayScale"
              width={"160px"}
              height={"56px"}
              onClick={handleDelete}
            >
              삭제하기
            </TextButton>
          </div>
          <Link href={`/report/${stockEn}`}>
            <TextButton size="custom" width={"160px"} height={"56px"}>
              자세히 보기
            </TextButton>
          </Link>
        </div>
      </div>
    </>
  );
}
