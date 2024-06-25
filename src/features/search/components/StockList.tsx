import Stock from "@/components/Stock/Stock";
import { useState } from "react";

export default function StockList({ items }: { items: any[] }) {
  const [visibleItems, setVisibleItems] = useState(6);

  const handleLoadMoreItems = () => {
    setVisibleItems(prevVisibleItems => Math.min(prevVisibleItems + 6, items.length));
  };
  return (
    <>
      <div className="p-6 bg-white rounded-2xl flex-col justify-start items-start flex w-full">
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          {Array.from({ length: Math.ceil(visibleItems / 6) }).map((_, i) => (
            <div key={i} className="flex justify-start items-start gap-4 w-full">
              <div className="flex-col justify-start items-start gap-4 inline-flex w-1/2">
                {items.slice(i * 6, i * 6 + 3).map((data, index) => (
                  <div key={index} className="flex justify-between items-center rounded-lg">
                    <Stock key={index} logo={"apple"} />
                  </div>
                ))}
              </div>
              <div className="flex-col justify-start items-start gap-4 inline-flex w-1/2">
                {items.slice(i * 6 + 3, i * 6 + 6).map((data, index) => (
                  <div key={index} className="flex justify-between items-center rounded-lg">
                    <Stock key={index} logo={"apple"} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {visibleItems < items.length && (
            <div className="h-12 pt-2 flex justify-center items-center gap-2.5 w-full border-t-2">
              <button
                onClick={handleLoadMoreItems}
                className="text-neutral-400 text-base font-medium font-['Pretendard'] leading-normal"
              >
                더보기
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
