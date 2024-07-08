import { NextResponse } from "next/server";
import { TNewsList } from "../../type";

const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];

const fetchNaverNewsInfo = async (stockName: string) => {
  const url = `https://api.stock.naver.com/news/worldStock/${stockName}?pageSize=20&page=1`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (Array.isArray(data)) {
      data.forEach(item => {
        item.isVideo = false;
        item.hasImage = item.type === 1;
        item.stockName = stockName;
      });
    } else {
      data.isVideo = false;
      data.hasImage = data.type === 1;
      data.stockName = stockName;
    }
    const articleList = [];
    for (const article of data) {
      const url = `https://api.stock.naver.com/news/worldNews/stock/${article.oid}/${article.aid}`;
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(url, { headers });
      const articleData = await response.json();

      const content = {
        articleId: articleData.article.aid,
        title: articleData.article.tit,
        provider: articleData.article.ohnm,
        time: articleData.article.dt,
        body: articleData.article.content,
        image: null,
      };
      articleList.push(content);
    }

    console.log(articleList);
    return data;
  } catch (error) {
    console.error(`Error fetching news for ${stockName}:`, error);
    return [];
  }
};

export async function GET(request: Request) {
  const allStockNews: TNewsList[] = [];

  for (let stockName of symbols) {
    const newsListData = await fetchNaverNewsInfo(stockName);
    if (newsListData) {
      allStockNews.push(...newsListData);
    }
  }

  return NextResponse.json(allStockNews);
}
