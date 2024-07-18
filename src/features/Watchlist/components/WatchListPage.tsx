"use client";

import { useClose, useShow } from "@/Store/store";

import WatchListAdd from "./WatchListAdd";
import WatchList from "./Watchlist";
import ChatBotPage from "@/features/chatbot/ChatBotPage";

export default function WatchListPage() {
  const { isShow } = useShow();
  const { isClose } = useClose();

  return (
    <>
      {isShow && isClose ? <WatchList /> : <WatchListAdd />}
      <ChatBotPage />
    </>
  );
}
