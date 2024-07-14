"use client";

import TextButton from "@/components/btnUi/TextButton";
import WatchListCard, { TStockInfo } from "./WatchListCard";
import { useClose, useShow } from "@/Store/store";
import Header from "@/components/Header";
import WatchListAdd from "./WatchListAdd";
import { stockAction2 } from "@/lib/stockAction";
import { useEffect, useState } from "react";

export default function WatchList() {
  const { isShow, setIsShow } = useShow();
  const { isClose, setIsClose } = useClose();
  const [stockPriceInfo, setStockPriceInfo] = useState<TStockInfo | null>(null);

  const handleAdd = () => {
    setIsShow(!isShow);
    setIsClose(!isClose);
  };

  const testArr = ["apple", "google", "microsoft", "amazon", "unity", "tesla"];

  useEffect(() => {
    async function fetchData() {
      try {
        const stockPriceInfo = await stockAction2("apple");
        setStockPriceInfo(stockPriceInfo);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className={`w-full relative`}>
        <Header />
        <div className="mt-20 flex justify-center items-center">
          <div className={`w-[1214px] h-[1188px] mt-96 flex flex-col`}>
            <div className="w-[1214px] mt-14 h-9 flex flex-row justify-between font-pretendard ">
              <h2 className="text-2xl text-mainNavy-900 font-bold ">김스팩님의 관심종목</h2>
              <TextButton size="custom" width={"189px"} height={"36px"} onClick={handleAdd}>
                관심종목 추가
              </TextButton>
            </div>
            <div className={"my-6 grid grid-cols-3  gap-5"}>
              {testArr.map(
                (item, idx) =>
                  stockPriceInfo && (
                    <WatchListCard
                      key={idx}
                      name={item}
                      stockInfo={testArr}
                      stockPriceInfo={stockPriceInfo}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
        {isClose ? "" : <WatchListAdd />}
      </div>
    </>
  );
}
