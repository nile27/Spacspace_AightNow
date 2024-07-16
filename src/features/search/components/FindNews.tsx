import { TNewsList } from "@/app/api/(crawler)/type";
import { formatRelativeTime } from "@/features/news/components/common";

type TFindNewsProps = {
  data: TNewsList;
} & React.HTMLAttributes<HTMLButtonElement>;

function FindNews(props: TFindNewsProps) {
  const { data, ...restProps } = props;
  console.log("FindNews");
  return (
    <>
      <button className="justify-start items-center gap-4 inline-flex" {...restProps}>
        {data.image && <img className="w-28 h-16 rounded-lg" src={data.thumbUrl} />}
        <div className="flex-col justify-start items-start gap-3.5 inline-flex">
          <div
            className="text-scaleGray-900 text-body5 font-bold font-['Pretendard'] leading-normal truncate"
            dangerouslySetInnerHTML={{ __html: data.tit }}
          ></div>
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="text-scaleGray-600 text-xs font-normal font-['Pretendard'] leading-none">
              {formatRelativeTime(data.dt)}
            </div>
            <div className="text-scaleGray-600 text-xs font-normal font-['Pretendard'] leading-none">
              ∙
            </div>
            <div className="text-scaleGray-600 text-xs font-normal font-['Pretendard'] leading-none">
              {data.ohnm}
            </div>
          </div>
        </div>
      </button>
    </>
  );
}

export default FindNews;
