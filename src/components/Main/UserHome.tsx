import { BadgeBlack } from "../Badge/Badge";
import Header from "../Header";
import ListStockDown from "../List/ListStockDown";
import News from "./News";
import Report from "./Report";

const datas = [
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
];

const lists = [
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
  { name: "애플", code: "AAPL", price: 0.0, change: 0.0, percent: 0.0 },
];

export default function UserHome() {
  return (
    <>
      <div className="relative h-screen w-screen bg-scaleGray-200">
        <Header />
        <div className="flex justify-center items-start w-full my-14">
          <div className="flex flex-col gap-12 w-full max-w-7xl">
            <div className="flex flex-col gap-4 justify-center">
              <div className="text-scaleGray-900 text-body3 font-bold leading-9">
                {"Next"}님의 AI 리포트 <BadgeBlack />
              </div>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4"> */}
              <div className="flex justify-between mt-4">
                {datas.slice(0, 3).map((data, index) => (
                  <div key={index} className="">
                    <Report data={data} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col justify-start">
                  <div className="text-scaleGray-900 text-body3 font-bold leading-9">최근 조회</div>
                  <div className="px-8 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8 bg-white rounded-2xl flex flex-col justify-start items-start mt-4">
                    <div className="w-full">
                      {lists.map((data, index) => (
                        <div key={index} className="flex justify-between items-center rounded-lg">
                          <ListStockDown key={index} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start">
                  <div className="text-scaleGray-900 text-body3 font-bold leading-9">관심 종목</div>
                  <div className="px-8 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8 bg-white rounded-2xl flex flex-col justify-start items-start mt-4">
                    <div className="w-full">
                      {lists.map((data, index) => (
                        <div key={index} className="flex justify-between items-center rounded-lg">
                          <ListStockDown key={index} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="text-scaleGray-900 text-body3 font-bold leading-9">
                  {"Next"}님을 위한 주식뉴스
                </div>
                <div className="mt-4 w-full">
                  <News />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}