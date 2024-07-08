import { NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";

const fetchRankNews = async (page: Page) => {
  const url = `https://m.stock.naver.com/front-api/news/category?category=ranknews&pageSize=20&page=1`;
  const headers = {
    "Content-Type": "application/json",
  };

  const articles = [];
  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    const list = data.result.map((item: any) => {
      return {
        subcontent: item.body,
        thumbUrl: item.imageOriginLink,
        oid: item.officeId,
        ohnm: item.officeName,
        aid: item.articleId,
        tit: item.title,
        dt: item.datetime,
        isVideo: item.isVideo,
        hasImage: item.hasImage,
      };
    });

    // 뉴스 기사
    for (const news of list) {
      await page.goto(`https://n.news.naver.com/mnews/article/${news.oid}/${news.aid}`, {
        waitUntil: "networkidle2",
      });

      const article = await page.$eval("#newsct", element => {
        const selectElement = (selector: string) => element.querySelector(selector) as HTMLElement;
        const titleElement = selectElement(".media_end_head_title");
        const providerElement = selectElement(".media_end_head_top_logo_img").getAttribute("alt");
        const timeElement = selectElement(".media_end_head_info_datestamp_time._ARTICLE_DATE_TIME");
        const contentElement = selectElement("#dic_area");

        if (contentElement) {
          const end_photo = contentElement.querySelector("#img_a2");
          if (end_photo) {
            end_photo.remove();
          }
        }

        if (!titleElement || !timeElement || !contentElement) {
          throw new Error("Required elements not found");
        }

        return {
          articleId: "",
          title: titleElement.innerText,
          provider: providerElement,
          time: timeElement.innerText,
          body: contentElement.innerHTML,
          image: null,
        };
      });

      articles.push({
        ...article,
        articleId: news.aid,
      });
    }
    console.log(articles);

    return list;
  } catch (error) {
    console.error(`Error fetching rank news:`, error);
    throw new Error("Failed to fetch rank news data");
  }
};

export async function GET(request: Request) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    const rankNews = await fetchRankNews(page);
    return NextResponse.json(rankNews);
  } catch (error) {
    console.error(`Error in GET request:`, error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await browser.close();
  }
}
