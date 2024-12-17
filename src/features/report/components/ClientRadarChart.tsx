"use client";

import RadarChart from "@/features/Watchlist/components/RadarChart";

type ClientRadarChartProps = {
  stockName: string;
};

export default function ClientRadarChart({ stockName }: ClientRadarChartProps) {
  return (
    <div className="w-[429px] h-[297px] bg-white rounded-2xl p-4">
      <div className="font-['pretendard'] font-bold text-2xl">종목 AI 리포트 점수</div>
      <RadarChart stockName={stockName} width={400} />
    </div>
  );
}
