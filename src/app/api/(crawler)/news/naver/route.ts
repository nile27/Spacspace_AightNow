import { NextResponse } from "next/server";
import { TNewsList } from "../../type";

const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];

const fetchNaverNewsInfo = async (symbol: string): Promise<TNewsList[]> => {
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
  const allStockNews: TNewsList[] = [];

  for (let symbol of symbols) {
    const newsListData = await fetchNaverNewsInfo(symbol);
    if (newsListData) {
      allStockNews.push(...newsListData);
    }
  }

  return NextResponse.json(allStockNews);
}
