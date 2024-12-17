"use client";

import RadarChart from "@/features/Watchlist/components/RadarChart";

type ClientRadarChartProps = {
  stockName: string;
};

export default function ClientRadarChart({ stockName }: ClientRadarChartProps) {
  return (
    <>
      <RadarChart stockName={stockName} width={400} />
    </>
  );
}
