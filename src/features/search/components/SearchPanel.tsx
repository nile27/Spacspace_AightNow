"use client";

import React, { useMemo, useState } from "react";
import Section from "./Section";

const fetchSearchResults = [
  {
    reutersCode: "AAPL.O",
    stockName: "애플",
    symbolCode: "AAPL",
    closePrice: "145.86",
    compareToPreviousPrice: {
      text: "하락",
    },
    compareToPreviousClosePrice: "0.86",
    fluctuationsRatio: "2.00",
    logo: "apple",
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
    logo: "google",
  },
  {
    reutersCode: "AMZN.O",
    stockName: "아마존",
    symbolCode: "AMZN",
    closePrice: "3,599.92",
    compareToPreviousPrice: {
      text: "하락",
    },
    compareToPreviousClosePrice: "0.86",
    fluctuationsRatio: "2.00",
    logo: "amazon",
  },
  {
    reutersCode: "MSFT.O",
    stockName: "마이크로소프트",
    symbolCode: "MSFT",
    closePrice: "304.80",
    compareToPreviousPrice: {
      text: "상승",
    },
    compareToPreviousClosePrice: "0.86",
    fluctuationsRatio: "2.00",
    logo: "microsoft",
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

function SearchPanel(props: any) {
  const { searchTerm } = props;
  const [visibleItems, setVisibleItems] = useState(6);
  const [visibleNews, setVisibleNews] = useState(5);

  const handleLoadMoreItems = () => {
    setVisibleItems(prevVisibleItems => Math.min(prevVisibleItems + 6, fetchSearchResults.length));
  };

  const handleLoadMoreNews = () => {
    setVisibleNews(visibleNews + 5);
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm) return fetchSearchResults;
    return fetchSearchResults.filter(
      item =>
        item.stockName.toLowerCase().includes(searchTerm) || item.symbolCode.includes(searchTerm),
    );
  }, [searchTerm]);

  const filteredNews = useMemo(() => {
    if (!searchTerm) return news;
    return news.filter(item => item.title.toLowerCase().includes(searchTerm));
  }, [searchTerm]);

  console.log("SearchPanel");
  return (
    <>
      <div className="flex justify-center items-start w-full h-full">
        <div className="flex flex-col gap-12 w-full max-w-7xl">
          <div className="flex-col justify-start items-start gap-8 flex w-[615px]">
            <Section
              title="주식"
              count={filteredItems.length}
              items={filteredItems}
              visibleItems={visibleItems}
              handleLoadMore={handleLoadMoreItems}
            />
            <Section
              title="뉴스"
              count={filteredNews.length}
              items={filteredNews}
              visibleItems={visibleNews}
              handleLoadMore={handleLoadMoreNews}
              isNews
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPanel;
