export default function WatchCard() {
  return (
    <>
      <div className="w-96 h-24 px-4 py-6 bg-white rounded-3xl border border-slate-500 flex-col justify-start items-start gap-2.5">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-col justify-start items-start  flex">
            <div className="text-neutral-400 text-sm font-normal font-['Pretendard'] leading-tight">
              2024.06.04
            </div>
            <div className="w-60 truncate text-neutral-900 text-xl font-bold font-['Pretendard'] leading-7">
              中제외 배터리 시장, 중국업체 급성장
            </div>
          </div>
          <div className="flex justify-end items-center  ">
            <div className="w-12 h-12 flex justify-center items-center bg-black rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
}
