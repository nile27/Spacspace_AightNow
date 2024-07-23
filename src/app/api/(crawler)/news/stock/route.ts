"use server";

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];
const stockName = ["애플", "테슬라", "마이크로소프트", "아마존", "구글", "유니티"];
const logo = ["apple", "tesla", "microsoft", "amazon", "google", "unity"];

type StockData = {
  reutersCode?: string;
  stockName: string;
  symbolCode: string;
  closePrice: number | string;
  compareToPreviousPrice: {
    code: string;
    text: string;
  };
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
  logo: string;
};

const fetchStockInfo = async (logo: string, symbol: string): Promise<StockData | null> => {
  const url = `https://polling.finance.naver.com/api/realtime/worldstock/stock/${symbol}`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    const stockData: StockData = {
      reutersCode: data.datas[0].reutersCode,
      stockName: stockName[symbols.indexOf(symbol)],
      symbolCode: data.datas[0].symbolCode,
      closePrice: data.datas[0].closePrice,
      compareToPreviousPrice: {
        code: data.datas[0].compareToPreviousPrice.code,
        text: data.datas[0].compareToPreviousPrice.text,
      },
      compareToPreviousClosePrice: data.datas[0].compareToPreviousClosePrice,
      fluctuationsRatio: data.datas[0].fluctuationsRatio,
      logo: logo,
    };

    return stockData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function GET(request: Request) {
  const allStocks: StockData[] = [];

  const stockPromises = symbols.map((symbol, index) => fetchStockInfo(logo[index], symbol));

  const stockDataArray = await Promise.all(stockPromises);

  stockDataArray.forEach(stockData => {
    if (stockData) {
      allStocks.push(stockData);
    }
  });

  revalidatePath("/");

  return NextResponse.json(allStocks);
}
