"use client";

import TextButton from "@/components/btnUi/TextButton";
import IconButton from "@/components/btnUi/IconButton";
import React, { useEffect, useState, useCallback } from "react";
import Input from "@/components/Input/Input";
import ChatMessage from "./ChatMessage";

export type Message = {
  role: "user" | "bot";
  content: string;
};

export default function ChatBot({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
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
      const chatMessage: Message = { role: "bot", content: data.response };
      setMessages(prev => [...prev, chatMessage]);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = { role: "bot", content: "오류가 발생했습니다." };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [input, sessionId]);

  return (
    <>
      <div className="w-[480px] h-[640px] bg-white shadow-2xl rounded-t-3xl fixed bottom-0 right-0">
        <div className="flex flex-col h-full">
          <div className="w-full h-[64px] bg-mainNavy-900 rounded-t-3xl flex items-center justify-between px-4 pl-[29px]">
            <div className="text-scaleGray-0 text-xl font-bold leading-loose">나우챗봇</div>
            <div className="w-8 h-8 relative">
              <IconButton onClick={onClose} icon="Close" size="auto" style={{ border: "0" }} />
            </div>
          </div>
          <div className="overflow-y-scroll h-[488px]">
            <div className="flex flex-col p-4 gap-3">
              <ChatMessage messages={messages} />
            </div>
          </div>
          <form className="border-t border-gray-200 flex gap-2 p-4" onSubmit={handleSubmit}>
            <Input value={input} onChange={e => setInput(e.target.value)} />
            <TextButton size="custom" height="56px" width="56px">
              전송
            </TextButton>
          </form>
        </div>
      </div>
    </>
  );
}
