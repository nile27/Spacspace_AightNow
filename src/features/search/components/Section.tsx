import Stock from "@/components/Stock/Stock";
import FindNews from "./FindNews";
import Link from "next/link";
import { useAuthStore } from "@/Store/store";
import { useFindStore } from "./findStore";

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
  const addSearchHistory = useFindStore(state => state.addSearchHistory);
  const { user } = useAuthStore();

  const handleClick = (term: string, slug: string, isNews: boolean) => {
    const userId = (user?.userId as string) ? user?.userId : user?.id;
    const time = new Date().toISOString();

    if (userId) {
      addSearchHistory(userId, term, time, isNews, slug);
    }
  };

  return (
    <div className="w-full flex-col justify-start items-center gap-2 flex">
      <div className="items-center gap-2 inline-flex w-full">
        <div className="text-mainNavy-900 text-2xl font-bold leading-loose">{title}</div>
        <div className="text-scaleGray-600 text-sm font-medium underline leading-tight">
          {`(${count})`}
        </div>
      </div>
      <div className="p-6 bg-white rounded-2xl flex-col justify-start items-start flex w-full">
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          {count === 0 ? (
            <div className="text-scaleGray-400 text-base leading-normal">검색 결과가 없습니다.</div>
          ) : isNews ? (
            <div className="flex flex-col w-full">
              {items.slice(0, visibleItems).map(data => (
                <div key={data.id} className="flex rounded-lg gap-4 pb-4 truncate">
                  <Link href={`/news/${data.id}`} legacyBehavior>
                    <a onClick={() => handleClick(data.tit, data.id, true)}>
                      <FindNews data={data} />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full">
              {items.slice(0, visibleItems).map((data, index) => (
                <div key={index} className="flex justify-between items-center rounded-lg">
                  <Link href={`/report/${data.logo}`} legacyBehavior>
                    <a onClick={() => handleClick(data.stockName, data.logo, false)}>
                      <Stock
                        data={data}
                        logo={data.logo}
                        gap={`${
                          data.stockName.length < 3 && data.symbolCode.length < 7
                            ? "gap-[81px]"
                            : data.stockName.length < 4
                            ? "gap-[64px]"
                            : ""
                        }`}
                      />
                    </a>
                  </Link>
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
