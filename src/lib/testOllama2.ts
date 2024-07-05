import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function llmChat2() {
  // 1. 모델 초기화
  const model = new ChatOllama({
    baseUrl: "http://localhost:11434", // Ollama 서버 URL
    model: "llama3",
  });

  // 2. 프롬프트 템플릿 생성
  const prompt = ChatPromptTemplate.fromTemplate(
    "{topic}에 대해 분석해서 무조건 한국어로 4줄로 표현해줘 이모지는 제외해서 표현해줘",
  );

  // 3. 출력 파서 설정
  const outputParser = new StringOutputParser();

  // 4. 체인 구성
  const chain = prompt.pipe(model).pipe(outputParser);

  // 5. 체인 실행
  const response = await chain.invoke({
    topic: "AAPL",
  });
  console.log(response);
  return response;
}
