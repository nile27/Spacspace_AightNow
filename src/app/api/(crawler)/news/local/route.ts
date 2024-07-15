import { NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";
import { addNewsToFirestore } from "../firebase/fireStore";
import { TNewsList } from "../../type";

const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];
const relatedItem = ["애플", "테슬라", "마이크로소프트", "아마존", "구글", "유니티"];
const stockNames = ["apple", "tesla", "microsoft", "amazon", "google", "unity"];

const fetchLocalNews = async (stockName: string, symbol: string, page: Page) => {
  const url = `https://api.stock.naver.com/news/stock/${symbol}?pageSize=20&page=1`;
  const headers = {
    "Content-Type": "application/json",
  };

  const articles = [];
  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    const itemsArray = data.flatMap((item: any) => item.items);

    const list = itemsArray.map((item: any) => {
      return {
        aid: item.articleId,
        tit: item.title,
        subcontent: item.body,
        oid: item.officeId,
        ohnm: item.officeName,
        dt: item.datetime,
        thumbUrl: item.imageOriginLink,
        type: item.photoType,
        stockName: stockName,
        isVideo: item.photoType === 2,
        hasImage: item.photoType === 1,
      };
    });

    // 뉴스 기사
    for (const news of list) {
      await page.goto(`https://n.news.naver.com/mnews/article/${news.oid}/${news.aid}`, {
        waitUntil: "networkidle2",
      });

      const article = await page.$eval(
        "#newsct",
        (element, relatedItem, stockNames) => {
          const selectElement = (selector: string) =>
            element.querySelector(selector) as HTMLElement;
          const titleElement = selectElement(".media_end_head_title");
          const providerElement = selectElement(".media_end_head_top_logo_img").getAttribute("alt");
          const timeElement = selectElement(
            ".media_end_head_info_datestamp_time._ARTICLE_DATE_TIME",
          );
          const contentElement = selectElement("#dic_area");
          const imageElement = element.querySelector("#img1") as HTMLImageElement;

          if (!titleElement || !timeElement || !contentElement) {
            throw new Error("Required elements not found");
          }

          const relatedItems = stockNames.filter((_, index) =>
            contentElement.innerText.includes(relatedItem[index]),
          );

          if (contentElement) {
            const summaryElement = selectElement(".media_end_summary");
            const end_photo_org = contentElement.querySelector(".end_photo_org");
            const end_photo = contentElement.querySelector("#img_a2");
            const remove_article = element.querySelector("#dic_area > div:nth-child(38)");

            if (summaryElement) {
              summaryElement.remove();
            }
            if (end_photo_org) {
              end_photo_org.remove();
            }
            if (end_photo) {
              end_photo.remove();
            }
            if (remove_article) {
              remove_article.remove();
            }
          }

          return {
            // articleId: "",
            // title: titleElement.innerText,
            // provider: providerElement,
            published: timeElement.innerText,
            content: contentElement.outerHTML,
            image: imageElement?.src,
            relatedItems: relatedItems,
          };
        },
        relatedItem,
        stockNames,
      );

      articles.push({
        ...news,
        ...article,
      });
    }
    console.log(articles);

    return articles;
  } catch (error) {
    console.error(`Error fetching local news:`, error);
    throw new Error("Failed to fetch local news data");
  }
};

export async function GET(request: Request) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const allLocalNews: TNewsList[] = [];

  try {
    for (let i = 0; i < symbols.length; i++) {
      const newsListData = await fetchLocalNews(stockNames[i], symbols[i], page);
      if (newsListData) {
        allLocalNews.push(...newsListData);
        await addNewsToFirestore(stockNames[i], newsListData); // Firestore에 뉴스 추가
      }
    }
    return NextResponse.json(allLocalNews);
  } catch (error) {
    console.error(`Error in GET request:`, error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await browser.close();
  }
}
