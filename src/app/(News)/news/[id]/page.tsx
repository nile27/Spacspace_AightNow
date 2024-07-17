"use client";

import { useNewsStore, useStockStore } from "@/Store/newsStore";
import CardSmallNews from "@/components/Card/CardSmallNews";
import Header from "@/components/Header";
import TextButton from "@/components/btnUi/TextButton";
import React, { useEffect, useState } from "react";
import ArticleIcon from "@/features/news/components/ArticleIcon.svg";
import Stock from "@/components/Stock/Stock";
import Link from "next/link";
import { useAuthStore } from "@/Store/store";

type TPageProps = {
  params: { id: string };
};

function formatDateTime(dateTimeStr: string) {
  if (!dateTimeStr || dateTimeStr.length !== 14) {
    console.error("Invalid dateTimeStr format");
    return null;
  }

  const year = dateTimeStr.substring(0, 4);
  const month = dateTimeStr.substring(4, 6);
  const day = dateTimeStr.substring(6, 8);
  const hour = parseInt(dateTimeStr.substring(8, 10), 10);
  const minute = dateTimeStr.substring(10, 12);

  const period = hour >= 12 ? "오후" : "오전";
  const formattedHour = hour % 12 || 12;

  return `${year}년 ${month}월 ${day}일 ${period} ${formattedHour}:${minute}`;
}

export default function NewsDetail({ params }: TPageProps) {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [stockDataList, setStockDataList] = useState<any[]>([]);
  const fetchNewsArticle = useNewsStore(state => state.fetchNewsArticle);
  const fetchStockNewsList = useNewsStore(state => state.fetchStockNewsList);
  const fetchUpdateViews = useNewsStore(state => state.fetchUpdateViews);
  const view = useNewsStore(state => state.view);
  const fetchStockData = useStockStore(state => state.fetchStockData);
  const stockData = useStockStore(state => state.stockData);
  const stockNewsList = useNewsStore(state => state.stockNewsList);
  const article = useNewsStore(state => state.newsArticle);
  const [translatedHtml, setTranslatedHtml] = useState<string>("");
  const [translated, setTranslated] = useState(false);
  const { user } = useAuthStore();

  const handleTranslate = async (html: string, targetLang: string) => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html, targetLang }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const result = await response.json();
      console.log(result.translatedHTML);
      setTranslatedHtml(result.translatedHTML);
      setTranslated(!translated);
    } catch (error) {
      console.error("Error translating HTML:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchNewsArticle({ id });
      await fetchStockData();
      await fetchUpdateViews(id);
      setLoading(false);
    };
    fetchData();
  }, [id, fetchNewsArticle, fetchStockData, fetchUpdateViews]);

  useEffect(() => {
    if (article.relatedItems) {
      fetchStockNewsList(article.relatedItems);
    }
    if (stockData && article.relatedItems) {
      const orderedStockData = article.relatedItems
        .map(item => stockData.find(stock => stock.logo === item))
        .filter(Boolean); // undefined 요소 제거

      setStockDataList(orderedStockData);
    }
  }, [stockData, article.relatedItems]);

  return (
    <>
      <Header />
      <div className="h-full">
        <div className="w-[1200px] flex justify-between mt-[121px]">
          <div className="w-[792px] flex flex-col bg-white p-8 font-pretendard rounded-2xl">
            <h1
              className="text-3xl font-bold"
              dangerouslySetInnerHTML={{ __html: article.tit }}
            ></h1>
            <div className="w-[728px] h-9 flex items-start">
              <div className="w-[728px] flex mt-4 gap-2 text-zinc-600 text-sm font-medium leading-tight">
                <div className="">{article.ohnm}</div>
                <div className="text-right">∙</div>
                <div className="">
                  {isNaN(Number(article.published))
                    ? article.published
                    : formatDateTime(article.published)}
                </div>
                <div className="text-right">∙</div>
                <div className="text-right">조회수 {view}회</div>
              </div>
              <div className="mt-3">
                <TextButton
                  size="custom"
                  width="176px"
                  height="36px"
                  icon="Translate"
                  onClick={() => handleTranslate(article.content, user?.language ?? "en")}
                >
                  번역하기
                </TextButton>
              </div>
            </div>
            <div className="w-[138px] h-6 flex justify-between my-8">
              <div className="w-6 h-6 pt-[5.2px] pb-[6.34px] pl-[4.82px] pr-[4.4px] bg-mainNavy-900 rounded-md flex items-center justify-center">
                <div className="relative">
                  <ArticleIcon />
                </div>
              </div>
              <div>아이낫우 AI 요약</div>
            </div>

            <div className="flex flex-col">
              <div className="p-4 rounded-lg mb-4">
                바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성 바이오 연구의 첨단,인공
                유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
                가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공
                유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
                가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공
                유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성
              </div>
              {article.image && (
                <img src={article.image} alt="image" width={728} height={370} className="my-8" />
              )}
              {translated ? (
                <div dangerouslySetInnerHTML={{ __html: article.translatedHtml }}></div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="w-[384px] bg-white rounded-2xl font-pretendard p-8">
              <h2 className="text-xl mb-3">현재 뉴스와 관련된 주식</h2>
              <div className="flex flex-col">
                {stockDataList.map((data, index) => (
                  <Link href={`/report/${data.logo}`} key={index}>
                    <Stock
                      data={data}
                      logo={article.relatedItems[index]}
                      gap={`${
                        data.stockName.length < 3 && data.symbolCode.length < 5
                          ? "gap-32"
                          : data.stockName.length < 4
                          ? "gap-[113px]"
                          : "gap-[49px]"
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-[388px] h-[488px] p-8 bg-white rounded-2xl font-pretendard">
              <h2 className="font-bold text-xl">관련기사</h2>
              <div className="flex flex-col gap-y-5 mt-[10px]">
                {stockNewsList.slice(0, 4).map(news => (
                  <Link href={`/news/${news.id}`} key={news.id}>
                    <CardSmallNews data={news} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
