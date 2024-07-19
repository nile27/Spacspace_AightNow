import Header from "@/components/Header";
import ChatBotPage from "@/features/chatbot/ChatBotPage";
import NewsPage from "@/features/news/NewsPage";

export default function page() {
  return (
    <>
      <Header />
      <NewsPage />
      <ChatBotPage />
    </>
  );
}
