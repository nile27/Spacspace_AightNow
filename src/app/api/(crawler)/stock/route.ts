import { NextResponse } from "next/server";

const symbol = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];

type StockData = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  closePrice: number;
  compareToPreviousPriceText: string;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
};

const fetchStockInfo = async (symbol: string): Promise<StockData | null> => {
  const url = `https://api.stock.naver.com/stock/${symbol}/basic`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    return {
      reutersCode: data.reutersCode,
      stockName: data.stockName,
      symbolCode: data.symbolCode,
      closePrice: data.closePrice,
      compareToPreviousPriceText: data.compareToPreviousPrice.text,
      compareToPreviousClosePrice: data.compareToPreviousClosePrice,
      fluctuationsRatio: data.fluctuationsRatio,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function GET(request: Request) {
  const allStocks: StockData[] = [];

  for (let stock_name of symbol) {
    const stockData = await fetchStockInfo(stock_name);
    if (stockData) {
      allStocks.push(stockData);
    }
  }

  return NextResponse.json(allStocks);
}
