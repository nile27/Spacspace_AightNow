"use client";

import Stock from "@/components/Stock/Stock";
import { useState } from "react";
import FindNews from "./FindNews";

const items = [
  {
    reutersCode: "AAPL.O",
    stockName: "애플",
    symbolCode: "AAPL",
    closePrice: "145.86",
    compareToPreviousPrice: {
      text: "상승",
    },
    compareToPreviousClosePrice: "0.86",
    fluctuationsRatio: "2.00",
  },
  {
    reutersCode: "GOOGL.O",
    stockName: "구글",
    symbolCode: "GOOGL",
    closePrice: "2,763.82",
    compareToPreviousPrice: {
      text: "상승",
    },
    compareToPreviousClosePrice: "0.86",
    fluctuationsRatio: "2.00",
  },
  {
    reutersCode: "AMZN.O",
    stockName: "아마존",
    symbolCode: "AMZN",
    closePrice: "3,599.92",
    compareToPreviousPrice: {
      text: "상승",
    },
    compareToPreviousClosePrice: "0.86",
    fluctuationsRatio: "2.00",
  },
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

export default function SearchPanel(props: any) {
  const { searchTerm } = props;
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
          <div className="p-6 bg-white rounded-2xl flex-col justify-start items-start flex w-full">
            <div className="flex flex-col justify-start items-center gap-4 w-full">
              <div className="grid grid-cols-2 gap-4 w-full">
                {items
                  .filter(
                    item =>
                      item.stockName.toLowerCase().includes(searchTerm) ||
                      item.symbolCode.includes(searchTerm),
                  )
                  .slice(0, visibleItems)
                  .map((data, index) => (
                    <div key={index} className="flex justify-between items-center rounded-lg">
                      <Stock key={index} data={data} logo={"apple"} gap="gap-[64px]" />
                    </div>
                  ))}
              </div>
              {visibleItems < items.length && (
                <div className="h-12 pt-2 flex justify-center items-center gap-2.5 w-full border-t-2">
                  <button
                    onClick={handleLoadMoreItems}
                    className="text-neutral-400 text-base font-medium font-['Pretendard'] leading-normal"
                  >
                    더보기
                  </button>
                </div>
              )}
            </div>
          </div>
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
              {news
                .filter(item => item.title.toLowerCase().includes(searchTerm))
                .slice(0, visibleNews)
                .map((data, index) => (
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
