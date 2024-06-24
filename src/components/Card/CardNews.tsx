import Image from "next/image";

export default function CardNews({
  id,
  image,
  height,
}: {
  id: number;
  image: string;
  height?: string;
}) {
  const cardHeight = height || "420px";
  return (
    <div className={`relative w-[590px] `} style={{ height: cardHeight }}>
      {/* 컨테이너의 크기와 position 설정 */}
      <Image
        src={image}
        alt={`news-${id}`}
        fill
        className={`object-cover opacity-80 ${cardHeight === height ? "" : "rounded-3xl"}`}
      />
      {/* fill prop 사용, layout prop 제거 */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[114px] p-4 bg-black bg-opacity-30 ${
          cardHeight === height ? "rounded-2xl" : "rounded-3xl"
        }`}
      >
        {/* 텍스트를 위한 반투명 배경 */}
        <div className="text-white text-2xl font-bold leading-tight mb-6">
          엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이
        </div>
        <div className="flex items-center text-stone-300 text-sm font-medium">
          <span>2024.06.05</span>
          <span className="mx-2">∙</span>
          <span>문화일보</span>
        </div>
      </div>
    </div>
  );
}
