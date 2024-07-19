import { TNewsList } from "@/app/api/(crawler)/type";
import { formatRelativeTime } from "@/features/news/components/common";

type TListNews = {
  data: TNewsList;
};

export default function CardSmallNews(props: TListNews) {
  const { data } = props;

  return (
    <>
      <div className="w-full h-[70px] flex flex-col">
        <div className="truncate font-bold" dangerouslySetInnerHTML={{ __html: data.tit }}></div>
        <div className=" h-[18px] flex mt-4 gap-2  text-zinc-600 text-sm font-medium  leading-tight">
          <div className="">{formatRelativeTime(data.dt)}</div>
          <div className="text-right">∙</div>
          <div className="">{data.ohnm}</div>
        </div>
        <div className="border-t mt-4"></div>
      </div>
    </>
  );
}
