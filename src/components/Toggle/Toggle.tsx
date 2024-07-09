"use client";

import { useExchange } from "@/Store/store";

export default function Toggle() {
  const { isChange, setIsChange } = useExchange();

  const handleToggle = () => setIsChange(!isChange);

  return (
    <>
      <div
        className="w-20 h-10 p-1 bg-gray-200 rounded justify-start items-start gap-1 inline-flex"
        onClick={handleToggle}
      >
        <div className="w-8 h-8 px-1 rounded flex-col justify-center items-center gap-2.5 inline-flex">
          <button
            className={`${
              isChange
                ? "text-neutral-400"
                : "text-zinc-700 bg-white w-8 h-8 px-1.5 rounded font-bold"
            } text-xl  font-['Pretendard'] leading-7`}
          >
            $
          </button>
        </div>
        <button className="w-8 h-8 p-1.5  rounded flex-col justify-center items-center gap-2.5 inline-flex">
          <div
            className={`${
              isChange ? "text-zinc-700 bg-white w-8 h-8  rounded  font-bold" : "text-neutral-400"
            } text-xl  font-['Pretendard'] leading-7`}
          >
            원
          </div>
        </button>
      </div>
    </>
  );
}
