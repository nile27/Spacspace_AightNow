import Icon from "./Icon";

type TStock = {
  logo: string;
};

export default function Stock({ logo, gap }: { logo: string; gap?: string }) {
  return (
    <>
      <div className="flex flex-col  justify-start items-start ">
        <div className="flex-col justify-start items-center flex">
          <div className={`w-full ${gap} py-2 flex justify-between items-center`}>
            <div className="flex justify-start items-center gap-4">
              <div className="flex items-center">
                <Icon name={logo} size={50} />
              </div>
              <div className="flex flex-col justify-start items-start">
                <div className="text-neutral-900 text-base font-bold font-['Pretendard'] leading-normal">
                  애플
                </div>
                <div className="text-neutral-900 text-sm font-normal font-['Pretendard'] leading-tight">
                  AAPL
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-y-2">
              <div className="text-right text-neutral-900 text-sm font-medium font-['Pretendard'] leading-tight">
                $00.00
              </div>
              <div className="flex justify-end items-start gap-2">
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
