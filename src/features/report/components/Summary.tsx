import Toggle from "@/components/Toggle/Toggle";

export default function Summary() {
  return (
    <>
      <div className="w-[424px] h-64 flex flex-wrap justify-between items-start border bg-white">
        <div className="flex flex-col">
          <div className="text-black/opacity-20 text-2xl font-bold font-['Pretendard'] leading-loose">
            $00.00 ∙ AAPL
          </div>
          <div className="w-[133px] flex">
            <div className="text-left text-rose-500 text-xl font-['Pretendard'] leading-7">
              ▲1.75
            </div>
            <div className="text-left text-rose-500 text-xl font-['Pretendard'] leading-7">
              +0.82%
            </div>
          </div>
        </div>
        <Toggle />
        <div className="w-[424px] h-24 text-neutral-900 text-base font-normal font-['Pretendard'] leading-normal">
          애플은 스마트폰, 개인용 컴퓨터, 태블릿, 웨어러블 및 액세서리를 설계, 제조 및 판매하고
          다양한 관련 서비스를 판매한다. 제품 카테고리는 iPhone, MAC, iPad, Wearables, Home 및
          Accessories로 나뉜다.라고하네요
        </div>
      </div>
    </>
  );
}
