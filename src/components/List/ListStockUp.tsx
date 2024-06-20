export default function ListStockUp() {
  return (
    <>
      <div className="w-96 h-20 py-2 justify-between items-center inline-flex">
        <div className="justify-start items-center gap-4 flex">
          <div className="w-16 h-16 relative">
            <div className="w-16 h-16 left-0 top-[-0px] absolute bg-black rounded-full" />
          </div>
          <div className="flex-col justify-start items-start inline-flex">
            <div className="text-neutral-900 text-xl font-bold font-['Pretendard'] leading-7">
              애플
            </div>
            <div className="text-neutral-900 text-sm font-normal font-['Pretendard'] leading-tight">
              AAPL
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-end inline-flex">
          <div className="text-right text-neutral-900 text-lg font-medium font-['Pretendard'] leading-7">
            $00.00
          </div>
          <div className="justify-end items-start gap-2 inline-flex">
            <div className="justify-end items-center gap-1 flex">
              <div className="text-right text-rose-500 text-base font-normal font-['Pretendard'] leading-normal">
                ▲1.75
              </div>
            </div>
            <div className="text-right text-rose-500 text-base font-normal font-['Pretendard'] leading-normal">
              -0.82%
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
