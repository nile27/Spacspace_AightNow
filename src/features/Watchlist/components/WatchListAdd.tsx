"use client";

import StockList from "@/components/Stock/StockList";
import WatchInput from "./WatchInput";
import Header from "@/components/Header";
import BasicIcon from "@/components/Icon/BasicIcons";
import { useClose, useShow } from "@/Store/store";
import { useState } from "react";
import fireStore from "@/firebase/firestore";
import { doc, updateDoc, increment } from "firebase/firestore";
import { stockAction2 } from "@/lib/stockAction";
import { TStockinfo } from "@/features/report/components/Summary";
import Icon from "@/components/Stock/Icon";

export type TStockSearch = {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  view?: number;
};

export default function WatchListAdd() {
  const { isClose, setIsClose } = useClose();
  const { isShow, setIsShow } = useShow();
  const [searchResults, setSearchResults] = useState<TStockSearch[]>([]);
  const [stockPriceInfo, setStockPriceInfo] = useState<TStockinfo | null>(null);
  const [watchList, setWatchList] = useState<TStockSearch[]>([]);

  const handleClose = () => {
    setIsShow(!isShow);
    setIsClose(!isClose);
  };

  const handleSearch = async (results: TStockSearch[]) => {
    const result = await stockAction2("apple");
    setStockPriceInfo(result);
    setSearchResults(results);
  };

  const handleSelectStock = async (stock: TStockSearch) => {
    await handleItemClick(stock);
  };

  const handleItemClick = async (stock: TStockSearch) => {
    try {
      // Firestore에서 view 카운트 증가
      const stockRef = doc(fireStore, `stockSearchList`, stock.id);
      await updateDoc(stockRef, {
        view: increment(1),
      });

      // 로컬 상태 업데이트
      setSearchResults(prevResults =>
        prevResults.map(s => (s.id === stock.id ? { ...s, view: (s.view || 0) + 1 } : s)),
      );

      // 관심 목록에 추가 (중복 체크)
      setWatchList(prevList => {
        if (!prevList.some(item => item.id === stock.id)) {
          return [...prevList, stock];
        }
        return prevList;
      });
    } catch (error) {
      console.error("Error updating stock view count:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="fixed inset-0 bg-scaleGray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="w-[794px] h-[735px] bg-white font-pretendard p-10 rounded-[32px] overflow-y-scroll scroll-smooth scrollbar-hide">
          <div className="w-full flex justify-between items-center">
            <div className="font-bold text-2xl text-mainNavy-900">관심종목 추가</div>
            <button onClick={handleClose}>
              <BasicIcon name="Close" color="gray" width={48} height={48} />
            </button>
          </div>
          <div>
            <WatchInput onSearch={handleSearch} onSelectStock={handleSelectStock} />
          </div>

          {searchResults.length > 0 ? (
            <div className="w-[714px] mt-12">
              <h2 className="text-lg text-mainNavy-900">검색 결과</h2>
              <ul className="w-[712px] bg-white border border-scaleGray-400 rounded-lg">
                {searchResults.map(stock => (
                  <li key={stock.id} className="p-4  flex items-center rounded-lg">
                    <div className="flex items-center flex-grow">
                      <Icon name="apple" size={32} className="mr-4" />
                      <div>
                        <div className="font-bold">{stock.name}</div>
                        <div className="text-gray-600">{stock.symbol}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className=" mr-4">${stockPriceInfo?.closePrice}</span>
                      <span
                        className={`mr-4 ${
                          stockPriceInfo?.compareToPreviousPrice.code === "2"
                            ? "text-rose-500"
                            : "text-blue-500"
                        }`}
                      >
                        {stockPriceInfo?.compareToPreviousPrice.code === "2" ? "▲" : "▼"}{" "}
                        {stockPriceInfo?.fluctuationsRatio}%
                      </span>
                      <button
                        className="bg-mainNavy-900 hover:opacity-80 text-white px-4 py-2 rounded"
                        onClick={() => handleSelectStock(stock)}
                      >
                        추가
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="w-[714px] h-[332px] mt-12">
              <h2 className="text-lg text-mainNavy-900">인기검색어</h2>
              <div className="w-[714px] h-[288px] flex justify-center items-center gap-6 border border-scaleGray-400 rounded-2xl">
                <div>
                  <StockList name={"apple"} size={32} />
                  <StockList name={"google"} size={32} />
                  <StockList name={"amazon"} size={32} />
                  <StockList name={"unity"} size={32} />
                  <StockList name={"tesla"} size={32} />
                </div>
                <div>
                  <StockList name={"apple"} size={32} />
                  <StockList name={"google"} size={32} />
                  <StockList name={"amazon"} size={32} />
                  <StockList name={"unity"} size={32} />
                  <StockList name={"tesla"} size={32} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
