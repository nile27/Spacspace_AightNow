import { agentEvaluationTogether } from "@/lib/agentTogetherAI";

export default async function AIReport({ id }: { id: string }) {
  let result;

  try {
    result = await agentEvaluationTogether(id);
    console.log("Fetched result:", result); // 디버깅용 로그
  } catch (error) {
    console.error("Error fetching agentEvaluationTogether:", error);
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  if (!result || typeof result !== "object") {
    console.error("Invalid result object:", result);
    return <div>데이터를 불러올 수 없습니다.</div>;
  }
  // 점수를 추출하고 문자열로 변환하는 함수
  const extractScore = (text: string | number): string => {
    if (typeof text === "number") {
      return text.toString();
    }
    const match = text.match(/(\d+)점/);
    return match ? match[1] : "N/A";
  };

  // 각 항목의 점수 추출
  // const scores = {
  //   "전반적 평가": extractScore(result["1. 전반적 평가"]),
  //   수익성: extractScore(result["2. 수익성"]),
  //   관심도: extractScore(result["3. 관심도"]),
  //   성장성: extractScore(result["4. 성장성"]),
  //   주가: extractScore(result["5. 주가"]),
  //   총점: extractScore(result["6. 총점"]),
  // };

  const scores = {
    "전반적 평가": extractScore(result["1. 전반적 평가"] || ""),
    수익성: extractScore(result["2. 수익성"] || ""),
    관심도: extractScore(result["3. 관심도"] || ""),
    성장성: extractScore(result["4. 성장성"] || ""),
    주가: extractScore(result["5. 주가"] || ""),
    총점: extractScore(result["6. 총점"] || ""),
  };

  return (
    <>
      <div className="w-[429px] h-[297px] bg-white rounded-2xl p-4 ">
        <div className="w-[365px] flex justify-between">
          <h2 className="font-['pretendard'] font-bold text-2xl">종목 AI 리포트 점수</h2>
          <span className="font-['pretendard'] font-bold text-3xl">{scores["총점"]} 점</span>
        </div>
        <div className="w-[365px] flex flex-col mt-4 ">
          <div>전반적 평가: {scores["전반적 평가"]}</div>
          <div>수익성: {scores["수익성"]}</div>
          <div>관심도: {scores["관심도"]}</div>
          <div>성장성: {scores["성장성"]}</div>
          <div>주가: {scores["주가"]}</div>
        </div>
      </div>
    </>
  );
}
