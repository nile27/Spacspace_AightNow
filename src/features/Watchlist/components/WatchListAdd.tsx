"use client";

import StockList from "@/components/Stock/StockList";
import WatchInput from "./WatchInput";
import Header from "@/components/Header";
import BasicIcon from "@/components/Icon/BasicIcons";
import { useAuthStore, useClose, useShow } from "@/Store/store";
import { useEffect, useState } from "react";
import fireStore from "@/firebase/firestore";
import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  getDocs,
  where,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { stockAction2 } from "@/lib/stockAction";
import { TStockinfo } from "@/features/report/components/Summary";
import Icon from "@/components/Stock/Icon";

export type TStockSearch = {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  view?: number;
  priceInfo?: TStockinfo | null;
};

type TWatchListAddProps = {
  onAddStock?: (stock: string) => void;
};

export default function WatchListAdd({ onAddStock }: TWatchListAddProps) {
  const { isClose, setIsClose } = useClose();
  const { isShow, setIsShow } = useShow();
  const [searchResults, setSearchResults] = useState<TStockSearch[]>([]);
  const [watchList, setWatchList] = useState<TStockSearch[]>([]);
  const { user } = useAuthStore();
  const [popularStocks, setPopularStocks] = useState<TStockSearch[]>([]);

  const handleClose = () => {
    setIsShow(!isShow);
    setIsClose(!isClose);
  };

  const handleSearch = async (results: TStockSearch[]) => {
    const updatedResults = await Promise.all(
      results.map(async stock => {
        const lowCase = stock.nameEn.toLowerCase();
        const priceInfo = await stockAction2(lowCase);
        return { ...stock, priceInfo };
      }),
    );
    setSearchResults(updatedResults);
  };

  console.log(searchResults);

  const handleSelectStock = async (stock: TStockSearch) => {
    console.log("handleSelectStock called with:", stock);
    await handleItemClick(stock);
    if (!user || !user.userId || !user.id) return;

    try {
      // users 컬렉션 참조
      const usersRef = collection(fireStore, "users");

      // userId로 사용자 문서 찾기
      const q = query(usersRef, where("userId", "==", user.userId || user.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("User not found");
        return;
      }

      // 첫 번째 일치하는 문서 사용
      const userDoc = querySnapshot.docs[0];

      // 문서 업데이트
      await updateDoc(userDoc.ref, {
        stock: arrayUnion(stock.name), // 또는 필요한 stock 정보
      });

      console.log("Stock added successfully");

      if (onAddStock) {
        onAddStock(stock.name);
      }
    } catch (error) {
      console.error("Error adding stock:", error);
    }
    handleClose();
  };

  const handleItemClick = async (stock: TStockSearch) => {
    try {
      // Firestore에서 view 카운트 증가
      const stockRef = doc(fireStore, `stockSearchList`, stock.id);
      await updateDoc(stockRef, {
        view: increment(1),
      });

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

  useEffect(() => {
    fetchPopularStocks();
  }, []);

  const fetchPopularStocks = async () => {
    try {
      const stockRef = collection(fireStore, "stockSearchList");
      const q = query(stockRef, orderBy("view", "desc"), limit(5));
      const querySnapshot = await getDocs(q);

      const popularStockData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as TStockSearch[];
      setPopularStocks(popularStockData);
    } catch (error) {
      console.log(error);
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
              <h2 className="text-lg text-mainNavy-900 ">검색 결과</h2>
              <ul className="w-[712px] bg-white border border-scaleGray-400 rounded-lg">
                {searchResults.map(stock => (
                  <li key={stock.id} className="p-4  flex items-center rounded-lg">
                    <div className="flex items-center flex-grow">
                      <Icon name={stock.name} size={32} className="mr-4" />
                      <div>
                        <div className="font-bold">{stock.name}</div>
                        <div className="text-gray-600">{stock.symbol}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className=" mr-4">${stock.priceInfo?.closePrice}</span>
                      <span
                        className={`mr-4 ${
                          stock.priceInfo?.compareToPreviousPrice.code === "2"
                            ? "text-rose-500"
                            : "text-blue-500"
                        }`}
                      >
                        {stock.priceInfo?.compareToPreviousPrice.code === "2" ? "▲" : "▼"}{" "}
                        {stock.priceInfo?.fluctuationsRatio}%
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
              <div className="w-[714px] h-[288px]  justify-center items-center gap-6 border border-scaleGray-400 rounded-2xl">
                {popularStocks.map((stock, idx) => (
                  <div className="flex  flex-col" key={idx}>
                    <div className=" w-96  flex justify-around items-end">
                      <span className="mb-1">{idx + 1}위</span>
                      <StockList
                        name={stock.nameEn.toLowerCase()}
                        onClick={() => handleSelectStock(stock)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
