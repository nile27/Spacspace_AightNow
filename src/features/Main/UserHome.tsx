"use client";
import Stock from "@/components/Stock/Stock";
import Badge from "../../components/Badge/Badge";
import News from "./components/News";
import Report from "./components/Report";
import { useEffect, useState } from "react";
import Warning from "../../../public/icons/Warning.svg";
import { useAuthStore } from "@/Store/store";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { getSearchStockHistory } from "@/lib/newsAction";
import { TStockInfo } from "../Watchlist/components/WatchListCard";
import { stockAction2 } from "@/lib/stockAction";
import { TFindHistory } from "../search/components/SearchEmpty";

const STOCK_NAME_KO_TO_EN: { [key: string]: string } = {
  애플: "apple",
  테슬라: "tesla",
  아마존: "amazon",
  구글: "google",
  마이크로소프트: "microsoft",
  유니티: "unity",
};

const nameMapping: { [key: string]: string } = {
  애플: "AAPL.O",
  테슬라: "TSLA.O",
  구글: "GOOGL.O",
  아마존: "AMZN.O",
  마이크로소프트: "MSFT.O",
  유니티: "U",
};

// 주식 종목 이름을 변환하는 함수
export const convertName = (name: string) => {
  return nameMapping[name] || name;
};

export default function UserHome() {
  const { user } = useAuthStore();
  const [userStock, setUserStock] = useState<string[]>([]);
  const [stockData, setStockData] = useState<TFindHistory[]>([]); // 최근 조회 주식 정보
  const [stockPriceInfoMap, setStockPriceInfoMap] = useState<Map<string, TStockInfo>>(new Map());
  const [stockDataInfo, setStockDataInfo] = useState<Map<string, TStockInfo>>(new Map());

  const userDataId = (user?.userId as string) ? user?.userId : user?.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const userRef = collection(fireStore, "users");
        const q = query(userRef, where("userId", "==", userDataId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDocs = querySnapshot.docs[0];
          const userData = userDocs.data();
          setUserStock(userData.stock || []);
        } else {
          console.log("사용자를 찾을 수 없습니다");
          setUserStock([]);
        }
      } catch (error) {
        console.error("Error fetching userStock:", error);
      }
    }
    fetchData();
  }, []);

  // 최근 조회 주식 정보를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockHistoryData = await getSearchStockHistory(userDataId as string);
        setStockData(stockHistoryData as TFindHistory[]);

        if (stockHistoryData && stockHistoryData.length > 0) {
          const stockInfoPromises = stockHistoryData.map(stock => stockAction2(stock.slug));
          const stockInfoData = await Promise.all(stockInfoPromises);

          const newStockDataInfo = new Map(
            stockHistoryData.map((stock, index) => [stock.term, stockInfoData[index]]),
          );
          setStockDataInfo(newStockDataInfo);
        }
      } catch (error) {
        console.error("주식 정보 조회 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [userDataId]); // user 대신 userDataId를 의존성 배열에 추가

  // 사용자 관심 종목의 주식 가격 정보를 가져오는 함수
  useEffect(() => {
    async function fetchStockPrices() {
      for (const stockName of userStock) {
        if (!stockPriceInfoMap.has(stockName)) {
          try {
            const stockEn = STOCK_NAME_KO_TO_EN[stockName];
            const stockPriceInfo = await stockAction2(stockEn);
            setStockPriceInfoMap(prev => new Map(prev).set(stockName, stockPriceInfo));
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    fetchStockPrices();
  }, [userStock]);
  return (
    <>
      <div className="flex justify-center items-start w-full mt-[139px]">
        <div className="flex flex-col gap-12 w-full max-w-7xl">
          <div className="flex flex-col gap-4 justify-center">
            <div className="flex items-center">
              <div className="text-mainNavy-900 text-3xl font-bold leading-9">
                {user?.nickname}님의 AI 리포트
              </div>
              <div className="ml-2">
                <Badge background="bg-mainNavy-900" color="white" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              {userStock.slice(0, 3).map((stockName, index) => (
                <div key={index} className="">
                  <Link href={`/report/${STOCK_NAME_KO_TO_EN[stockName]}`}>
                    <Report name={stockName} data={stockPriceInfoMap.get(stockName) || null} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col justify-start">
                <div className="text-mainNavy-900 text-3xl font-bold leading-9">최근 조회</div>
                <div className="h-[384px] px-8 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8 bg-white rounded-2xl flex flex-col justify-start items-start mt-4">
                  <div className="w-full min-h-[300px] flex flex-col items-center gap-4">
                    {stockData.length === 0 ? (
                      <div className="w-full h-full flex flex-col justify-center items-center text-center flex-grow">
                        <Warning />
                        <div className="text-mainNavy-900 text-body2 font-semibold mt-4">
                          최근 조회한 종목이 없습니다.
                        </div>
                      </div>
                    ) : (
                      stockData.slice(0, 4).map((data, index) => (
                        <div key={index} className="flex justify-between items-center rounded-lg ">
                          <Link href={`/report/${data.slug}`}>
                            <Stock
                              data={stockDataInfo.get(data.term) || null}
                              logo={data.slug}
                              gap={`${
                                data.term.length < 3 && convertName(data.term).length < 7
                                  ? "gap-[291px]"
                                  : data.term.length < 4
                                  ? "gap-[274px]"
                                  : "gap-[210px]"
                              }`}
                            />
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-mainNavy-900 text-3xl font-bold leading-9">관심 종목</div>
                <div className="h-[384px] px-8 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8 bg-white rounded-2xl flex flex-col justify-start items-start mt-4">
                  <div className="w-full min-h-[300px] flex flex-col  items-center gap-4">
                    {userStock.slice(0, 4).map((stockName, index) => (
                      <div key={index} className="flex justify-between items-center rounded-lg">
                        <Link href={`/report/${STOCK_NAME_KO_TO_EN[stockName]}`}>
                          <Stock
                            data={stockPriceInfoMap.get(stockName) || null}
                            logo={STOCK_NAME_KO_TO_EN[stockName] as string}
                            gap={`${
                              stockName.length < 3 && convertName(stockName).length < 7
                                ? "gap-[291px]"
                                : stockName.length < 4
                                ? "gap-[274px]"
                                : "gap-[210px]"
                            }`}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-mainNavy-900 text-3xl font-bold leading-9">
                {user?.nickname}님을 위한 주식뉴스
              </div>
              <div className="mt-4 w-full">
                <News />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
