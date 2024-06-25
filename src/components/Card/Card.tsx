export default function Card() {
  return (
    <>
      <div className="w-[388px] h-[360px] flex-col justify-start items-start inline-flex">
        <img
          className="w-[388px] h-[360px] rounded-tl-2xl rounded-tr-2xl"
          src="https://via.placeholder.com/388x236"
        />
        <div className="px-6 pt-4 pb-6 bg-white rounded-bl-2xl rounded-br-2xl flex-col justify-start items-start gap-2 flex font-medium font-['Pretendard']">
          <div className="w-[340px] text-black/opacity-20 text-lg leading-7">
            올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"
          </div>
          <div className="self-stretch justify-between items-center inline-flex text-zinc-600 text-sm">
            <div className="justify-start items-start gap-2 flex leading-tight">
              <div className="">n시간전</div>
              <div className="">∙</div>
              <div className="">문화일보</div>
            </div>
            <div className="text-right font-normal ">더보기</div>
          </div>
        </div>
      </div>
    </>
  );
}
