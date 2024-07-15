import { NextResponse } from "next/server";
import { TStockData } from "../../type";

const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];
const stockName = ["애플", "테슬라", "마이크로소프트", "아마존", "구글", "유니티"];
const logo = ["apple", "tesla", "microsoft", "amazon", "google", "unity"];

const fetchStockInfo = async (logo: string, symbol: string): Promise<TStockData | null> => {
  const url = `https://polling.finance.naver.com/api/realtime/worldstock/stock/${symbol}`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    const stockData: TStockData = {
      reutersCode: data.datas[0].reutersCode,
      stockName: stockName[symbols.indexOf(symbol)],
      symbolCode: data.datas[0].symbolCode,
      closePrice: data.datas[0].closePrice,
      compareToPreviousPrice: {
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
  const allStocks: TStockData[] = [];

  for (let i = 0; i < symbols.length; i++) {
    const stockData = await fetchStockInfo(logo[i], symbols[i]);
    if (stockData) {
      allStocks.push(stockData);
    }
  }

  return NextResponse.json(allStocks);
}
