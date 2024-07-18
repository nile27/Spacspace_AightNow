"use server";

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";

// news ai 요약
export async function summaryAI({ newsContent }: { newsContent: string }) {
  const llm = new ChatTogetherAI({
    model: "meta-llama/Llama-3-70b-chat-hf",
    temperature: 0.3,
    topP: 0.3,
    apiKey: process.env.TOGETHER_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["human", `${newsContent}에 대해 5줄로 한국어로 요약해줘`],
  ]);

  const chain = prompt.pipe(llm);
  const result = await chain.invoke({ maxIterations: 3 });
  console.log(result);
  return result.content;
}
