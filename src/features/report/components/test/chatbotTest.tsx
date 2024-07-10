"use client";
import { stockAction5 } from "@/lib/teststock";
import { ReactElement, useEffect, useState } from "react";

// 메시지 타입 정의
type Message = {
  role: "user" | "bot";
  content: string;
};

export default function ChatBotTest() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(7));
  }, []);

  stockAction5("apple");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, sessionId }),
      });
      const data = await response.json();
      const chatMessage: Message = { role: "user", content: data.response };
      setMessages(prev => [...prev, chatMessage]);
      setInput(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = { role: "bot", content: "오류가 발생했습니다." };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div>
      <h1>주식 챗봇</h1>
      <div className="h-[300px] overflow-y-scroll border p-[10px] mb-5">
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role === "user" ? "You: " : "Bot: "}</strong>
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="주식에 대해 물어보세요"
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
