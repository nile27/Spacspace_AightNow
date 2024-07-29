import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { NextRequest } from "next/server";

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

const STOCK_NAME: { [key: string]: string } = {
  테슬라: "TSLA.O",
  구글: "GOOGL.O",
  애플: "AAPL.O",
  마이크로소프트: "MSFT.O",
  아마존: "AMZN.O",
  유니티: "U",
};

async function stockAction5(stock: string) {
  const res = await fetch(`https://api.stock.naver.com/stock/${stock}/basic`);
  const data = await res.json();
  return data.stockItemTotalInfos;
}

async function getStockInfo(companyName: string) {
  const stockCode = STOCK_NAME[companyName.toLowerCase()];
  if (!stockCode) {
    return `죄송합니다. ${companyName}의 주식 정보를 찾을 수 없습니다.`;
  }

  try {
    const stockInfo = await stockAction5(stockCode);
    // 필요한 정보 추출 및 포맷팅
    const formattedInfo = `
      ${companyName.toUpperCase()} 주식 정보:
      현재가: $${stockInfo.price.current}
      전일대비: $${stockInfo.price.compared} (${stockInfo.price.fluctuationsRatio}%)
      52주 최고가: $${stockInfo.shortTermGuideline.highestPrice}
      52주 최저가: $${stockInfo.shortTermGuideline.lowestPrice}
      EPS: $${stockInfo.per.eps}
      PER: ${stockInfo.per.current}
      PBR: ${stockInfo.pbr.current}
      배당수익률: ${stockInfo.dividendYield}%
    `;
    return formattedInfo;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return `${companyName}의 주식 정보를 가져오는 데 실패했습니다.`;
  }
}

export async function POST(req: NextRequest) {
  const { input, sessionId } = await req.json();

  const llm = new ChatTogetherAI({
    model: "meta-llama/Meta-Llama-3-70B-Instruct-Turbo",
    apiKey: process.env.TOGETHER_API_KEY,
    temperature: 0.3,
    topP: 0.3,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `당신은 아잇나우라는 이름의 주식 애널리스트입니다. 사용자에게 자세한 주식 정보를 한글로 알려줘야 합니다.
       답변은 3줄을 넘지 않도록 해주세요 Tesla, Google, Apple, Microsoft, Amazon, Unity 주식에 대해서만 정보를 제공해주시면 됩니다.
       사용자가 특정 회사의 주식 정보를 요청하면, 그 회사의 이름만을 답변의 첫 줄에 영어로 적어주세요. \n
       예를 들어, "테슬라 주식에 대해 알려줘"라는 질문에는 "Tesla"라고만 첫 줄에 적어주세요.\n
       만약 특정 회사를 언급하지 않았다면, 무조건 자신을 소개를 하고나서 회사이름을 알려주세요 라고 공손하게 한글로 첫 줄에 적어주세요.\n
       그 다음 줄부터 주식에 대한 간단한 분석이나 조언을 해주세요.`,
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

  if (typeof response.content !== "string") {
    throw new Error("Unexpected response format from LLM");
  }

  const lines = response.content.split("\n");
  const companyName = lines[0].trim().toLowerCase();

  let finalResponse = response.content;

  if (companyName !== "none" && companyName in STOCK_NAME) {
    const stockInfo = await getStockInfo(companyName);
    finalResponse = `${stockInfo}\n\n${lines.slice(1).join("\n")}`;
  }

  return new Response(
    JSON.stringify({
      response: finalResponse,
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}
