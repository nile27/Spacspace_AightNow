"use client";

import Stock from "@/components/Stock/Stock";
import { useState } from "react";
import FindNews from "./FindNews";
import StockList from "./StockList";

const items = [
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
];

const news = [
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    time: "n시간 전",
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    time: "n시간 전",
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    time: "n시간 전",
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    time: "n시간 전",
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    time: "n시간 전",
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    time: "n시간 전",
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    time: "n시간 전",
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    time: "n시간 전",
    company: "문화일보",
  },
];

export default function SearchPanel() {
  const [visibleItems, setVisibleItems] = useState(6);
  const [visibleNews, setVisibleNews] = useState(5);

  const handleLoadMoreItems = () => {
    setVisibleItems(prevVisibleItems => Math.min(prevVisibleItems + 6, items.length));
  };

  const handleLoadMoreNews = () => {
    setVisibleNews(visibleNews + 5);
  };
  return (
    <>
      <div className="flex-col justify-start items-start gap-8 flex w-[615px]">
        <div className="w-full flex-col justify-start items-center gap-2 flex">
          <div className="items-center gap-2 inline-flex w-full">
            <div className="text-blue-950 text-2xl font-bold font-['Pretendard'] leading-loose">
              주식
            </div>
            <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] underline leading-tight">
              {`(${items.length})`}
            </div>
          </div>
          <StockList items={items} />
        </div>

        <div className="flex-col justify-start items-start gap-2 flex w-full">
          <div className="items-center gap-4 inline-flex w-full">
            <div className="text-blue-950 text-2xl font-bold font-['Pretendard'] leading-loose">
              뉴스
            </div>
            <div className="text-zinc-600 text-sm font-medium underline leading-tight">
              {`(${news.length})`}
            </div>
          </div>
          <div className="p-6 bg-white rounded-2xl flex-col justify-start items-start flex w-full">
            <div className="flex flex-col">
              {news.slice(0, visibleNews).map((data, index) => (
                <div key={index}>
                  <div className="flex rounded-lg gap-4 pb-4">
                    <FindNews data={data} />
                  </div>
                </div>
              ))}
            </div>
            {visibleNews < news.length && (
              <div className="h-12 pt-2 flex justify-center items-center gap-2.5 w-full border-t-2">
                <button
                  onClick={handleLoadMoreNews}
                  className="text-neutral-400 text-base font-medium font-['Pretendard'] leading-normal"
                >
                  더보기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
