import { NextResponse } from "next/server";

const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];

type NewsData = {
  stockName?: string;
  articleId: string;
  officeId: string;
  officeName: string;
  datetime: string;
  type: number;
  title: string;
  body: string;
  photoType: number;
  imageOriginLink: string;
  titleFull: string;
};

const fetchNaverNewsInfo = async (symbol: string): Promise<NewsData[]> => {
  const url = `https://api.stock.naver.com/news/integration/${symbol}`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const newsList: NewsData[] = [];
    const response = await fetch(url, { headers });
    const data = await response.json();
    data.stockNews.forEach((news: any) => {
      news.items.forEach((item: NewsData) => {
        item.stockName = symbol;
        newsList.push(item);
      });
    });
    return newsList;
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
      allStockNews.push(...newsListData); // Spread operator to push individual items
    }
  }

  return NextResponse.json(allStockNews);
}
