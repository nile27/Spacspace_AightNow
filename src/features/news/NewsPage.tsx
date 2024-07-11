"use client";

import Card from "@/components/Card/Card";
import ListNews from "@/components/List/ListNews";
import FavoriteNews from "@/features/report/components/FavoriteNews";
import { useNewsStore } from "@/Store/newsStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function NewsPage() {
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const fetchNewsList = useNewsStore(state => state.fetchNewsList);
  const fetchMoreNews = useNewsStore(state => state.fetchMoreNews);
  const data = useNewsStore(state => state.newsList);

  useEffect(() => {
    const loadInitialData = () => {
      setLoading(true);
      fetchNewsList();
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
      // alert("View End");
    }
  }, [inView]);
  return (
    <>
      <div className="w-[1200px] h-full font-pretendard mt-60">
        <FavoriteNews />
        <div className="my-12">
          <h2 className="font-bold text-2xl py-4">관심종목과 관련된 뉴스</h2>
          <div className="grid grid-cols-3 gap-5">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <h2 className="font-bold text-2xl py-4">최신뉴스 테스트 </h2>
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
            <div ref={ref}></div>
          </div>
        </div>
      </div>
    </>
  );
}
