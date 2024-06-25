import Card from "@/components/Card/Card";
import Header from "@/components/Header";
import ListNews from "@/components/List/ListNews";
import FavoriteNews from "@/features/report/components/FavoriteNews";

export default function News() {
  return (
    <>
      <Header />

      <div className="w-[1200px] h-full font-pretendard mt-60">
        <FavoriteNews />
        <div className="my-12">
          <h2 className="font-bold text-2xl py-4">관심종목과 관련된 뉴스</h2>
          <div className="grid grid-cols-3 gap-5">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <h2 className="font-bold text-2xl py-4">최신뉴스 테스트</h2>
        <div className="w-[1200px] h-[940px] bg-white rounded-2xl p-12">
          <div className="w-[1200px] h-[940px] flex flex-col gap-8 ">
            <ListNews />
            <ListNews />
            <ListNews />
            <ListNews />
          </div>
        </div>
      </div>
    </>
  );
}
