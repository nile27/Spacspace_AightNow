"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useNewsStore, useStockStore } from "@/Store/newsStore";
import Section from "./Section";
import { allStockAction } from "@/lib/newsAction";
import { TStockData } from "@/app/api/(crawler)/type";

function SearchPanel(props: any) {
  const { searchTerm } = props;
  const [visibleItems, setVisibleItems] = useState(6);
  const [visibleNews, setVisibleNews] = useState(5);
  const [loading, setLoading] = useState(false);
  const fetchNewsList = useNewsStore(state => state.fetchNewsList);
  // const fetchStockList = useStockStore(state => state.fetchStockData);
  const [stockData, setStockData] = useState<TStockData[]>([]);
  // const stockData = useStockStore(state => state.stockData);
  const newsList = useNewsStore(state => state.newsList);
  const term = searchTerm.toLowerCase().trim();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allStock, newsList] = await Promise.all([allStockAction(), fetchNewsList()]);
        if (allStock) {
          setStockData(allStock);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  // 더보기 버튼 클릭 시 호출되는 함수
  const handleLoadMoreItems = () => {
    setVisibleItems(prevVisibleItems => Math.min(prevVisibleItems + 6, stockData.length));
  };

  const handleLoadMoreNews = () => {
    setVisibleNews(prevVisibleNews => prevVisibleNews + 5);
  };

  // 검색어에 따라 주식, 뉴스 데이터 필터링
  const filteredItems = useMemo(() => {
    if (!term || !stockData) return [];
    return stockData.filter(
      item =>
        item.stockName.includes(searchTerm) || // "애플"
        (item.reutersCode?.toLowerCase().includes(term) ?? false) || // "AAPL.O"
        item.logo.toLowerCase().includes(term), // "apple"
    );
  }, [searchTerm, stockData]);

  const filteredNews = useMemo(() => {
    if (!term || !newsList) return [];
    return newsList.filter(
      item => item.tit.toLowerCase().includes(term) || item.content.toLowerCase().includes(term),
    );
  }, [searchTerm, newsList]);

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
