"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { agentEvaluationTogether } from "@/lib/agentTogetherAI";
import { SkeletonCard } from "./SkeletonCard";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type RadarProps = {
  stockName: string;
};

function transformAgentData(agentData: Record<string, string | number | undefined>) {
  const categories = ["전반적 평가", "수익성", "관심도", "성장성", "주가"];
  const scores: Record<string, number> = {};

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

function calculateTotalScore(data: { name: string; value: number }[]): number {
  return Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length);
}

export default function RadarChart({ stockName }: RadarProps) {
  const [chartData, setChartData] = useState<any>(null);
  const [totalScore, setTotalScore] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const agentData = await agentEvaluationTogether(stockName);
        const transformedData = transformAgentData(agentData);
        setChartData(transformedData);
        setTotalScore(calculateTotalScore(transformedData));
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    }
    fetchData();
  }, [stockName]);

  if (!chartData) return <SkeletonCard />;

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
    <div className="w-[350px] h-[220px] flex justify-between items-center">
      <ApexCharts options={options} series={series} type="radar" height="100%" width="90%" />
      <div className="w-[40%] h-full flex flex-col justify-center items-start pl-4">
        <div className="mb-4 w-full">
          <span className="font-bold text-lg">총점:</span>
          <span className="text-mainNavy-900 font-bold text-lg ml-2">{totalScore}점</span>
        </div>
        {chartData.map((item: { name: string; value: number }) => (
          <div key={item.name} className="flex justify-between w-full mb-2">
            <span className="font-semibold">{item.name}:</span>
            <span className="text-mainNavy-900 font-bold">{item.value}점</span>
          </div>
        ))}
      </div>
    </div>
  );
}
