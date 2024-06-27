import Header from "@/components/Header";
import BasicIcon from "@/components/Icon/BasicIcons";
import StockList from "@/components/Stock/StockList";

export default function page() {
  return (
    <>
      <Header />
      <div className="w-[794px] h-[571px] bg-white font-pretendard p-10 rounded-[32px]">
        <div className="">관심종목 추가</div>
        <div>
          <form action="">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                className="w-[714px] h-14 rounded-lg border border-gray-400"
              />
              <button className="relative right-8 ">
                <BasicIcon name="Search" size={24} />
              </button>
            </div>
          </form>
        </div>
        <div className="w-[714px] h-[332px]">
          <h2>인기검색어</h2>
          <div className="w-[714px] h-[288px]">
            <StockList name={"apple"} />
            <StockList name={"apple"} />
            <StockList name={"apple"} />
            <StockList name={"apple"} />
            <StockList name={"apple"} />
          </div>
        </div>
      </div>
    </>
  );
}
