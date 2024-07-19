import { TNewsList } from "@/app/api/(crawler)/type";
import { formatRelativeTime } from "@/features/news/components/common";

type TListNews = {
  data: TNewsList;
};
export default function Card(props: TListNews) {
  const { data } = props;
  return (
    <>
      <div className="w-[388px] h-[360px] flex-col justify-start items-start inline-flex">
        <img className="w-[388px] h-[360px] rounded-tl-2xl rounded-tr-2xl" src={data.thumbUrl} />
        <div className="px-6 pt-4 pb-6 bg-white rounded-bl-2xl rounded-br-2xl flex-col justify-start items-start gap-2 flex font-medium font-['Pretendard']">
          <div
            className="w-[340px] text-black/opacity-20 text-lg leading-7"
            dangerouslySetInnerHTML={{ __html: data.tit }}
          ></div>
          <div className="self-stretch justify-between items-center inline-flex text-zinc-600 text-sm">
            <div className="justify-start items-start gap-2 flex leading-tight">
              <div className="">{formatRelativeTime(data.dt)}</div>
              <div className="">∙</div>
              <div className="">{data.ohnm}</div>
            </div>
            <div className="text-right font-normal ">더보기</div>
          </div>
        </div>
      </div>
    </>
  );
}
