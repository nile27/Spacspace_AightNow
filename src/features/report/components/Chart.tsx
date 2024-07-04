"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

type TStockData = {
  localDate: string;
  closePrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  accumlatedTradingVolume: number;
};

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Chart({ stockData }: { stockData: TStockData[] }) {
  const chartData: ApexAxisChartSeries = [
    {
      name: "주가",
      data: stockData.map(data => data.closePrice),
    },
  ];
  const chartOption: ApexOptions = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: stockData.map(data => data.localDate),
    },
    tooltip: {
      x: {
        format: "dd/MM",
      },
    },
  };

  return (
    <>
      <div id="chart" className="w-[692px] h-64 flex border bg-white rounded-2xl p-4">
        <ApexChart
          options={chartOption}
          series={chartData}
          type={"area"}
          width={680}
          height={250}
        />
      </div>
    </>
  );
}
