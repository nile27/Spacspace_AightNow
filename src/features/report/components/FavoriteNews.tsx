"use client";

import CardNews from "@/components/Card/CardNews";
import { shuffleArray } from "@/features/Main/components/common";
import { useNewsStore } from "@/Store/newsStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const imageFiles = ["news1.jpg", "news2.jpg", "news3.jpg", "news4.jpg", "news5.jpg"];
export default function FavoriteNews() {
  const [loading, setLoading] = useState(false);
  const [randomImages, setRandomImages] = useState<string[]>([]);
  const fetchRankNewsList = useNewsStore(state => state.fetchRankNewsList);
  const rankNewsList = useNewsStore(state => state.rankList);

  useEffect(() => {
    // 이미지를 랜덤으로 섞어서 상태에 저장
    setRandomImages(shuffleArray([...imageFiles]));
  }, []);

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
          {rankNewsList.slice(0, 1).map((data, index) => (
            <Link href={`/news/${data.id}`} key={data.id}>
              {data.image == undefined ? (
                <CardNews
                  image={`/news/${randomImages[index % randomImages.length]}`}
                  data={data}
                />
              ) : (
                <CardNews image={data.image} data={data} />
              )}
            </Link>
          ))}
          <div className="flex flex-col justify-between">
            {rankNewsList.slice(1, 3).map((data, index) => (
              <Link href={`/news/${data.id}`} key={data.id}>
                {data.image == undefined ? (
                  <CardNews
                    image={`/news/${randomImages[(index + 1) % randomImages.length]}`}
                    data={data}
                    height="200px"
                  />
                ) : (
                  <CardNews image={data.image} data={data} height="200px" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
