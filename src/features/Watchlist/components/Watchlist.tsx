"use client";

import TextButton from "@/components/btnUi/TextButton";
import WatchListCard, { TStockInfo } from "./WatchListCard";
import { useClose, useShow, useWatchList } from "@/Store/store";
import Header from "@/components/Header";
import WatchListAdd, { TStockSearch } from "./WatchListAdd";
import { stockAction2 } from "@/lib/stockAction";
import { useEffect, useState } from "react";
import fireStore from "@/firebase/firestore";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export default function WatchList() {
  const { isShow, setIsShow } = useShow();
  const { isClose, setIsClose } = useClose();
  const [stockPriceInfo, setStockPriceInfo] = useState<TStockInfo | null>(null);
  const [wathchList, setWatchList] = useState<TStockSearch[]>([]);
  const db = collection(fireStore, "stockSearchList");

  const { stockWatchList } = useWatchList();

  const handleAdd = () => {
    setIsShow(!isShow);
    setIsClose(!isClose);
  };

  const handleAddStock = (stock: TStockSearch) => {
    setWatchList(prev => {
      if (!prev.some(item => item.symbol === stock.symbol)) {
        return [...prev, stock];
      }
      return prev;
    });
  };

  const handleDelete = (stockToDelete: TStockSearch) => {
    setWatchList(prev => prev.filter(stock => stock.id !== stockToDelete.id));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const stockPriceInfo = await stockAction2(stockWatchList);
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
              {wathchList.map(
                (item, idx) =>
                  stockPriceInfo && (
                    <WatchListCard
                      key={idx}
                      name={item.nameEn}
                      onDelete={() => handleDelete(item)}
                      stockPriceInfo={stockPriceInfo}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
        {isClose ? "" : <WatchListAdd onAddStock={handleAddStock} />}
      </div>
    </>
  );
}
