"use server";

import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { stockAction4 } from "./stockAction";

// ai report
export async function agentChatTogether(id: string) {
  const timeout = (ms: number) =>
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Operation timed out")), ms);
    });

  try {
    const search = new TavilySearchResults({
      maxResults: 1, // 검색 결과 수 줄임
    });

    const retriever = await search.invoke(`최신 ${id} 주식`);

    const tools = [search];
    const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-functions-agent");

    // 1. 모델 초기화 - 더 빠른 응답을 위해 설정 조정
    const llm = new ChatTogetherAI({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      temperature: 0.1, // 더 결정적인 응답을 위해 낮춤
      topP: 0.5, // 더 집중된 응답을 위해 낮춤
      maxTokens: 300, // 응답 길이 제한
      apiKey: process.env.TOGETHER_API_KEY,
    });

    // 2. 도구 정의
    const stockAnalysisTool = await stockAction4(id);
    const stock = JSON.stringify(stockAnalysisTool);

    const agent = await createOpenAIFunctionsAgent({
      llm,
      tools,
      prompt,
    });

    // 3. Agent 초기화 - 반복 횟수 줄임
    const executor = new AgentExecutor({
      agent,
      tools,
      maxIterations: 1,
    });

    // 4. Agent 실행 with timeout (3분으로 증가)
    const result = (await Promise.race([
      executor.invoke({
        input: `${retriever}를 참고해서 ${id} 주식에 대해 ${stock} 도구를 참조해서 분석하고 애널리스트 보고서와 향후 전망을 한글로 작성해주세요. \n
        절대로 3줄 넘지마세요 제목이나 부가 설명 없이 바로 본문 내용만 작성해주세요. 가능한 한 빠르게 응답해주세요.`,
      }),
      timeout(180000), // 3분 타임아웃
    ])) as { output: string };

    const cleanOutput = result.output
      .replace(/^Here is a .+-line analyst report in Korean:\s*/, "")
      .replace(/^.*본문:\s*/, "")
      .trim();

    return cleanOutput;
  } catch (error) {
    if (error instanceof Error && error.message === "Operation timed out") {
      throw new Error("AI 분석 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.");
    }
    throw error;
  }
}

// ----------------------------------------------------------------------------------

// ai 점수 평가
export async function agentEvaluationTogether(id: string) {
  const search = new TavilySearchResults({
    maxResults: 2,
  });

  const retriever = await search.invoke(`최근 ${id} 주식`);

  const tools = [search];
  const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-functions-agent");

  // 1. 모델 초기화
  const llm = new ChatTogetherAI({
    model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    temperature: 0.2,
    topP: 0.7,
    apiKey: process.env.TOGETHER_API_KEY,
  });

  // 2. 도구 정의
  const stockAnalysisTool = await stockAction4(id);
  const stock = JSON.stringify(stockAnalysisTool);

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools: [...tools],
    prompt,
  });

  // 3. Agent 초기화
  const executor = new AgentExecutor({
    agent,
    tools: [...tools],
    maxIterations: 1,
  });

  // 4. Agent 실행
  const result = await executor.invoke({
    input: `${retriever}를 참고하여 ${id} 주식에 대해 ${stock} 도구를 사용하여 상세 데이터를 가져온 후, 다음 기준에 따라 분석 리포트를 작성해주세요:

    투자지수 평가 기준:
    각 평가 항목에 대해 100점 만점 중 점수만 나타내고 평가는 달지마세요, 총점은 평균 점수를 계산해주세요.
    1. 전반적 평가: 점
    2. 수익성: 점
    3. 관심도: 점
    4. 성장성: 점
    5. 주가: 점
    6. 총점:  

    각 항목에 대해 평가를 제시하고 마지막에 총점을 제시해주세요.
    한글로 작성해주세요. 제목이나 부가 설명 없이 바로 본문 내용만 작성해주세요.`,
  });

  const cleanOutput = result.output.trim();

  const parseResult = (text: string) => {
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
  };

  const parsedResult = parseResult(cleanOutput);

  return parsedResult;
}
