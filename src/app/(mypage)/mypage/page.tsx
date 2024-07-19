import MainProfile from "./components/MainProfile";
import SideBar from "../components/SideBar";
import ChatBotPage from "@/features/chatbot/ChatBotPage";

export default function Mypage() {
  return (
    <>
      <SideBar index={0} />
      <MainProfile />
      <ChatBotPage />
    </>
  );
}
