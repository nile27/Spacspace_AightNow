"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { agentEvaluationTogether } from "@/lib/agentTogetherAI";
import { SkeletonCard } from "./SkeletonCard";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type RadarProps = {
  stockName: string;
  width?: number;
};

function transformAgentData(agentData: Record<string, string | number | undefined> | null) {
  if (!agentData) return [];

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

export default function RadarChart({ stockName, width = 350 }: RadarProps) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const agentData = await agentEvaluationTogether(stockName);
        const transformedData = transformAgentData(agentData);
        setData(transformedData);
        setTotalScore(calculateTotalScore(transformedData));
      } catch (err) {
        console.error("Error fetching agent data:", err);
        setError("데이터를 불러오는데 실패했습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stockName]);

  if (loading) return <SkeletonCard />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (data.length === 0) return <div>데이터가 없습니다</div>;

  const options: ApexOptions = {
    chart: {
      type: "radar" as const,
    },
    xaxis: {
      categories: data.map((data: any) => data.name),
    },
    yaxis: {
      min: 0,
      max: 100,
    },
  };

  const series = [
    {
      name: "Stock Score",
      data: data.map((data: any) => data.value),
    },
  ];

  return (
    <div className=" h-[220px] flex justify-between items-center" style={{ width: `${width}px` }}>
      <ApexCharts options={options} series={series} type="radar" height="100%" width="100%" />
      <div className="w-[170px] bg-scaleGray-200 h-[210px] flex flex-col justify-center items-center p-2 rounded-2xl ">
        <div className=" mb-4 w-full">
          <span className="font-bold text-lg">총점:</span>
          <span className="text-mainNavy-900 font-bold text-lg ml-2">{totalScore}점</span>
        </div>
        {data.map((item: { name: string; value: number }) => (
          <div key={item.name} className=" flex justify-between w-full mb-2">
            <span className="font-semibold">{item.name}:</span>
            <span className="text-mainNavy-900 font-bold">{item.value}점</span>
          </div>
        ))}
      </div>
    </div>
  );
}
