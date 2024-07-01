"use client";

import TextButton from "@/components/btnUi/TextButton";
import WatchListCard from "./WatchListCard";
import { useShow } from "@/Store/store";
import Header from "@/components/Header";

export default function WatchList() {
  const { isShow, setIsShow } = useShow();

  const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <div className={`w-full relative`}>
        <Header />
        <div className="flex justify-center items-center">
          <div className={`w-[1214px] h-[1188px] mt-96 flex flex-col`}>
            <div className="w-[1214px] mt-14 h-9 flex flex-row justify-between font-pretendard ">
              <h2 className="text-2xl text-mainNavy-900 font-bold ">김스팩님의 관심종목</h2>
              <TextButton
                size="custom"
                width={"189"}
                height={"36"}
                onClick={() => setIsShow(!isShow)}
              >
                관심종목 추가
              </TextButton>
            </div>
            <div className={"my-6 grid grid-cols-3  gap-5"}>
              {testArr.map((item, idx) => (
                <WatchListCard key={idx} />
              ))}
            </div>
          </div>
        </div>
        {isShow && (
          <div className="fixed inset-0 bg-scaleGray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[527px] bg-white rounded-md flex flex-col p-6 z-50">
              <div className="text-xl font-bold mb-4">관심종목을 삭제하시겠습니까?</div>
              <div className="flex items-center justify-between mt-4">
                <TextButton size="custom" color="grayScale" width={"160"} height={"56"}>
                  삭제하기
                </TextButton>

                <TextButton
                  size="custom"
                  width={"160"}
                  height={"56"}
                  onClick={() => setIsShow(!isShow)}
                >
                  돌아가기
                </TextButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
