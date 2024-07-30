"use server";

import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { stockAction4 } from "./stockAction";
import { generate, token } from "./token";

// ollama 사용
export async function agentChatApi(id: string) {
  const search = new TavilySearchResults({
    maxResults: 2,
  });
  const retriever = await search.invoke(`최신 ${id} 주식`);

  const stockAnalysisTool = new DynamicStructuredTool({
    name: "stock_analysis",
    description: "주식에 대한 상세한 분석 데이터를 제공합니다.",
    schema: z.object({
      stockName: z.string().describe(id),
    }),
    func: async () => {
      try {
        const stockInfo = await stockAction4(id);
        return JSON.stringify(stockInfo);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        return JSON.stringify({ error: "Failed to fetch stock data" });
      }
    },
  });

  const accessToken = await token();
  const prompt = `${retriever}를 참고해서 ${id} 주식에 대해 ${stockAnalysisTool} 도구를 사용하여 상세 데이터를 가져온 후 분석해서 4줄짜리 애널리스트 보고서를 절대로 한글로 작성해줘. 절대로 제목이나 부가 설명 없이 바로 본문 내용만 한글로 작성해. 밑에 Note: 이런거 표시하지마세요 영어 절대로 표시하지마세요\n`;
  const result = await generate(accessToken, prompt);

  return result.text.split("\n").slice(2, 6).join("\n");
}

export async function agentEvaluationApi(id: string) {
  const search = new TavilySearchResults({
    maxResults: 1,
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
        const stockInfo = await stockAction4(id);
        return JSON.stringify(stockInfo);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        return JSON.stringify({ error: "Failed to fetch stock data" });
      }
    },
  });

  const accessToken = await token();
  const prompt = `${retriever}를 참고하여 ${id} 주식에 대해 ${stockAnalysisTool} 도구를 사용하여 상세 데이터를 가져온 후, 다음 기준에 따라 분석 리포트를 한글로 작성해주세요:

  투자지수 평가 기준:

  1. 전반적 평가: (긍정/중립/부정)
  2. 수익성: (높음/중간/낮음)
  3. 관심도: (상승/평균/하락)
  4. 성장성: (상승/평균/하락)
  5. 주가: (상승/일정/하락)
  6. 총점: 각 평가 항목에 대해 100점 만점 중 점수로 평가하고, 총 평균 점수를 계산해주세요.

  무조건 저 규격에 맞춰서 한글로 각 항목에 대해 평가를 제시하고 마지막에 총점을 제시해주세요.
  한글로 작성해주세요. 제목이나 부가 설명 없이 바로 본문 내용만 작성해주세요. 영어는 절대로 사용하지 마세요 그리고 url 표시하지마.
  \n`;
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
