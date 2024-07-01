type TFindNewsProps = {
  data: { title: string; time: string; company: string };
} & React.HTMLAttributes<HTMLButtonElement>;

function FindNews(props: TFindNewsProps) {
  const { data, ...restProps } = props;
  console.log("FindNews");
  return (
    <>
      <button className="justify-start items-center gap-4 inline-flex" {...restProps}>
        <img className="w-28 h-16 rounded-lg" src="https://via.placeholder.com/120x64" />
        <div className="flex-col justify-start items-start gap-3.5 inline-flex">
          <div className="text-scaleGray-900 text-body5 font-bold font-['Pretendard'] leading-normal truncate">
            {data.title}
          </div>
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="text-scaleGray-600 text-xs font-normal font-['Pretendard'] leading-none">
              {data.time}
            </div>
            <div className="text-scaleGray-600 text-xs font-normal font-['Pretendard'] leading-none">
              ∙
            </div>
            <div className="text-scaleGray-600 text-xs font-normal font-['Pretendard'] leading-none">
              {data.company}
            </div>
          </div>
        </div>
      </button>
    </>
  );
}

export default FindNews;
