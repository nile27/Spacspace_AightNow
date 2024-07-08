import Image from "next/image";

type TAiScore = {
  score: {
    "**전반적 평가": string;
    "**수익성": string;
    "**관심도": string;
    "**성장성": string;
    "**주가": string;
    "**총점": string;
  };
};

export default function AIReport({ score }: TAiScore) {
  console.log(score);
  return (
    <>
      <div className="w-[429px] h-[297px]  bg-white rounded-2xl p-4">
        <div className="w-[365px] flex justify-between  ">
          <h2 className="font-['pretendard'] font-bold text-2xl">종목 AI 리포트 점수</h2>
          <span className="font-['pretendard'] font-bold text-3xl">
            {score["**총점"].replace(/\*\*/g, "").substring(0, 3)} 점
          </span>
        </div>
        <div className="w-[365px]  flex  justify-between ">
          <div>
            <p>수익성: {score["**수익성"].replace(/\*\*/g, "")}</p>
            <p>관심도: {score["**관심도"].replace(/\*\*/g, "")}</p>
            <p>성장성: {score["**성장성"].replace(/\*\*/g, "")}</p>
            <p>주가: {score["**주가"].replace(/\*\*/g, "")}</p>
            <p>전반적 평가: {score["**전반적 평가"].replace(/\*\*/g, "")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
