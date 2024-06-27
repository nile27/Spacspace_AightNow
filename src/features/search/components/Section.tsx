import Stock from "@/components/Stock/Stock";
import FindNews from "./FindNews";

type TSectionProps = {
  title: string;
  count: number;
  items: any[];
  visibleItems: number;
  handleLoadMore: () => void;
  isNews?: boolean;
};

export default function Section(props: TSectionProps) {
  const { title, count, items, visibleItems, handleLoadMore, isNews = false } = props;
  return (
    <div className="w-full flex-col justify-start items-center gap-2 flex">
      <div className="items-center gap-2 inline-flex w-full">
        <div className="text-blue-950 text-2xl font-bold font-['Pretendard'] leading-loose">
          {title}
        </div>
        <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] underline leading-tight">
          {`(${count})`}
        </div>
      </div>
      <div className="p-6 bg-white rounded-2xl flex-col justify-start items-start flex w-full">
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          {count === 0 ? (
            <div className="text-scaleGray-400 text-base font-medium font-['Pretendard'] leading-normal">
              검색 결과가 없습니다.
            </div>
          ) : isNews ? (
            <div className="flex flex-col w-full">
              {items.slice(0, visibleItems).map((data, index) => (
                <div key={index} className="flex rounded-lg gap-4 pb-4">
                  <FindNews data={data} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full">
              {items.slice(0, visibleItems).map((data, index) => (
                <div key={index} className="flex justify-between items-center rounded-lg">
                  <Stock data={data} logo={"apple"} gap="gap-[64px]" />
                </div>
              ))}
            </div>
          )}
          {visibleItems < items.length && (
            <div className="h-12 pt-2 flex justify-center items-center gap-2.5 w-full border-t-2">
              <button
                onClick={handleLoadMore}
                className="text-neutral-400 text-base font-medium font-['Pretendard'] leading-normal"
              >
                더보기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
