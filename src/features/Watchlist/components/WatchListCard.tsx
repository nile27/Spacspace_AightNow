import Icon from "@/components/Stock/Icon";
import TextButton from "@/components/btnUi/TextButton";
import Image from "next/image";
import Link from "next/link";

export type TStockInfo = {
  stockName: string;
  reutersCode: string;
  closePrice: number;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
};

type TStockDetail = {
  stockPriceInfo: TStockInfo;
  name: string;
  onDelete: () => void;
};

export default function WatchListCard({ name, onDelete, stockPriceInfo }: TStockDetail) {
  const { reutersCode, closePrice, compareToPreviousClosePrice, fluctuationsRatio } =
    stockPriceInfo;

  const handleDelete = () => {
    onDelete();
  };

  return (
    <>
      <div className={`w-[392px] h-[360px]   bg-white rounded-2xl p-4 font-pretendard`}>
        <div className="w-[328px] h-14 flex flex-col">
          <div className="flex items-center gap-2 ">
            <Icon name={name} size={32} />
            <span className="font-bold">{name}</span>
            <span className="text-scaleGray-600">{reutersCode}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>${closePrice}</span>
            <span className="text-warning">{compareToPreviousClosePrice}</span>
            <span className="text-warning">{fluctuationsRatio}%</span>
          </div>
        </div>
        <div className="w-[365px]  flex  justify-between ">
          <Image
            src="/aichart.png"
            alt="aichart"
            width={176}
            height={176}
            className="p-[13px] border"
          />
          <Image src="/result.png" alt="result" width={176} height={176} className="" />
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
          <Link href={`/report/${name}`}>
            <TextButton size="custom" width={"160px"} height={"56px"}>
              자세히 보기
            </TextButton>
          </Link>
        </div>
      </div>
    </>
  );
}
