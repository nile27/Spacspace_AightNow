"use client";

import Card from "@/components/Card/Card";
import ListNews from "@/components/List/ListNews";
import FavoriteNews from "@/features/report/components/FavoriteNews";
import { useNewsStore } from "@/Store/newsStore";
import { useAuthStore } from "@/Store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "./components/Spinner";
import { getRandomImageNews } from "../Main/components/common";

const nameMapping: { [key: string]: string } = {
  애플: "apple",
  테슬라: "tesla",
  구글: "google",
  아마존: "amazon",
  마이크로소프트: "microsoft",
  유니티: "unity",
};
// 주식 종목 이름을 변환하는 함수
const convertName = (name: string) => {
  return nameMapping[name] || name;
};

export default function NewsPage() {
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const fetchNewsList = useNewsStore(state => state.fetchNewsList);
  const fetchMoreNews = useNewsStore(state => state.fetchMoreNews);
  const fetchStockNewsList = useNewsStore(state => state.fetchStockNewsList);
  const stockNewsList = useNewsStore(state => state.stockNewsList);
  const hasMore = useNewsStore(state => state.hasMore);
  const data = useNewsStore(state => state.newsList);
  const { user } = useAuthStore();
  const changeStockName = user?.stock.map(item => convertName(item));

  useEffect(() => {
    const loadInitialData = () => {
      setLoading(true);
      fetchNewsList();
      fetchStockNewsList(changeStockName as string[]);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      fetchMoreNews(); // 추가 데이터 로드 함수 호출
      setTimeout(() => {
        setLoading(false);
      }, 300);
      //   alert("View End");
    }
  }, [inView, hasMore]);

  // const randomStockNews = getRandomImageNews(stockNewsList, 3);

  return (
    <>
      <div className="w-[1200px] h-full font-pretendard mt-60">
        <FavoriteNews />
        <div className="my-12">
          <h2 className="font-bold text-2xl py-4">관심종목과 관련된 뉴스</h2>
          <div className="grid grid-cols-3 gap-5">
            {stockNewsList
              .filter(data => data.image)
              .slice(0, 3)
              .map(news => (
                <Link key={news.id} href={`/news/${news.id}`}>
                  <Card data={news} />
                </Link>
              ))}
          </div>
        </div>
        <h2 className="font-bold text-2xl py-4">최신뉴스 </h2>
        <div className="w-[1200px] bg-white rounded-2xl p-12">
          <div className="flex flex-col gap-8 ">
            {data.map(news => (
              <Link
                href={{
                  pathname: `/news/${news.id}`,
                }}
                key={news.id}
              >
                <ListNews data={news} />
              </Link>
            ))}
            <div ref={ref}>
              {loading && (
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              )}
            </div>
            {!hasMore && (
              <p className="text-scaleGray-400 text-base leading-normal text-center">
                마지막 기사입니다
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
