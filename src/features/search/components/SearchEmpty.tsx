import { useEffect, useState } from "react";
import { useFindStore } from "./findStore";
import Ranking from "./Ranking";
import SearchCurrent from "./SearchCurrent";
import Link from "next/link";
import { useAuthStore } from "@/Store/store";

export type TFindHistory = {
  id: string;
  userId: string;
  term: string;
  time: string;
  isNews: boolean;
  slug: string;
};

export default function SearchEmpty({ setSearch }: { setSearch: (term: string) => void }) {
  const searchHistory = useFindStore(state => state.searchHistory);
  const searchRank = useFindStore(state => state.searchRank);
  const getSearchHistory = useFindStore(state => state.getSearchHistory);
  const getSearchRank = useFindStore(state => state.getSearchRank);
  const deleteAllSearchHistory = useFindStore(state => state.deleteAllSearchHistory);
  const updateSearchHistory = useFindStore(state => state.updateSearchHistory);
  const { user } = useAuthStore();

  const userId = user?.userId ?? user?.id ?? "";

  useEffect(() => {
    getSearchHistory(userId);
    getSearchRank();
  }, [getSearchHistory]);

  const handleClick = () => {
    deleteAllSearchHistory(userId);
  };
  const handleSearchTerm = (term: string) => {
    updateSearchHistory(userId, term, new Date().toISOString());
    setSearch(term);
  };

  return (
    <>
      <div className="flex-col justify-start items-start gap-8 flex">
        <div className="flex-col justify-start items-center gap-2 flex">
          <div className="items-center gap-[431px] inline-flex w-full">
            <div className="text-mainNavy-900 text-2xl font-bold font-['Pretendard'] leading-loose">
              최근 검색어
            </div>
            {searchHistory.length > 0 && (
              <button
                className="text-scaleGray-600 text-sm font-medium font-['Pretendard'] underline leading-tight"
                onClick={handleClick}
              >
                전체삭제
              </button>
            )}
          </div>
          {searchHistory.length > 0 ? (
            <div className="w-full p-6 bg-white rounded-2xl flex-col justify-start items-start gap-2.5 flex">
              <div className="flex-col justify-start items-start flex">
                {searchHistory.map((item, index) =>
                  item.isNews ? (
                    <Link key={index} href={`/news/${item.slug}`} legacyBehavior>
                      <a>
                        <SearchCurrent data={item} onClick={() => handleSearchTerm(item.term)} />
                      </a>
                    </Link>
                  ) : (
                    <SearchCurrent
                      key={index}
                      data={item}
                      onClick={() => handleSearchTerm(item.term)}
                    />
                  ),
                )}
              </div>
            </div>
          ) : (
            <div className="w-[615px] p-6 bg-white rounded-2xl flex-col justify-start items-start gap-2.5 flex">
              <div className="flex flex-col justify-start items-center gap-4 w-full">
                <div className="text-scaleGray-400 text-base leading-normal">
                  원하시는 검색어를 입력해주세요.
                </div>
              </div>
            </div>
          )}
        </div>

        {searchRank.length >= 10 && (
          <div className="flex-col justify-start items-start gap-2 flex w-full">
            <div className="items-center gap-4 inline-flex w-full">
              <div className="text-mainNavy-900 text-2xl font-bold font-['Pretendard'] leading-loose">
                인기 검색어
              </div>
              {/* <div className="text-scaleGray-600 text-sm font-medium underline leading-tight">
                00:00 기준
              </div> */}
            </div>
            <div className="p-6 bg-white rounded-2xl flex-col justify-start items-start flex w-full">
              <div className="justify-start items-start gap-4 flex w-full">
                <div className="flex-col justify-start items-start gap-4 inline-flex w-1/2">
                  {searchRank.slice(0, 5).map((item, index) => (
                    <Ranking key={item.rank} data={{ ...item, rank: index + 1 }} />
                  ))}
                </div>
                <div className="flex-col justify-start items-start gap-4 inline-flex w-1/2">
                  {searchRank.slice(5).map((item, index) => (
                    <Ranking key={item.rank} data={{ ...item, rank: index + 1 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
