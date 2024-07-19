import { TNewsList } from "@/app/api/(crawler)/type";
import Icon from "../Stock/Icon";

export default function WatchCard({ data }: { data: TNewsList }) {
  return (
    <>
      <div className="w-96 h-24 px-4 py-6 bg-white rounded-3xl border border-slate-500 flex-col justify-start items-start gap-2.5">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-col justify-start items-start  flex">
            <div className="text-neutral-400 text-sm font-normal font-['Pretendard'] leading-tight">
              {data.dt.replace(/(\d{4})(\d{2})(\d{2}).*/, "$1.$2.$3")}
            </div>
            <div
              className="w-60 truncate text-neutral-900 text-xl font-bold font-['Pretendard'] leading-7"
              dangerouslySetInnerHTML={{ __html: data.tit }}
            >
              {/* {data.tit} */}
            </div>
          </div>
          <div className="flex justify-end items-center  ">
            <Icon name={data.stockName} size={50} />
          </div>
        </div>
      </div>
    </>
  );
}
