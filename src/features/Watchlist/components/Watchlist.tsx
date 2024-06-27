"use client";

import WatchCard from "@/components/Card/WatchCard";
import BasicIcon from "@/components/Icon/BasicIcons";
import StockList from "@/components/Stock/StockList";
import { useState } from "react";

export default function Watchlist() {
  const [isShow, setIsShow] = useState(false);
  const [search, setSearch] = useState("");

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search);
  };

  return (
    <>
      <div className="w-[794px] h-[735px] bg-white font-pretendard p-10 rounded-[32px]">
        <div className="font-bold text-2xl text-mainNavy-900 text-center">관심종목 추가</div>
        <div>
          <form action="">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                onChange={searchHandle}
                className="w-[714px] h-14 rounded-lg border border-scaleGray-400 relative p-2 mb-6 mt-8"
              />
              <button className="absolute mt-2 2xl:right-[630px] xl:right-[380px] ">
                <BasicIcon name="Search" size={24} />
              </button>
            </div>
          </form>
        </div>
        <div className="w-full flex flex-col  font-['pretendard']">
          <div className="flex justify-between">
            <h2>최근 검색한 종목</h2>
            <div>전체삭제</div>
          </div>
          <div>
            <WatchCard />
          </div>
        </div>
        <div className="w-[714px] h-[332px]">
          <h2 className="text-lg text-mainNavy-900">인기검색어</h2>
          <div className="w-[714px] h-[288px] flex justify-center items-center gap-6  border border-scaleGray-400 rounded-2xl ">
            <div>
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
            </div>
            <div>
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
              <StockList name={"apple"} size={32} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
