import Icon from "@/components/Stock/Icon";
import Toggle from "@/components/Toggle/Toggle";
import TextButton from "@/components/btnUi/TextButton";

export default function Report() {
  return (
    <>
      <div className="max-w-full border border-gray-900  bg-white shadow-sm">
        <div className="max-w-sm h-16 flex justify-between items-center  px-4">
          <div className="flex items-center gap-3">
            <Icon name="apple" size={40} />
            <span className="text-lg font-medium">애플 · APPL</span>
          </div>
          <TextButton size="sm">관심종목 추가</TextButton>
        </div>
      </div>
      <div className="w-96 h-64 flex flex-col border items-center">
        <div className="w-96 h-16 flex items-center gap-2 border ">
          <div className="text-black/opacity-20 text-2xl font-bold font-['Pretendard'] leading-loose">
            $00.00
          </div>
          <div className="text-black/opacity-20 text-2xl font-bold font-['Pretendard'] leading-loose">
            ∙
          </div>
          <div className="text-black/opacity-20 text-xl font-['Pretendard'] leading-7">AAPL</div>
          <Toggle />
        </div>
      </div>
      <div className="flex">
        <div className="text-left text-rose-500 text-xl font-['Pretendard'] leading-7">▲1.75</div>
        <div className="text-left text-rose-500 text-xl font-['Pretendard'] leading-7">+0.82%</div>
      </div>
      <div className="w-96 text-neutral-900 text-base font-normal font-['Pretendard'] leading-normal">
        애플은 스마트폰, 개인용 컴퓨터, 태블릿, 웨어러블 및 액세서리를 설계, 제조 및 판매하고 다양한
        관련 서비스를 판매한다. 제품 카테고리는 iPhone, MAc, iPad, Wearables, Home 및 Accessories로
        나뉜다.라고하네요
      </div>
    </>
  );
}
