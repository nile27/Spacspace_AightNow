import { useEffect, useState } from "react";
import Icon from "./Icon";
import { STOCK_NAMES } from "./Stock";
import { stockAction2 } from "@/lib/stockAction";

type TStockList = {
  name: string;
  size?: number;
};

type TStockPrice = {
  closePrice: number;
  compareToPreviousPrice: {
    code: string;
    text: string;
  };
  fluctuationsRatio: number;
};

export default function StockList({ name, size }: TStockList) {
  const [stockPrice, setStockPrice] = useState<TStockPrice | null>(null);
  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const stockPrice = await stockAction2(name);
        setStockPrice(stockPrice);
      } catch (error) {
        console.error("Error fetching stock price:", error);
      }
    };
    fetchStockPrice();
  }, [name]);

  if (!stockPrice) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="w-[323px] h-8  flex gap-2 mt-5 item-center">
        <Icon name={name} size={32} />
        <div className="w-[290px] flex justify-between items-center  font-medium ">
          <span>{STOCK_NAMES[name]}</span>
          <div
            className={`${
              stockPrice.compareToPreviousPrice.code === "2" ? "text-rose-500" : "text-blue-500"
            } flex items-center gap-2 w-8`}
          >
            <span className="">
              {stockPrice.compareToPreviousPrice.text === "상승" ? "▲" : "▼"}{" "}
            </span>
            <span className="">{stockPrice.fluctuationsRatio}%</span>
          </div>
        </div>
      </div>
    </>
  );
}
