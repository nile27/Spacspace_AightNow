import Icon from "@/components/Stock/Icon";
import Stock from "@/components/Stock/Stock";
import TextButton from "@/components/btnUi/TextButton";
import Image from "next/image";

export default function WatchListCard() {
  return (
    <>
      <div className="w-[392px] h-[360px]  bg-white rounded-2xl p-4 font-pretendard">
        <div className="w-[328px] h-14 flex flex-col">
          <div className="flex items-center gap-2 ">
            <Icon name="apple" size={32} />
            <span className="font-bold">애플</span>
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
          <TextButton size="custom" color="grayScale" width={"160"} height={"56"}>
            삭제하기
          </TextButton>
          <TextButton size="custom" width={"160"} height={"56"}>
            자세히 보기
          </TextButton>
        </div>
      </div>
    </>
  );
}
