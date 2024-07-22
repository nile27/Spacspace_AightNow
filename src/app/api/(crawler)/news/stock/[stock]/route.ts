import { NextResponse } from "next/server";

export type StockData = {
  reutersCode: string;
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

const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];
const stockNames = ["애플", "테슬라", "마이크로소프트", "아마존", "구글", "유니티"];
const logos = ["apple", "tesla", "microsoft", "amazon", "google", "unity"];

// 주식 정보를 가져오는 함수
const fetchStockInfo = async (symbol: string): Promise<StockData | null> => {
  const url = `https://polling.finance.naver.com/api/realtime/worldstock/stock/${symbol}`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    const index = symbols.indexOf(symbol);

    if (index === -1 || !data.datas || data.datas.length === 0) {
      throw new Error(`Invalid symbol or data not found for ${symbol}`);
    }

    const stockData: StockData = {
      reutersCode: data.datas[0].reutersCode,
      stockName: stockNames[index],
      symbolCode: data.datas[0].symbolCode,
      closePrice: data.datas[0].closePrice,
      compareToPreviousPrice: {
        code: data.datas[0].compareToPreviousPrice.code,
        text: data.datas[0].compareToPreviousPrice.text,
      },
      compareToPreviousClosePrice: data.datas[0].compareToPreviousClosePrice,
      fluctuationsRatio: data.datas[0].fluctuationsRatio,
      logo: logos[index],
    };

    return stockData;
  } catch (error) {
    console.error("Error fetching stock info:", error);
    return null;
  }
};

export async function GET(request: Request, { params }: { params: { stock: string } }) {
  const { stock } = params;

  // 심볼이 유효한지 확인
  if (!stock || typeof stock !== "string") {
    return NextResponse.json(
      { error: "Symbol is required and should be a string" },
      { status: 400 },
    );
  }

  try {
    const stockInfo = await fetchStockInfo(stock);

    if (!stockInfo) {
      return NextResponse.json({ error: `No data found for symbol: ${stock}` }, { status: 404 });
    }

    return NextResponse.json(stockInfo);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
