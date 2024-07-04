import { NextResponse } from "next/server";

const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];

type NewsData = {
  stockName?: string;
  type: number;
  subcontent: string;
  tumbUrl: string;
  oid: string;
  ohnm: number;
  aid: string;
  tit: string;
  dt: number;
};

const fetchNaverNewsInfo = async (symbol: string): Promise<NewsData[]> => {
  const url = `https://api.stock.naver.com/news/worldStock/${symbol}?pageSize=20&page=1`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching news for ${symbol}:`, error);
    return [];
  }
};

export async function GET(request: Request) {
  const allStockNews: NewsData[] = [];

  for (let symbol of symbols) {
    const newsListData = await fetchNaverNewsInfo(symbol);
    if (newsListData) {
      allStockNews.push(...newsListData);
    }
  }

  return NextResponse.json(allStockNews);
}
