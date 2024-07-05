import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

export async function agentChat() {
  const search = new TavilySearchResults({
    maxResults: 2,
  });

  const retriever = await search.invoke("애플 주식 ");

  const tools = [search];
  const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-functions-agent");

  // 1. 모델 초기화
  const llm = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama3",
    temperature: 0.3,
    topP: 0.3,
  });

  // 2. 도구 정의
  const stockAnalysisTool = new DynamicStructuredTool({
    name: "stock_analysis",
    description: "주식에 대한 간단한 분석을 제공합니다.",
    schema: z.object({
      stockName: z.string().describe("분석할 주식의 이름"),
    }),
    func: async ({ stockName }) => {
      // 여기에 실제 주식 분석 로직을 구현하세요
      return `${stockName}에 대한 간단한 분석 결과입니다...`;
    },
  });

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
  });

  // 3. Agent 초기화
  const executor = new AgentExecutor({ agent, tools });

  // 4. Agent 실행
  const result = await executor.invoke({
    input: `${retriever}를 참고해서 애플 주식에 대해 분석해서 4줄짜리 애널리스트 보고서를 한글로 작성해줘. 제목이나 부가 설명 없이 바로 본문 내용만 작성해.`,
  });
  const cleanOutput = result.output
    .replace(/^Here is a 4-line analyst report on Apple stock in Korean:\s*/, "")
    .replace(/^.*본문:\s*/, "")
    .trim();
  console.log(cleanOutput);
  return cleanOutput;
}
