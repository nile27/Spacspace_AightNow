import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { stockAction4 } from "./stockAction";
import { generate, token } from "./token";
export async function agentChat2(id: string) {
  const search = new TavilySearchResults({
    maxResults: 2,
  });
  const retriever = await search.invoke(`최근 ${id} 주식`);

  const accessToken = await token();
  const prompt = `${retriever}를 참고해서 ${id} 주식에 대해 분석해서 4줄짜리 애널리스트 보고서를 한글로 작성해줘. 절대로 5줄 넘지마 제목이나 부가 설명 없이 바로 본문 내용만 작성해.`;
  const result = await generate(accessToken, prompt);
  return result.text;
}

export async function agentEvaluation2(id: string) {
  const search = new TavilySearchResults({
    maxResults: 2,
  });
  const retriever = await search.invoke(`최근 ${id} 주식`);

  const stockAnalysisTool = new DynamicStructuredTool({
    name: "stock_analysis",
    description: "주식에 대한 상세한 분석 데이터를 제공합니다.",
    schema: z.object({
      stockName: z.string().describe(id),
    }),
    func: async () => {
      try {
        const stockInfo = await stockAction4();
        return JSON.stringify(stockInfo);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        return JSON.stringify({ error: "Failed to fetch stock data" });
      }
    },
  });

  const accessToken = await token();
  const prompt = `${retriever}를 참고하여 ${id} 주식에 대해 ${stockAnalysisTool} 도구를 사용하여 상세 데이터를 가져온 후, 다음 기준에 따라 분석 리포트를 작성해주세요: 
  1. 전반적 평가, 2. 수익성, 3. 관심도, 4. 성장성, 5. 주가, 6. 총점`;
  const result = await generate(accessToken, prompt);

  return parseEvaluationResult(result.text);
}

function parseEvaluationResult(text: string): Record<string, string | number> {
  const lines = text.split("\n");
  const result: Record<string, string | number> = {};
  lines.forEach(line => {
    const [key, value] = line.split(":").map(s => s.trim());
    if (key === "총점") {
      result[key] = parseFloat(value);
    } else {
      result[key] = value;
    }
  });
  return result;
}
