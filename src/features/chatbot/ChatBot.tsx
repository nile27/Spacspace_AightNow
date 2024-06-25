"use client";

import TextButton from "@/components/btnUi/TextButton";
import Bot from "./Bot";
import User from "./User";
import IconButton from "@/components/btnUi/IconButton";
import NewInput from "@/components/Input/Input";
import { useState } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  return (
    <>
      <div
        className="w-[512px] h-[656px] bg-white rounded-t-3xl"
        style={{
          position: "fixed",
          bottom: "0px",
          right: "0px",
          borderRadius: "3rem 3rem 0 0",
        }}
      >
        <div className="relative flex flex-col">
          <div
            className="w-full h-20 bg-mainNavy-900 rounded-t-3xl flex items-center justify-between px-4 fixed top-0"
            style={{ paddingLeft: "29px", borderRadius: "3rem 3rem 0 0" }}
          >
            <div className="text-scaleGray-0 text-xl font-bold leading-loose">나우챗봇</div>
            <div className="w-8 h-8 relative">
              <IconButton icon="Close" size="auto" style={{ border: "0" }} />
            </div>
          </div>

          <div className="h-[488px] overflow-y-scroll">
            <div className="flex flex-col p-4 gap-3 ">
              <Bot>
                안녕하세요 아잇나우 챗봇입니다. <br />
                해외주식 관련해서 궁금하신 점이 있으면
                <br />
                저에게 물어보세요!
              </Bot>
              <User content={`애플의 주요 매출처는 어떤 곳들인가요?`} />
              <Bot>
                애플의 주요 매출처에 대한 구체적인 정보를 찾지 못했습니다.양해 부탁드리며, 다른
                주제로 도와드릴 내용이 있으면 알려주세요.
              </Bot>
              <User content={`테슬라의 주가를 분석해줘`} />
              <Bot>
                테슬라의 주가를 분석한 리포트가 있습니다.
                <br />
                다만 투자 결정을 내리기 전에 전문가나 금융 자문가와
                <br />
                상담을 하는 것이 좋습니다.
              </Bot>
            </div>
          </div>
        </div>
        <form className="border-t  border-gray-200 flex items-center gap-2 p-4">
          <div className="flex-grow">
            <NewInput value={message} onChange={e => setMessage(e.target.value)} />
          </div>
          <TextButton size="custom" height="58px" width="64px">
            전송
          </TextButton>
        </form>
      </div>
    </>
  );
}
