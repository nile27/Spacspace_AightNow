import { agentEvaluationTogether } from "@/lib/TogetherTest";

export default async function AIReport({ id }: { id: string }) {
  const score = await agentEvaluationTogether(id);

  return (
    <>
      <div className="w-[429px] h-[297px] bg-white rounded-2xl p-4 ">
        <div className="w-[365px] flex justify-between">
          <h2 className="font-['pretendard'] font-bold text-2xl">종목 AI 리포트 점수</h2>
          <span className="font-['pretendard'] font-bold text-3xl">
            {score["총점"].toString()} 점
          </span>
        </div>
        <div className="w-[365px] flex flex-col mt-4 ">
          <div>전반적 평가:{score["전반적 평가"].toString()}</div>
          <div>수익성:{score["수익성"].toString()}</div>
          <div>관심도:{score["관심도"].toString()}</div>
          <div>성장성:{score["성장성"].toString()}</div>
          <div>주가:{score["주가"].toString()}</div>
        </div>
      </div>
    </>
  );
}
