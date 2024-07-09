"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

type TStockData = {
  localDate: string;
  closePrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  accumulatedTradingVolume: number;
};

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Chart({ stockData }: { stockData: TStockData[] }) {
  // 월별 데이터 집계
  const monthlyData = stockData.reduce((acc, data) => {
    const monthKey = data.localDate.substring(0, 6); // YYYYMM
    if (!acc[monthKey]) {
      acc[monthKey] = { sum: 0, count: 0 };
    }
    acc[monthKey].sum += data.closePrice;
    acc[monthKey].count++;
    return acc;
  }, {} as Record<string, { sum: number; count: number }>);

  const chartData: ApexAxisChartSeries = [
    {
      name: "월평균 주가",
      data: Object.entries(monthlyData).map(([date, { sum, count }]) => ({
        x: new Date(date.substring(0, 4) + "-" + date.substring(4, 6) + "-01").getTime(),
        y: parseFloat((sum / count).toFixed(2)),
      })),
    },
  ];

  const chartOption: ApexOptions = {
    chart: {
      type: "area",
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (val: string) {
          return new Date(val).toLocaleDateString("ko-KR", { year: "numeric", month: "short" });
        },
      },
    },
    yaxis: {
      title: { text: "월평균 주가 (USD)" },
      labels: {
        formatter: function (val: number) {
          return val.toFixed(2);
        },
      },
    },
  };

  return (
    <>
      <div id="chart" className="w-[692px] h-64 flex border bg-white rounded-2xl p-4">
        <ApexChart options={chartOption} series={chartData} type="area" width={680} height={250} />
      </div>
    </>
  );
}
