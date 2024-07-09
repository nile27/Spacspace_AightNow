// app/api/chatbot/route.ts
import { NextResponse } from "next/server";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory, RunnableFunc } from "@langchain/core/runnables";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";

export async function POST(request: Request) {
  const { input } = await request.json();

  const llm = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama3",
    temperature: 0.3,
    topP: 0.3,
  });

  const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

  const getMessageHistory = async (sessionId: string) => {
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  };

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a helpful assistant who remembers all details the user shares with you.`],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
  ]);

  const filterMessages: RunnableFunc<
    { input: string; chat_history: BaseMessage[] },
    BaseMessage[]
  > = ({ chat_history }) => {
    return chat_history.slice(-10);
  };

  const chain = RunnableSequence.from([
    RunnablePassthrough.assign({
      input: (input: string) => input,
      chat_history: filterMessages,
    }),
    prompt,
    llm,
  ]);

  const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
  });

  const config = {
    configurable: {
      sessionId: "abc2",
    },
  };

  const stream = await withMessageHistory.stream(
    {
      input,
    },
    config,
  );

  let response = "";
  for await (const chunk of stream) {
    response += chunk.content;
  }

  return NextResponse.json({ response });
}
