"user client";

import Link from "next/link";
import WatchCard from "../../../components/Card/WatchCard";
import ListNews from "../../../components/List/ListNews";
import { useEffect, useState } from "react";
import { useNewsStore } from "@/Store/newsStore";
import { extractTextFromHTML } from "@/features/news/components/common";

const lists = [
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
];

export default function News() {
  const [loading, setLoading] = useState(false);
  const fetchNewsList = useNewsStore(state => state.fetchNewsList);
  const fetchStockNewsList = useNewsStore(state => state.fetchStockNewsList);
  const stockList = useNewsStore(state => state.newsList);
  const data = useNewsStore(state => state.newsList);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetchNewsList();
      fetchStockNewsList(["apple"]);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full p-4 gap-12 sm:p-8 md:p-12 bg-white rounded-3xl flex flex-col justify-start items-start mt-6">
        <div className="w-full">
          <div className="text-mainNavy-900 text-2xl font-semibold leading-9 pb-4">관심 종목</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-3xl">
            {stockList.slice(0, 3).map(data => (
              <Link
                key={data.id}
                href={{
                  pathname: `/news/${data.id}`,
                }}
              >
                <div className="rounded-lg">
                  <WatchCard data={data} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="text-mainNavy-900 text-2xl font-semibold leading-9 pb-4">주요 뉴스</div>
          <div className="w-full border border-mainNavy-100 rounded-3xl p-4 sm:p-8">
            {data.slice(0, 1).map((data, index) => (
              <Link
                href={{
                  pathname: `/news/${data.id}`,
                }}
                key={data.id}
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <img className="w-full sm:w-80 h-60 rounded-3xl" src={data.thumbUrl} alt="News" />
                  <div className="flex flex-col justify-start items-start w-full ">
                    <div
                      className="self-stretch text-black text-2xl font-medium leading-loose"
                      dangerouslySetInnerHTML={{ __html: data.tit }}
                    >
                      {/* {data.tit} */}
                    </div>
                    <hr className="w-full border-t border-scaleGray-400 my-6" />
                    <div className="w-full max-w-full text-zinc-700 text-lg font-normal leading-7 line-clamp-5 text-justify">
                      {/* {data.subcontent} */}
                      {extractTextFromHTML(data.content)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="text-mainNavy-900 text-2xl font-semibold leading-9 pb-4">최신 뉴스</div>
          <div className="border border-mainNavy-100 rounded-3xl">
            {data.slice(1, 4).map((news, index) => (
              <div key={news.id}>
                <div className="flex rounded-lg pt-12 px-12">
                  <Link
                    href={{
                      pathname: `/news/${news.id}`,
                    }}
                  >
                    <ListNews data={news} />
                  </Link>
                </div>
                {index < 2 && <hr className="border-t border-scaleGray-400 mx-8" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
