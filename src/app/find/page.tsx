import Header from "@/components/Header";
import ChatBotPage from "@/features/chatbot/ChatBotPage";
import SearchPage from "@/features/search/SearchPage";
export default function Find() {
  return (
    <>
      <Header />
      <div className=" h-full">
        <SearchPage />
      </div>
      <ChatBotPage />
    </>
  );
}
