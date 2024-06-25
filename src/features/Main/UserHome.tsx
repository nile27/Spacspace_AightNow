"use client";
import Stock from "@/components/Stock/Stock";
import { BadgeBlack } from "../../components/Badge/Badge";
import News from "./components/News";
import Report from "./components/Report";
import IconButton from "@/components/btnUi/IconButton";
import { useState } from "react";
import ChatBot from "../chatbot/ChatBot";

const datas = [
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0, reutersCode: "apple" },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0, reutersCode: "microsoft" },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0, reutersCode: "amazon" },
];

const lists = [
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0, reutersCode: "apple" },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0, reutersCode: "tesla" },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0, reutersCode: "unity" },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0, reutersCode: "google" },
];

export default function UserHome() {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div className="flex justify-center items-start w-full mt-[139px]">
        <div className="flex flex-col gap-12 w-full max-w-7xl">
          <div className="flex flex-col gap-4 justify-center">
            <div className="flex items-center">
              <div className="text-scaleGray-900 text-3xl font-bold leading-9">
                {"Next"}님의 AI 리포트
              </div>
              <div className="ml-2">
                <BadgeBlack />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              {datas.slice(0, 3).map((data, index) => (
                <div key={index} className="">
                  <Report data={data} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col justify-start">
                <div className="text-scaleGray-900 text-3xl font-bold leading-9">최근 조회</div>
                <div className="px-8 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8 bg-white rounded-2xl flex flex-col justify-start items-start mt-4">
                  <div className="w-full">
                    {lists.map((data, index) => (
                      <div key={index} className="flex justify-between items-center rounded-lg">
                        <Stock key={index} logo={data.reutersCode} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-scaleGray-900 text-3xl font-bold leading-9">관심 종목</div>
                <div className="px-8 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8 bg-white rounded-2xl flex flex-col justify-start items-start mt-4">
                  <div className="w-full">
                    {lists.map((data, index) => (
                      <div key={index} className="flex justify-between items-center rounded-lg">
                        <Stock key={index} logo={data.reutersCode} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-scaleGray-900 text-3xl font-bold leading-9">
                {"Next"}님을 위한 주식뉴스
              </div>
              <div className="mt-4 w-full">
                <News />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4 py-2 px-4">
          {isShow ? (
            <ChatBot onClick={() => setIsShow(false)} />
          ) : (
            <IconButton size="chatBot" icon="ChatBot" onClick={() => setIsShow(true)} />
          )}
        </div>
      </div>
    </>
  );
}
