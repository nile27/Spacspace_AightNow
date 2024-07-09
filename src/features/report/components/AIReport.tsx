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
          <span className="font-['pretendard'] font-bold text-3xl"></span>
        </div>
        <div className="w-[365px]  flex  justify-between ">
          <div>{JSON.stringify(score, null, 2)}</div>
        </div>
      </div>
    </>
  );
}
