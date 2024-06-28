"use client";

import TextButton from "@/components/btnUi/TextButton";
import WatchListCard from "./WatchListCard";
import { Dispatch, SetStateAction, useState } from "react";

export default function WatchList() {
  const [isShow, setIsShow] = useState(false);
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <div className={`w-[1214px] h-[1188px] mt-96 flex flex-col`}>
        <div className="w-[1214px] mt-14 h-9 flex justify-between font-pretendard ">
          <h2 className="text-2xl text-mainNavy-900 font-bold ">김스팩님의 관심종목</h2>
          <TextButton size="custom" width={"189"} height={"36"} onClick={() => setIsShow(!isShow)}>
            관심종목 추가
          </TextButton>
        </div>
        <div className="my-6 grid grid-cols-3  gap-5">
          {testArr.map((item, idx) => (
            <WatchListCard key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}
