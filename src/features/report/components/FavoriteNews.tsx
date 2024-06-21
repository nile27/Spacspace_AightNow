import CardNews from "@/components/Card/CardNews";
export default function FavoriteNews() {
  return (
    <>
      <div className="w-[1200px] h-[480px] font-['pretendard'] ">
        <h1 className="font-bold text-2xl">오늘 인기 있는 뉴스</h1>
        <div className="flex justify-between">
          <CardNews image="/news.png" id={1} />
          <div className="flex flex-col justify-between">
            <CardNews image="/news.png" height={"200px"} id={2} />
            <CardNews image="/news.png" height={"200px"} id={3} />
          </div>
        </div>
      </div>
    </>
  );
}
