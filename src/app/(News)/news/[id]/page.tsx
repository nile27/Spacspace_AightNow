"use client";

import { useNewsStore } from "@/Store/newsStore";
import CardSmallNews from "@/components/Card/CardSmallNews";
import Header from "@/components/Header";
import BasicIcon from "@/components/Icon/BasicIcons";
import ListStockUp from "@/components/List/ListStockUp";
import TextButton from "@/components/btnUi/TextButton";
import fireStore from "@/firebase/firestore";
import { collection, getDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type TPageProps = {
  params: { id: string };
};

export default function NewsDetail({ params }: TPageProps) {
  const { id } = params;
  const [loading, setLoading] = useState(false);

  const fetchNewsArticle = useNewsStore(state => state.fetchNewsArticle);
  const article = useNewsStore(state => state.newsArticle);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetchNewsArticle({ id });
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log(article);
  // getDoc(collection(fireStorem, 'news', id))

  return (
    <>
      <Header />
      <div className="h-full">
        <div className="w-[1200px] flex justify-between  mt-[121px]">
          <div className="w-[792px] flex flex-col bg-white p-8 font-pretendard rounded-2xl">
            <h1 className="text-3xl font-bold">{article.tit}</h1>
            <div className="w-[728px] h-9 flex  items-start ">
              <div className="w-[728px] flex  mt-4 gap-2  text-zinc-600 text-sm font-medium  leading-tight">
                <div className="">{article.ohnm}</div>
                <div className="text-right">∙</div>
                <div className="">{article.published}</div>
                <div className="text-right">∙</div>
                <div className="text-right">조회수 {article.view}회</div>
              </div>
              <div className="mt-3">
                <TextButton size="custom" width="176px" height="36px" icon="Translate">
                  번역하기
                </TextButton>
              </div>
            </div>
            <div className="w-[138px] h-6 flex justify-between my-8">
              <BasicIcon name="AI" size={24} />
              <div>아이낫우 AI 요약</div>
            </div>

            <div className=" flex flex-col">
              <div className="p-4 rounded-lg mb-4">
                바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성 바이오 연구의 첨단,인공
                유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
                가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공
                유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
                가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공
                유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성
              </div>
              {article.hasImage && (
                <img src={article.image} alt="image" width={728} height={370} className="my-8" />
              )}
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="w-[384px] h-[310px] bg-white rounded-2xl font-pretendard p-8">
              <h2 className="text-xl  ">현재 뉴스와 관련된 주식</h2>
              <div className=" flex flex-col ">
                <ListStockUp />
                <ListStockUp />
                <ListStockUp />
              </div>
            </div>
            <div className="w-[388px] h-[488px] p-8 bg-white rounded-2xl font-pretendard">
              <h2 className="font-bold text-xl">관련기사</h2>
              <div className=" flex flex-col gap-y-5 mt-[10px]">
                <CardSmallNews />
                <CardSmallNews />
                <CardSmallNews />
                <CardSmallNews />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
