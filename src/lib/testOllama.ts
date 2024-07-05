import ollama from "ollama";

export async function llmChat() {
  const response = await ollama.chat({
    model: "llama3",
    messages: [
      { role: "user", content: "애플 주식에 대해 분석해서 무조건 한국어로 4줄로 표현해줘" },
    ],
  });

  return response.message.content;
}
