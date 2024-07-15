"use client";

import CardNews from "@/components/Card/CardNews";
import { useNewsStore } from "@/Store/newsStore";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function FavoriteNews() {
  const [loading, setLoading] = useState(false);

  const fetchRankNewsList = useNewsStore(state => state.fetchRankNewsList);
  const rankNewsList = useNewsStore(state => state.rankList);
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetchRankNewsList();
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log(rankNewsList);

  return (
    <>
      <div className="w-[1200px] h-[480px] font-['pretendard'] ">
        <h1 className="font-bold text-2xl mb-6">오늘 인기 있는 뉴스</h1>
        <div className="flex justify-between">
          {rankNewsList.slice(0, 1).map(data => (
            <Link
              href={{
                pathname: `/news/${data.id}`,
              }}
              key={data.id}
            >
              <CardNews image={data.image} data={data} />
            </Link>
          ))}
          <div className="flex flex-col justify-between">
            {rankNewsList.slice(1, 3).map(data => (
              <Link
                href={{
                  pathname: `/news/${data.id}`,
                }}
                key={data.id}
              >
                <CardNews image={data.image} data={data} height="200px" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
