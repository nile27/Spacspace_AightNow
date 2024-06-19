export default function Card() {
  return (
    <>
      <div className="w-96 h-96 flex-col justify-start items-start inline-flex">
        <img
          className="w-96 h-60 rounded-tl-2xl rounded-tr-2xl"
          src="https://via.placeholder.com/388x236"
        />
        <div className="px-6 pt-4 pb-6 bg-white rounded-bl-2xl rounded-br-2xl flex-col justify-start items-start gap-2 flex">
          <div className="w-80 text-black/opacity-20 text-lg font-medium font-['Pretendard'] leading-7">
            올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"
          </div>
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-start items-start gap-2 flex">
              <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                n시간전
              </div>
              <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                ∙
              </div>
              <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                문화일보
              </div>
            </div>
            <div className="text-right text-zinc-600 text-sm font-normal font-['Pretendard'] leading-tight">
              더보기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
