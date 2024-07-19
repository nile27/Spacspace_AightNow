"use client";

import { useEffect, useState } from "react";
import ChatBot from "./ChatBot";
import IconButton from "@/components/btnUi/IconButton";

export default function ChatBotPage() {
  const [chatIsShow, setChatIsShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (chatIsShow && !(e.target as HTMLElement).closest(".chatbot-content")) {
      setChatIsShow(false);
    }
  };

  const handleToggle = () => {
    setChatIsShow(!chatIsShow);
  };

  const handleClose = () => {
    setChatIsShow(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <div className="fixed bottom-24 right-4 z-50" onClick={handleOutsideClick}>
        {chatIsShow ? (
          <div className="chatbot-content" onClick={e => e.stopPropagation()}>
            <ChatBot onClose={handleClose} />
          </div>
        ) : (
          <div className="w-20 h-20 hover:scale-90" onClick={handleToggle}>
            <IconButton icon="ChatBot" />
          </div>
        )}
      </div>
    </>
  );
}
