import Header from "@/components/Header";
import BasicIcon from "@/components/Icon/BasicIcons";
import Icon from "@/components/Stock/Icon";

export default function page() {
  return (
    <>
      <Header />
      <div>
        <div className="">관심종목 추가</div>
        <div>
          <form action="">
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className="w-[714px] h-14"
            ></input>
            <BasicIcon name="Search" size={24} />
          </form>
        </div>
        <div className="w-[714px] h-[332px]">
          <h2>인기검색어</h2>
          <div className="w-[714px] h-[288px]">
            <div className="w-[323px] h-8  flex gap-2 mt-5 item-center">
              <Icon name="apple" size={32} />
              <div className=" flex justify-between items-center gap-1 font-medium ">
                <span>애플</span>
                <span>∙</span>
                <span>$00.00</span>
                <span className="text-rose-500">▲+1.75</span>
                <span className="text-rose-500">+0.82%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
