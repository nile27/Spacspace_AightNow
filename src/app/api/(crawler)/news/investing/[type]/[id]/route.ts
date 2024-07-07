import { NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";

export async function GET(req: Request, { params }: { params: { type: string; id: string } }) {
  const { type, id } = params;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`https://www.investing.com/news/${type}/${id}`, { waitUntil: "networkidle2" });
    await page.waitForSelector(".relative.flex.flex-col", { timeout: 5000 });

    const article = await page.$eval(".relative.flex.flex-col", element => {
      const selectElement = (selector: string) => element.querySelector(selector) as HTMLElement;

      const titleElement = selectElement("h1");
      const imageElement = element.querySelector("img.object-contain") as HTMLImageElement;
      const contentElement = selectElement("div.article_WYSIWYG__O0uhw");
      const timeElement = selectElement("div.flex.flex-col > div.flex.flex-row > span");
      const providerElement = element.querySelector(
        "div.flex.flex-row.items-end.text-xs > a > div > img",
      ) as HTMLImageElement;

      if (!contentElement) {
        return null;
      } else {
        const newsAds = element.querySelectorAll(
          "div[data-test='ad-slot-visible'], div.mt-3, div[data-test='contextual-subscription-hook']",
        );
        newsAds.forEach(ad => ad.remove());
      }

      let contentHTML = contentElement.innerHTML;
      contentHTML = contentHTML.replace(/class=/g, "className="); // class 속성을 className으로 변경

      return {
        title: titleElement.innerText,
        provider: providerElement ? providerElement.alt : null,
        time: timeElement.innerText.replace("Published ", "").replace(",", ""),
        body: contentHTML,
        image: imageElement ? imageElement.src : null,
      };
    });

    return NextResponse.json(article);
  } catch (error) {
    // console.error(Error `processing ${url}:`, error);
    return NextResponse.error();
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
