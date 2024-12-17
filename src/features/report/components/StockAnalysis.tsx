// Analysis.tsx (서버 컴포넌트)
import { stockAnalysis } from "@/lib/stockAnalysis";
import { TStockinfo } from "./Summary";
import Analysis from "./Analysis";

export default async function StockAnalysis({
  stockName,
  stockInfo,
  id,
  exchange,
}: {
  stockName: string;
  stockInfo: TStockinfo;
  id: string;
  exchange: string;
}) {
  const report = await stockAnalysis(id);

  return (
    <Analysis
      stockName={stockName}
      stockInfo={stockInfo}
      id={id}
      exchange={exchange}
      report={report || "N/A"}
    />
  );
}
