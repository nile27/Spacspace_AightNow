"use client";

import { useState } from "react";

export default function Toggle() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);
  console.log(toggle);

  return (
    <>
      <div className="w-20 h-10 p-1 bg-gray-200 rounded justify-start items-start gap-1 inline-flex">
        <div
          className="w-8 h-8 px-1 rounded flex-col justify-center items-center gap-2.5 inline-flex"
          onClick={handleToggle}
        >
          <button
            className={`${
              toggle ? "text-neutral-400" : "text-zinc-700 bg-white w-8 h-8 px-1.5 rounded"
            } text-xl font-normal font-['Pretendard'] leading-7`}
          >
            $
          </button>
        </div>
        <button className="w-8 h-8 px-1.5  rounded flex-col justify-center items-center gap-2.5 inline-flex">
          <div
            className={`${
              toggle ? "text-zinc-700 bg-white w-8 h-8 px-1.5 rounded" : "text-neutral-400"
            } text-xl font-bold font-['Pretendard'] leading-7`}
          >
            원
          </div>
        </button>
      </div>
    </>
  );
}
