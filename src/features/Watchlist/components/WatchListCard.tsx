import { useShow } from "@/Store/store";
import Icon from "@/components/Stock/Icon";
import Stock from "@/components/Stock/Stock";
import TextButton from "@/components/btnUi/TextButton";
import Image from "next/image";
import Link from "next/link";

export default function WatchListCard({ name }: { name: string }) {
  return (
    <>
      <div className={`w-[392px] h-[360px]   bg-white rounded-2xl p-4 font-pretendard`}>
        <div className="w-[328px] h-14 flex flex-col">
          <div className="flex items-center gap-2 ">
            <Icon name={name} size={32} />
            <span className="font-bold">{name}</span>
            <span className="text-scaleGray-600">AAPL</span>
          </div>
          <div className="flex items-center gap-2">
            <span>$00.00</span>
            <span className="text-warning">1.75</span>
            <span className="text-warning">+0.82%</span>
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
          <TextButton size="custom" color="grayScale" width={"160px"} height={"56px"}>
            삭제하기
          </TextButton>
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
