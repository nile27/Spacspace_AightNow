import Bot from "./Bot";
import { Message } from "./ChatBot";
import User from "./User";

export default function ChatMessage({ messages }: { messages: Message[] }) {
  return (
    <>
      <div className="flex flex-col p-4 gap-3">
        {messages.map((message, index) =>
          message.role === "bot" ? (
            <Bot key={index}>{message.content}</Bot>
          ) : (
            <User key={index} content={message.content} />
          ),
        )}
      </div>
    </>
  );
}
