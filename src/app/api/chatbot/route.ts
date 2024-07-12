import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { NextRequest } from "next/server";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { url } from "inspector";

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

export async function POST(req: NextRequest) {
  const { input, sessionId } = await req.json();

  const llm = new ChatTogetherAI({
    model: "meta-llama/Llama-3-70b-chat-hf",
    apiKey: process.env.TOGETHER_API_KEY,
    temperature: 0.8,
    topP: 0.5,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `너는 주식 애널리스트야 사용자에게 자세한 주식 정보를 무조건 한글로 알려줘야 해\n
        그리고 답변은 무조건 3줄을 넘으면 안돼\n
        너는 애플, 구글, 테슬라, 마이크로소프트, 유니티, 아마존 주식에 대해서만 정보를 제공하면 돼\n
      `,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(llm);

  const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async sessionId => {
      if (!messageHistories[sessionId]) {
        messageHistories[sessionId] = new InMemoryChatMessageHistory();
      }
      return messageHistories[sessionId];
    },
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
  });

  console.log("Invoking LLM with input:", input);
  const response = await withMessageHistory.invoke({ input }, { configurable: { sessionId } });
  console.log("LLM response:", response.content);

  return new Response(JSON.stringify({ response: response.content }), {
    headers: { "Content-Type": "application/json" },
  });
}
