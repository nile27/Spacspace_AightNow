"use client";
import { useState } from "react";

export default function ChatBotTest() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const data = await response.json();
    setOutput(data.response);
    setInput("");
  };

  return (
    <div>
      <h1>Stocks Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me about stocks"
        />
        <button type="submit">Submit</button>
      </form>
      <div>{output}</div>
    </div>
  );
}
