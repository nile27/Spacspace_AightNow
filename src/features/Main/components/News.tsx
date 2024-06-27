import Card from "../../../components/Card/Card";
import WatchCard from "../../../components/Card/WatchCard";
import ListNews from "../../../components/List/ListNews";

const lists = [
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
];

const news = [
  {
    title: "올해 자연재해 채권 발행액",
    content: `자연재해 위험을 채권 형태로 자본시장에 전가하는 이른바 '대(大)재해 채권' 발행이 올해 기록적 수준으로 늘어난 것으로 전해졌다. 블룸버그통신은 9일(현지시간) 보험연계증권(ILS) 정보 집계업체인 아르테미스를 인용해 올해 1~5월 대재해 채권 판매액이 기존 최고치였던 전년 동기 대비보다도 38% 늘어난 상태라고 전했다. 또 대재해 채권은 지난달에만 40억 달러(약 5조5천억원)가량 발행돼 월간 기준 최고치를 갈아치웠다는 것이다. 자연재해 위험을 채권 형태로 자본시장에 전가하는 이른바 '대(大)재해 채권' 발행이 올해 기록적 수준으로 늘어난 것으로 전해졌다. 블룸버그통신은 9일(현지시간) 보험연계증권(ILS) 정보 집계업체인 아르테미스를 인용해 올해 1~5월 대재해 채권 판매액이 기존 최고치였던 전년 동기 대비보다도 38% 늘어난 상태라고 전했다.`,
    img: "https://via.placeholder.com/338x240",
  },
  {
    title: "올해 자연재해 채권 발행액",
    content: "ddd",
    img: "https://via.placeholder.com/338x240",
  },
];
export default function News() {
  return (
    <>
      <div className="w-full p-4 gap-12 sm:p-8 md:p-12 bg-white rounded-3xl flex flex-col justify-start items-start mt-6">
        <div className="w-full">
          <div className="text-mainNavy-900 text-2xl font-semibold leading-9 pb-4">관심 종목</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-3xl">
            {lists.slice(0, 3).map((data, index) => (
              <div key={index} className="rounded-lg">
                <WatchCard />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="text-mainNavy-900 text-2xl font-semibold leading-9 pb-4">주요 뉴스</div>
          <div className="w-full border border-mainNavy-100 rounded-3xl p-4 sm:p-8">
            {news.slice(0, 1).map((data, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-5">
                <img className="w-full sm:w-80 h-60 rounded-3xl" src={data.img} alt="News" />
                <div className="flex flex-col justify-start items-start w-full ">
                  <div className="self-stretch text-black text-2xl font-medium leading-loose">
                    {data.title}
                  </div>
                  <hr className="w-full border-t border-scaleGray-400 my-6" />
                  <div className="w-full max-w-full text-zinc-700 text-lg font-normal leading-7 line-clamp-5 text-justify">
                    {data.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="text-mainNavy-900 text-2xl font-semibold leading-9 pb-4">최신 뉴스</div>
          <div className="border border-mainNavy-100 rounded-3xl">
            {lists.slice(0, 3).map((data, index) => (
              <div key={index}>
                <div className="flex rounded-lg p-12">
                  <ListNews />
                </div>
                {index < 2 && <hr className="border-t border-scaleGray-400 mx-8" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
