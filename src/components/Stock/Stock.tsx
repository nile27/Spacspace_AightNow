import Icon from "./Icon";

type TStock = {
  logo: string;
};

export default function Stock({ logo }: TStock) {
  return (
    <>
      <div className=" w-64 h-16 flex flex-col  justify-start items-start ">
        <div className="flex-col justify-start items-center flex">
          <div className="w-64 py-2 justify-between items-center flex">
            <div className="justify-start items-center gap-4 flex">
              <div className="w-24 h-12 flex items-center">
                <Icon name={logo} size={50} />
              </div>
              <div className="flex flex-col justify-start items-start ">
                <div className="text-neutral-900 text-base font-bold font-['Pretendard'] leading-normal">
                  애플
                </div>
                <div className="text-neutral-900 text-sm font-normal font-['Pretendard'] leading-tight">
                  AAPL
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="text-right text-neutral-900 text-sm font-medium font-['Pretendard'] leading-tight">
                $00.00
              </div>
              <div className="flex justify-between items-start gap-2 ">
                <div className="text-right text-sky-500 text-xs font-normal font-['Pretendard'] leading-none">
                  ▼1.75
                </div>
                <div className="text-right text-sky-500 text-xs font-normal font-['Pretendard'] leading-none">
                  -0.82%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
