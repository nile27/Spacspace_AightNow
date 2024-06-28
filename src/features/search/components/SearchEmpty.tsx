import Ranking from "./Ranking";
import SearchCurrent from "./SearchCurrent";

const items = [
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
  { name: "테슬라", date: "06.14" },
];

const rankings = [
  { rank: 1, name: "테슬라" },
  { rank: 2, name: "테슬라" },
  { rank: 3, name: "테슬라" },
  { rank: 4, name: "테슬라" },
  { rank: 5, name: "테슬라" },
  { rank: 6, name: "테슬라" },
  { rank: 7, name: "테슬라" },
  { rank: 8, name: "테슬라" },
  { rank: 9, name: "테슬라" },
  { rank: 10, name: "테슬라" },
];

export default function SearchEmpty() {
  console.log("SearchEmpty");
  return (
    <>
      <div className="flex-col justify-start items-start gap-8 flex">
        <div className="flex-col justify-start items-center gap-2 flex">
          <div className="items-center gap-[431px] inline-flex w-full">
            <div className="text-mainNavy-900 text-2xl font-bold font-['Pretendard'] leading-loose">
              최근 검색어
            </div>
            <button className="text-scaleGray-600 text-sm font-medium font-['Pretendard'] underline leading-tight">
              전체삭제
            </button>
          </div>
          <div className="w-full p-6 bg-white rounded-2xl flex-col justify-start items-start gap-2.5 flex">
            <div className="flex-col justify-start items-start flex">
              {items.map((item, index) => (
                <SearchCurrent key={index} data={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-2 flex w-full">
          <div className="items-center gap-4 inline-flex w-full">
            <div className="text-mainNavy-900 text-2xl font-bold font-['Pretendard'] leading-loose">
              인기 검색어
            </div>
            <div className="text-scaleGray-600 text-sm font-medium underline leading-tight">
              00:00 기준
            </div>
          </div>
          <div className="p-6 bg-white rounded-2xl flex-col justify-start items-start flex w-full">
            <div className="justify-start items-start gap-4 flex w-full">
              <div className="flex-col justify-start items-start gap-4 inline-flex w-1/2">
                {rankings.slice(0, 5).map(item => (
                  <Ranking key={item.rank} data={item} />
                ))}
              </div>
              <div className="flex-col justify-start items-start gap-4 inline-flex w-1/2">
                {rankings.slice(5).map(item => (
                  <Ranking key={item.rank} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
