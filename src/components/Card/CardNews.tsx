import { TNewsList } from "@/app/api/(crawler)/type";
import Image from "next/image";

export default function CardNews({
  data,
  image,
  height,
}: {
  data: TNewsList;
  image: string;
  height?: string;
}) {
  const cardHeight = height || "420px";
  return (
    <div className={`relative w-[590px] `} style={{ height: cardHeight }}>
      {/* 컨테이너의 크기와 position 설정 */}
      <img
        src={image}
        alt={`news-${data.aid}`}
        style={{ fill: "cover", width: "100%", height: "100%" }}
        className={`object-cover opacity-80 rounded-3xl}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-full h-[114px] p-4 bg-black bg-opacity-30 ${
          cardHeight === height ? "rounded-2xl" : "rounded-3xl"
        }`}
      >
        {/* 텍스트를 위한 반투명 배경 */}
        <div className="text-white text-2xl font-bold leading-tight mb-4">{data.tit}</div>
        <div className="flex items-center text-stone-300 text-sm font-medium">
          <span>{data.dt.replace(/(\d{4})(\d{2})(\d{2}).*/, "$1.$2.$3")}</span>
          <span className="mx-2">∙</span>
          <span>{data.ohnm}</span>
        </div>
      </div>
    </div>
  );
}
