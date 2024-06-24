import Image from "next/image";

export default function AIReport() {
  return (
    <>
      <div className="w-[429px] h-[297px]  bg-white rounded-2xl p-4">
        <div className="w-[365px] flex justify-between  ">
          <h2 className="font-['pretendard'] font-bold">종목 AI 리포트</h2>
          <span className="font-['pretendard'] font-bold text-2xl">70점</span>
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
      </div>
    </>
  );
}
