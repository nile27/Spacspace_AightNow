import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { HumanMessage } from "@langchain/core/messages";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { NextRequest } from "next/server";

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

export async function POST(req: NextRequest) {
  const { input, sessionId } = await req.json();
  console.log("Received input:", input);
  console.log("Session ID:", sessionId);
  const llm = new ChatTogetherAI({
    apiKey: process.env.TOGETHER_API_KEY,
    temperature: 0.8,
    topP: 0.5,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "너는 한국인으로 주식 애널리스트 어시턴트야 사용자에게 자세한 주식 정보를 무조건 한글로 알려줘야 해",
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

  const config = {
    configurable: {
      sessionId: sessionId,
    },
  };

  console.log("Invoking LLM with input:", input);
  const response = await withMessageHistory.invoke({ input }, { configurable: { sessionId } });
  console.log("LLM response:", response.content);

  return new Response(JSON.stringify({ response: response.content }), {
    headers: { "Content-Type": "application/json" },
  });
}
