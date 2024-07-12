import { NextResponse } from "next/server";
import { TNewsList } from "../../type";
import { addNewsToFirestore } from "../firebase/fireStore";

const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];
const stockNames = ["apple", "tesla", "microsoft", "amazon", "google", "unity"];

const fetchNaverNewsInfo = async (stockName: string, symbole: string) => {
  const url = `https://api.stock.naver.com/news/worldStock/${symbole}?pageSize=20&page=1`;
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
      });
    } else {
      data.isVideo = false;
      data.hasImage = data.type === 1;
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
        ...article,
        published: articleData.article.dt,
        content: articleData.article.content.replace(/class=/g, "className="),
        // .replace(/<p class="tr-advisory">.*?<\/p>/gs, ""),
        stockName: stockName,
        image: null,
        relatedItems: articleData.article.relatedItems
          .filter((item: any) => symbols.includes(item.reutersCode))
          .map((item: any) => item.reutersCode),
      };
      articleList.push(content);
    }

    // console.log(articleList);
    return articleList;
  } catch (error) {
    console.error(`Error fetching news for ${stockName}:`, error);
    return [];
  }
};

export async function GET(request: Request) {
  const allStockNews: TNewsList[] = [];

  for (let i = 0; i < symbols.length; i++) {
    const newsListData = await fetchNaverNewsInfo(stockNames[i], symbols[i]);
    if (newsListData) {
      allStockNews.push(...newsListData);
      await addNewsToFirestore(stockNames[i], newsListData);
    }
  }

  return NextResponse.json(allStockNews);
}
