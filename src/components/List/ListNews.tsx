import { TNewsList } from "@/app/api/(crawler)/type";
import { extractTextFromHTML, formatRelativeTime } from "@/features/news/components/common";

type TListNews = {
  data: TNewsList;
};

export default function ListNews(props: TListNews) {
  const { data } = props;
  const subcontent = extractTextFromHTML(data.content);
  return (
    <>
      <div className="justify-start mb-8 items-start gap-5 inline-flex">
        {data.hasImage ? (
          <img className="w-[252px] h-[148px] rounded-2xl" src={data.thumbUrl} />
        ) : (
          <></>
          // <div className="w-[252px] h-[148px] bg-white rounded-2xl" />
        )}
        <div className="flex-col justify-start items-start gap-4 inline-flex">
          <div className="h-7 self-stretch justify-start items-center inline-flex">
            <div className=" flex justify-between items-center grow shrink basis-0 text-neutral-900 text-lg font-bold font-['Pretendard'] leading-7">
              {/* {data.tit} */}
              <div dangerouslySetInnerHTML={{ __html: data.tit }} />
              <div className="justify-start items-start gap-2 flex">
                <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                  {formatRelativeTime(data.dt)}
                </div>
                <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                  ∙
                </div>
                <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                  {data.ohnm}
                </div>
              </div>
            </div>
          </div>
          <div className="h-15  text-neutral-900 text-base font-normal font-['Pretendard'] ">
            <p
              style={{
                // width: "832px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
              }}
              // dangerouslySetInnerHTML={{ __html: data.subcontent }}
            >
              {subcontent}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
