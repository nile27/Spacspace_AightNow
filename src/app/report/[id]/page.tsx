import Header from "@/components/Header";
import ChatBotPage from "@/features/chatbot/ChatBotPage";
import Report from "@/features/report/components/Report";

export default function page({ params }: any) {
  const { id } = params;
  const lowerId = id.toLowerCase();

  return (
    <>
      <Header />
      <div className="h-full mt-52">
        <Report id={lowerId} />
      </div>
      <ChatBotPage />
    </>
  );
}
