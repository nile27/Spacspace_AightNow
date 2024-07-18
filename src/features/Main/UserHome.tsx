"use client";
import Stock from "@/components/Stock/Stock";
import Badge from "../../components/Badge/Badge";
import News from "./components/News";
import Report from "./components/Report";
import { useEffect, useState } from "react";
import Warning from "../../../public/icons/Warning.svg";
import { useAuthStore } from "@/Store/store";
import { useStockStore } from "@/Store/newsStore";
import Link from "next/link";
import { useFindStore } from "../search/components/findStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

export default function UserHome() {
  const [isShow, setIsShow] = useState(false);
  const { user } = useAuthStore();
  const [userStock, setUserStock] = useState<string[]>([]);

  const fetchStockList = useStockStore(state => state.fetchStockData);
  const stockData = useStockStore(state => state.stockData);

  const getSearchStockHistory = useFindStore(state => state.getSearchStockHistory);
  const stockHistory = useFindStore(state => state.stockHistory);

  useEffect(() => {
    async function fetchData() {
      try {
        const userDataId = (user?.userId as string) ? user?.userId : user?.id;
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

  useEffect(() => {
    async function fetchData() {
      try {
        getSearchStockHistory(user?.userId ?? user?.id ?? "");
        fetchStockList(); // 주식 데이터 가져오기
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const data = stockData.filter(stock => stockHistory.some(history => history.slug === stock.logo));

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
              {stockData
                .filter(item => userStock.includes(item.stockName))
                .slice(0, 3)
                .map((data, index) => (
                  <div key={index} className="">
                    <Report data={data} />
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
                    {data.length === 0 ? (
                      <div className="w-full h-full flex flex-col justify-center items-center text-center flex-grow">
                        <Warning />
                        <div className="text-mainNavy-900 text-body2 font-semibold mt-4">
                          최근 조회한 종목이 없습니다.
                        </div>
                      </div>
                    ) : (
                      data.slice(0, 4).map((data, index) => (
                        <div key={index} className="flex justify-between items-center rounded-lg ">
                          <Link href={`/report/${data.logo}`}>
                            <Stock
                              data={data}
                              logo={data.logo}
                              gap={`${
                                data.stockName.length < 3 && data.symbolCode.length < 5
                                  ? "gap-[291px]"
                                  : data.stockName.length < 4
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
                    {stockData
                      .filter(item => userStock.includes(item.stockName))
                      .slice(0, 4)
                      .map((data, index) => (
                        <div key={index} className="flex justify-between items-center rounded-lg">
                          <Link href={`/report/${data.logo}`}>
                            <Stock
                              data={data}
                              logo={data.logo}
                              gap={`${
                                data.stockName.length < 3 && data.symbolCode.length < 5
                                  ? "gap-[291px]"
                                  : data.stockName.length < 4
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
        <div className="fixed bottom-4 right-4 py-2 px-4">
          {isShow ? (
            <ChatBot />
          ) : (
            <IconButton size="chatBot" icon="ChatBot" onClick={() => setIsShow(true)} />
          )}
        </div>
      </div>
    </>
  );
}
