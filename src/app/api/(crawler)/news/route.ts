import { NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";
import { Article } from "../../type";
const BASE_URL = "https://www.investing.com";
const stock_names = [
  "apple-computer-inc",
  "tesla-motors",
  "microsoft-corp",
  "amazon-com-inc",
  "google-inc",
  "unity-software-inc",
];

// 뉴스 기사 내용을 가져오는 함수
const fetchArticleContent = async (
  page: Page,
  url: string,
): Promise<{ content: string; image: string | null } | null> => {
  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector(".relative.flex.flex-col", { timeout: 5000 });

    const content = await page.$eval(".relative.flex.flex-col", element => {
      const imageElement = element.querySelector("img.object-contain") as HTMLImageElement;
      const contentElement = element.querySelector("div.article_WYSIWYG__O0uhw");

      if (!contentElement) {
        return null;
      } else {
        // Remove ads and unnecessary elements
        const newsAds = element.querySelectorAll(
          "div[data-test='ad-slot-visible'], div.mt-3, div[data-test='contextual-subscription-hook']",
        );
        newsAds.forEach(ad => ad.remove());
      }

      let contentHTML = contentElement.innerHTML;
      contentHTML = contentHTML.replace(/class=/g, "className="); // class 속성을 className으로 변경

      return {
        content: contentHTML,
        image: imageElement ? imageElement.src : null,
      };
    });

    return content;
  } catch (error) {
    console.error("Error fetching article content:", error);
    return null;
  }
};

// 주식 종목의 기사를 페이지에서 가져오는 함수
const fetchArticlesFromPage = async (
  stock_name: string,
  page: Page,
  index: number,
): Promise<Article[]> => {
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
          const providerElement = selectElement("span[data-test='news-provider-name']");
          const timeElement = selectElement("time[data-test='article-publish-date']");

          if (!titleElement || !providerElement || !timeElement) {
            return null;
          }

          return {
            title: titleElement.innerText,
            provider: providerElement.innerText,
            time: timeElement.innerText,
            published: timeElement.getAttribute("datetime") || "",
            url: titleElement.getAttribute("href") || "",
            content: "",
            image: "",
            stockName: "",
            articleId: 1,
          };
        })
        .filter(article => article !== null),
    );

    const articles: Article[] = [];
    for (let article of source) {
      if (article !== null) {
        const content = await fetchArticleContent(page, `${BASE_URL}${article.url}`);
        if (content && content.content) {
          article.content = content.content;
          article.stockName = stock_name;
          article.articleId = article.articleId++;
          article.image = content.image || "";
          articles.push(article);
        }
      }
    }

    return articles;
  } catch (error) {
    console.error(`Error processing ${stock_name}:`, error);
    return [];
  }
};

// API 핸들러 함수
export async function GET(request: Request) {
  const browser = await puppeteer.launch({
    headless: true, // false 일 경우 실행 시 웹사이트 확인 가능
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const allArticles: Article[] = [];
  for (let stock_name of stock_names) {
    const articles = await fetchArticlesFromPage(stock_name, page, 1);
    allArticles.push(...articles);
  }

  await browser.close(); // 브라우저 종료

  return NextResponse.json(allArticles);
}
