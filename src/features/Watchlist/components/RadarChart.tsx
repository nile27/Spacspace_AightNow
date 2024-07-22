"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { agentEvaluationTogether } from "@/lib/agentTogetherAI";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type RadarProps = {
  stockName: string;
};

function transformAgentData(agentData: Record<string, string | number | undefined>) {
  const categories = ["전반적 평가", "수익성", "관심도", "성장성", "주가"];
  const scores: Record<string, number> = {};

  // 점수 추출
  for (const [key, value] of Object.entries(agentData)) {
    if (typeof value === "string" && value.includes("점")) {
      const score = parseInt(value.replace("점", ""));
      if (!isNaN(score)) {
        scores[key.replace(/^\d+\.\s/, "")] = score;
      }
    }
  }

  return categories.map(category => ({
    name: category,
    value: scores[category] || 0,
  }));
}

export default function RadarChart({ stockName }: RadarProps) {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const agentData = await agentEvaluationTogether(stockName);
        const transformedData = transformAgentData(agentData);
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    }
    fetchData();
  }, [stockName]);

  if (!chartData) return <div>Loading...</div>;

  const options: ApexOptions = {
    chart: {
      type: "radar" as const,
    },
    xaxis: {
      categories: chartData.map((data: any) => data.name),
    },
    yaxis: {
      min: 0,
      max: 100,
    },
  };

  const series = [
    {
      name: "Stock Score",
      data: chartData.map((data: any) => data.value),
    },
  ];

  return (
    <div className="w-[350px] h-[220px] flex justify-center items-center">
      <ApexCharts options={options} series={series} type="radar" height="100%" width="100%" />
    </div>
  );
}
