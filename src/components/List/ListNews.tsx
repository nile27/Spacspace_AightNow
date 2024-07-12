import { TNewsList } from "@/app/api/(crawler)/type";

type TListNews = {
  data: TNewsList;
};

export const extractTextFromHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 불필요한 태그 및 텍스트 제거
  const styleTags = doc.querySelectorAll("style");
  styleTags.forEach(tag => tag.remove());

  const textContent = doc.body.innerText || doc.body.textContent || "";
  return textContent.replace(/[\n\r]+/g, " ").trim(); // 줄바꿈 제거 및 트림 처리
};

export default function ListNews(props: TListNews) {
  const { data } = props;
  const subcontent = extractTextFromHTML(data.content);
  return (
    <>
      <div className="w-[1104px] h-[212px] justify-start items-start gap-5 inline-flex">
        {data.hasImage ? (
          <img className="w-[252px] h-[148px] rounded-2xl" src={data.thumbUrl} />
        ) : (
          <div className="w-[252px] h-[148px] bg-white rounded-2xl" />
        )}
        <div className="flex-col justify-start items-start gap-4 inline-flex">
          <div className="w-[832px] h-7 self-stretch justify-start items-center gap-4 inline-flex">
            <div className="w-[82px] h-14 flex justify-between items-center grow shrink basis-0 text-neutral-900 text-lg font-bold font-['Pretendard'] leading-7">
              {data.tit}
              <div className="justify-start items-start gap-2 flex">
                <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                  n시간전
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
          <div className="w-[832px] h-14  text-neutral-900 text-base font-normal font-['Pretendard'] ">
            <p
              style={{
                width: "832px",
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
