import { NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";

export const BASE_URL = "https://www.investing.com";
const stock_names = [
  "apple-computer-inc",
  "tesla-motors",
  "microsoft-corp",
  "amazon-com-inc",
  "google-inc",
  "unity-software-inc",
];

// 주식 종목의 기사를 페이지에서 가져오는 함수
const fetchArticlesFromPage = async (stock_name: string, page: Page, index: number) => {
  try {
    await page.goto(`${BASE_URL}/equities/${stock_name}-news/${index}`, {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("article div");

    const source = await page.$$eval("article div", elements =>
      elements
        .map(element => {
          const selectElement = (selector: string) =>
            element.querySelector(selector) as HTMLElement;

          const titleElement = selectElement("a[data-test='article-title-link']");
          const subcontentElement = selectElement("p[data-test='article-description']");
          const tumbUrlElement = element.querySelector("img.object-cover") as HTMLImageElement;
          const providerElement = selectElement("span[data-test='news-provider-name']");
          const timeElement = selectElement("time[data-test='article-publish-date']");

          if (!titleElement || !providerElement || !timeElement || !subcontentElement) {
            return null;
          }

          const tumbUrl = tumbUrlElement ? tumbUrlElement.src : "";

          return {
            subcontent: subcontentElement.innerText,
            tumbUrl,
            tit: titleElement.innerText,
            ohnm: providerElement.innerText,
            aid: titleElement.getAttribute("href")?.split("/")[3],
            dt: timeElement.innerText,
            url: titleElement.getAttribute("href")?.split("/")[2],
            // published: timeElement.getAttribute("datetime") || "",
          };
        })
        .filter(article => article !== null),
    );
    return source;
  } catch (error) {
    console.error(`Error processing ${stock_name}:`, error);
    return [];
  }
};

export async function GET(request: Request) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    const allArticles = [];
    for (let stock_name of stock_names) {
      const articles = await fetchArticlesFromPage(stock_name, page, 1);
      console.log(articles);
      allArticles.push(...articles);
    }
    await browser.close(); // 브라우저 종료

    return NextResponse.json(allArticles);
  } catch (error) {
    await browser.close();
    // console.error('Error fetching stock data:', error.message);
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
