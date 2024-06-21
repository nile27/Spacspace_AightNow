import CardTitle from "@/components/Card/CardTitle";
import LargeCard from "@/components/Card/LargeCard";

export default function FavoriteNews() {
  return (
    <>
      <div className="w-[1200px] h-[480px]">
        <h1>오늘 인기 있는 뉴스</h1>
        <LargeCard />
        <CardTitle />
      </div>
    </>
  );
}
